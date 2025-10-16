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

// Health check (optional)
app.get('/health', (req,res)=>{ res.json({ ok:true, service:'admin_update', repo: `${OWNER}/${REPO}`, branch: BRANCH }); });

module.exports = app;