// Admin update endpoint: commits JSON/data changes to GitHub via Contents API
// Security: protect with API_KEY (X-API-KEY header). Requires GitHub PAT with repo scope.

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({ limit: '1mb' }));

const OWNER = process.env.GITHUB_OWNER;
const REPO = process.env.GITHUB_REPO;
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const PAT = process.env.GITHUB_PAT; // repo scope
const API_KEY = process.env.API_KEY; // optional, if set, required via X-API-KEY
const ADMIN_PR_DRAFT = String(process.env.ADMIN_PR_DRAFT || 'true') === 'true';

if(!OWNER || !REPO || !PAT){
  console.warn('serverless/admin_update: Missing env GITHUB_OWNER, GITHUB_REPO, or GITHUB_PAT');
}

function checkKey(req, res, next){
  if(API_KEY){
    const key = req.header('X-API-KEY');
    if(!key || key !== API_KEY){
      return res.status(403).json({ error: 'Forbidden: invalid or missing API key' });
    }
  }
  next();
}

async function gh(method, path, body){
  const url = `https://api.github.com/repos/${OWNER}/${REPO}${path}`;
  const resp = await fetch(url,{
    method,
    headers: {
      'Authorization': `Bearer ${PAT}`,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const json = await resp.json().catch(()=>({}));
  if(!resp.ok){
    const msg = json?.message || resp.statusText;
    throw new Error(msg);
  }
  return json;
}

async function getBranchHeadSha(branch){
  const ref = await gh('GET', `/git/ref/heads/${encodeURIComponent(branch)}`);
  return ref?.object?.sha;
}

async function createBranch(fromBranch, newBranch){
  const baseSha = await getBranchHeadSha(fromBranch);
  if(!baseSha) throw new Error(`Base branch ${fromBranch} not found`);
  try{
    await gh('POST', `/git/refs`, { ref: `refs/heads/${newBranch}`, sha: baseSha });
  }catch(e){
    // If already exists, ignore
    if(!String(e.message || '').includes('Reference already exists')) throw e;
  }
}

app.post('/admin/update', checkKey, async (req, res) => {
  try{
    const updates = req.body?.updates;
    if(!Array.isArray(updates) || updates.length === 0){
      return res.status(400).json({ error: 'No updates provided' });
    }
    const results = [];
    for(const u of updates){
      const path = u?.path;
      let content = u?.content ?? '';
      const message = u?.message || `Admin update: ${path}`;
      if(!path){ results.push({ path, ok:false, error:'Missing path' }); continue; }
      // Ensure LF line endings for JSON
      if(typeof content === 'string') content = content.replace(/\r\n/g,'\n');
      const encodedPath = encodeURIComponent(path).replace(/%2F/g,'/');
      let sha = undefined;
      try{
        const file = await gh('GET', `/contents/${encodedPath}?ref=${BRANCH}`);
        sha = file.sha;
      }catch(e){
        if(String(e.message || '').includes('Not Found')){ sha = undefined; }
        else throw e;
      }
      const b64 = Buffer.from(content, 'utf-8').toString('base64');
      const result = await gh('PUT', `/contents/${encodedPath}`, {
        message,
        content: b64,
        branch: BRANCH,
        sha
      });
      results.push({ path, ok:true, commit: result?.commit?.sha });
    }
    return res.json({ ok: true, results });
  }catch(err){
    return res.status(500).json({ error: err.message || 'Internal error' });
  }
});

// Pull Request mode: create a branch, commit changes on that branch, then open a PR
app.post('/admin/update_pr', checkKey, async (req, res) => {
  try{
    const updates = req.body?.updates;
    if(!Array.isArray(updates) || updates.length === 0){
      return res.status(400).json({ error: 'No updates provided' });
    }
    const ts = new Date().toISOString().replace(/[:.]/g,'-');
    const newBranch = `admin/update-${ts}`;
    await createBranch(BRANCH, newBranch);

    const results = [];
    for(const u of updates){
      const path = u?.path;
      let content = u?.content ?? '';
      const message = u?.message || `Admin update: ${path}`;
      if(!path){ results.push({ path, ok:false, error:'Missing path' }); continue; }
      if(typeof content === 'string') content = content.replace(/\r\n/g,'\n');
      const encodedPath = encodeURIComponent(path).replace(/%2F/g,'/');
      let sha = undefined;
      try{
        const file = await gh('GET', `/contents/${encodedPath}?ref=${newBranch}`);
        sha = file.sha;
      }catch(e){
        if(String(e.message || '').includes('Not Found')){ sha = undefined; }
        else throw e;
      }
      const b64 = Buffer.from(content, 'utf-8').toString('base64');
      const result = await gh('PUT', `/contents/${encodedPath}`, {
        message,
        content: b64,
        branch: newBranch,
        sha
      });
      results.push({ path, ok:true, commit: result?.commit?.sha });
    }

    // Create PR
    const title = `Admin update ${ts}`;
    const body = `Mises à jour:\n` + updates.map(u => `- ${u?.path} (${u?.message || ''})`).join('\n');
    const pr = await gh('POST', `/pulls`, {
      title,
      head: newBranch,
      base: BRANCH,
      body,
      draft: ADMIN_PR_DRAFT
    });
    return res.json({ ok:true, results, pr: { number: pr?.number, url: pr?.html_url } });
  }catch(err){
    return res.status(500).json({ error: err.message || 'Internal error' });
  }
});

// Health check (optional)
app.get('/health', (req,res)=>{ res.json({ ok:true, service:'admin_update', repo: `${OWNER}/${REPO}`, branch: BRANCH }); });

module.exports = app;