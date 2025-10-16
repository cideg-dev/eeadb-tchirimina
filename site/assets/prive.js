document.addEventListener('DOMContentLoaded', function(){
  const endpointInput = document.getElementById('pr-endpoint');
  const keyInput = document.getElementById('pr-key');
  const unlockBtn = document.getElementById('pr-unlock');
  const status = document.getElementById('pr-status');
  const adminLinks = document.getElementById('admin-links');

  // Prefill from storage
  const savedEndpoint = sessionStorage.getItem('admin_endpoint') || localStorage.getItem('admin_endpoint');
  const savedKey = sessionStorage.getItem('admin_key') || localStorage.getItem('admin_key');
  if(savedEndpoint) endpointInput.value = savedEndpoint;
  if(savedKey) keyInput.value = savedKey;
  if(savedKey && savedEndpoint) adminLinks.hidden = false;

  unlockBtn.addEventListener('click', function(){
    const endpoint = endpointInput.value.trim();
    const key = keyInput.value.trim();
    if(!endpoint || !key){ status.textContent = 'Veuillez renseigner l’endpoint et la clé.'; return; }
    // Persist in session
    sessionStorage.setItem('admin_endpoint', endpoint);
    sessionStorage.setItem('admin_key', key);
    adminLinks.hidden = false;
    status.textContent = 'Espace admin déverrouillé pour cette session.';
  });
});