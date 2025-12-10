// Update verset_du_jour.json from a list of verses
// Run daily via GitHub Actions

const fs = require('fs');
const path = require('path');

function pickRandom(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

function main(){
  const listPath = path.join(__dirname, '..', 'site', 'data', 'versets.json');
  const outPath = path.join(__dirname, '..', 'site', 'data', 'verset_du_jour.json');
  const raw = fs.readFileSync(listPath, 'utf8');
  const verses = JSON.parse(raw);
  if(!Array.isArray(verses) || verses.length === 0){
    throw new Error('versets.json est vide ou invalide');
  }
  const selected = pickRandom(verses);
  const payload = {
    date: new Date().toISOString().slice(0,10),
    verset: selected.text, // conserver la clé "verset" attendue par le frontend
    reference: selected.reference,
    source: 'automated'
  };
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2), 'utf8');
  console.log('Verset du jour mis à jour:', payload);
}

main();