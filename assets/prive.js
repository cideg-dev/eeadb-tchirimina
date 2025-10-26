document.addEventListener('DOMContentLoaded', function(){
  const endpointInput = document.getElementById('pr-endpoint');
  const keyInput = document.getElementById('pr-key');
  const unlockBtn = document.getElementById('pr-unlock');
  const logoutBtn = document.getElementById('pr-logout');
  const status = document.getElementById('pr-status');
  const adminLinks = document.getElementById('admin-links');
  const accessLogSection = document.getElementById('access-log');
  const accessLogList = document.getElementById('access-log-list');

  // ---------- Utilitaires ----------
  function loadLog(){
    try{ return JSON.parse(localStorage.getItem('access_log')) || []; }catch{ return []; }
  }
  function saveLog(arr){ localStorage.setItem('access_log', JSON.stringify(arr)); }
  function renderLog(){
    const log = loadLog();
    accessLogList.innerHTML = '';
    if(log.length===0){
      const li = document.createElement('li');
      li.textContent = 'Aucun accès enregistré.';
      accessLogList.appendChild(li);
    }else{
      for(const ts of log.slice().reverse()){
        const li = document.createElement('li');
        const date = new Date(ts);
        li.textContent = date.toLocaleString();
        accessLogList.appendChild(li);
      }
    }
  }

  function setUnlocked(unlocked){
    adminLinks.hidden = !unlocked;
    logoutBtn.hidden = !unlocked;
    accessLogSection.hidden = !unlocked;
  }

  // ---------- Préremplissage ----------
  const savedEndpoint = sessionStorage.getItem('admin_endpoint') || localStorage.getItem('admin_endpoint');
  const savedKey = sessionStorage.getItem('admin_key'); // clé seulement en session
  if(savedEndpoint) endpointInput.value = savedEndpoint;
  if(savedKey) keyInput.value = savedKey;
  if(savedKey && savedEndpoint){
    setUnlocked(true);
    renderLog();
  }

  // ---------- Actions ----------
  unlockBtn.addEventListener('click', function(){
    const endpoint = endpointInput.value.trim();
    const key = keyInput.value.trim();
    if(!endpoint || !key){ status.textContent = 'Veuillez renseigner l’endpoint et la clé.'; return; }
    // Persist uniquement endpoint en localStorage pour confort; clé seulement session
    localStorage.setItem('admin_endpoint', endpoint);
    sessionStorage.setItem('admin_endpoint', endpoint);
    sessionStorage.setItem('admin_key', key);

    // Journal accès
    const log = loadLog();
    log.push(Date.now());
    saveLog(log);

    setUnlocked(true);
    renderLog();
    status.textContent = 'Espace admin déverrouillé pour cette session.';
  });

  logoutBtn.addEventListener('click', function(){
    sessionStorage.removeItem('admin_key');
    keyInput.value = '';
    setUnlocked(false);
    status.textContent = 'Session privée verrouillée.';
  });
});