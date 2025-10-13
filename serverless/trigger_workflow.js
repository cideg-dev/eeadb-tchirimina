// Exemple minimal Express / serverless pour déclencher un workflow GitHub
// Dépendances : express, node-fetch (ou axios). Dans une fonction serverless, adaptez l'export.

const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

// Config via env
const OWNER = process.env.GH_OWNER; // ex: 'mon-org'
const REPO = process.env.GH_REPO;   // ex: 'mon-repo'
const WORKFLOW_FILE = process.env.GH_WORKFLOW_FILE || 'send_email.yml';
const GH_TOKEN = process.env.GH_PAT; // token avec scope 'repo' ou 'workflows'

if(!GH_TOKEN || !OWNER || !REPO){
  console.warn('Veuillez définir GH_PAT, GH_OWNER et GH_REPO dans les variables d\'environnement.');
}

app.post('/trigger-email', async (req, res) =>{
  try{
    const { name, email, message } = req.body;
    // validation basique
    if(!message || !email){
      return res.status(400).json({ error: 'email et message requis' });
    }

    const url = `https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${WORKFLOW_FILE}/dispatches`;
    const body = {
      ref: 'main',
      inputs: { name: name || '', email: email || '', message: message || '' }
    };

    const resp = await fetch(url,{
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GH_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if(resp.status === 204){
      return res.json({ status: 'dispatched' });
    }

    const text = await resp.text();
    return res.status(resp.status).json({ error: text });

  }catch(err){
    console.error(err);
    return res.status(500).json({ error: 'erreur interne' });
  }
});

module.exports = app;

// Pour exécuter localement (node trigger_workflow.js), décommentez ci-dessous :
if(require.main === module){
  const port = process.env.PORT || 3000;
  app.listen(port,()=>console.log('server listening on',port));
}
