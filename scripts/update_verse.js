// Update verset_du_jour.json from a list of verses
// Run daily via GitHub Actions

const fs = require('fs');
const path = require('path');

function pickRandom(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

function main(){
  // Correction des chemins des fichiers
  const listPath = path.join(__dirname, '..', 'data', 'versets.json');
  const outPathRoot = path.join(__dirname, '..', 'data', 'verset_du_jour.json');
  const outPathNext = path.join(__dirname, '..', 'eeadb-website', 'public', 'api', 'verset_du_jour.json');

  console.log(`Chemin de la liste des versets: ${listPath}`);
  console.log(`Chemin de sortie (racine): ${outPathRoot}`);
  console.log(`Chemin de sortie (Next.js): ${outPathNext}`);

  // Vérifier si le fichier source existe
  if (!fs.existsSync(listPath)) {
    throw new Error(`Le fichier de versets n'a pas été trouvé à: ${listPath}`);
  }

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

  const payloadString = JSON.stringify(payload, null, 2);
  
  // Écrire dans les deux fichiers de destination
  fs.writeFileSync(outPathRoot, payloadString, 'utf8');
  fs.writeFileSync(outPathNext, payloadString, 'utf8');
  
  console.log('Verset du jour mis à jour:', payload);
}

main();