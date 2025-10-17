document.addEventListener('DOMContentLoaded', function(){
  const endpointInput = document.getElementById('admin-endpoint');
  const keyInput = document.getElementById('admin-key');
  const status = document.getElementById('admin-status');

  // Pré-remplir depuis le stockage local pour la commodité
  const savedEndpoint = sessionStorage.getItem('admin_endpoint') || localStorage.getItem('admin_endpoint');
  const savedKey = sessionStorage.getItem('admin_key') || localStorage.getItem('admin_key');
  if(savedEndpoint && endpointInput) endpointInput.value = savedEndpoint;
  if(savedKey && keyInput) keyInput.value = savedKey;

  // Persister les changements dans le sessionStorage
  endpointInput?.addEventListener('input', () => { sessionStorage.setItem('admin_endpoint', endpointInput.value.trim()); });
  keyInput?.addEventListener('input', () => { sessionStorage.setItem('admin_key', keyInput.value.trim()); });

  // Fonction générique pour envoyer les mises à jour
  async function sendUpdate(path, content, message){
    const endpoint = endpointInput?.value?.trim();
    const key = keyInput?.value?.trim();
    if(!endpoint || !key){ 
      status.textContent = 'Veuillez renseigner l’URL du endpoint et la clé d’administration.'; 
      return; 
    }
    status.textContent = 'Envoi en cours…';
    try{
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': key
        },
        body: JSON.stringify({ updates: [{ path, content, message }] })
      });
      const json = await resp.json().catch(()=>null);
      status.textContent = resp.ok ? 'Mise à jour réussie.' : `Erreur: ${json?.error || resp.statusText}`;
    } catch(e) {
      status.textContent = `Erreur réseau: ${e.message}`;
    }
  }

  // Fonction pour configurer un bouton de mise à jour pour un fichier JSON
  function setupUpdateButton(action, textareaId, filePath, commitMessage) {
    const button = document.querySelector(`[data-action="${action}"]`);
    button?.addEventListener('click', async () => {
      const textarea = document.getElementById(textareaId);
      const textContent = textarea.value.trim();
      
      if (!textContent) {
        status.textContent = 'Le champ de données est vide. Aucune mise à jour envoyée.';
        return;
      }

      try {
        // Valider le JSON avant de l'envoyer
        const payload = JSON.parse(textContent);
        await sendUpdate(filePath, JSON.stringify(payload, null, 2), commitMessage);
      } catch (e) {
        status.textContent = `Erreur de format JSON: ${e.message}`;
      }
    });
  }

  // Configuration des boutons
  setupUpdateButton('update-activites', 'a-json', 'site/data/activites.json', 'admin: update activites');
  setupUpdateButton('update-galerie', 'g-json', 'site/data/gallery.json', 'admin: update gallery');
  setupUpdateButton('update-ressources', 'r-json', 'site/data/ressources.json', 'admin: update ressources');
  setupUpdateButton('update-events', 'e-json', 'site/data/events.json', 'admin: update events');
  setupUpdateButton('update-versets', 'v-json', 'site/data/versets.json', 'admin: update versets');

  // Cas spécial pour la section "Présentation" qui a plusieurs champs
  const presentationButton = document.querySelector('[data-action="update-presentation"]');
  presentationButton?.addEventListener('click', async () => {
    const mission = document.getElementById('p-mission').value.trim();
    const valeursText = document.getElementById('p-valeurs').value.trim();
    const histoireText = document.getElementById('p-histoire').value.trim();
    const ministeresText = document.getElementById('p-ministeres').value.trim();

    // Construire le payload uniquement avec les champs remplis
    const payload = {};
    if(mission) payload.mission = mission;
    if(valeursText) payload.valeurs = valeursText.split('\n').filter(Boolean);
    if(histoireText) payload.histoire = histoireText.split('\n').filter(Boolean);
    if(ministeresText) {
      try { 
        payload.ministeres = JSON.parse(ministeresText); 
      } catch(e) { 
        status.textContent = `JSON invalide pour les ministères: ${e.message}`;
        return;
      }
    }

    if (Object.keys(payload).length === 0) {
      status.textContent = 'Aucun champ de présentation rempli. Aucune mise à jour envoyée.';
      return;
    }

    await sendUpdate('site/data/presentation.json', JSON.stringify(payload, null, 2), 'admin: update presentation');
  });
});