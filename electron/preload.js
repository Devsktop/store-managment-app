const { ipcRenderer } = require('electron');
window.ipcRenderer = ipcRenderer;

process.once('loaded', () => {
  window.addEventListener('message', evt => {
    if (evt.data.type === 'select-dirs') {
      ipcRenderer.send('select-dirs');
    }
    if (evt.data.type === 'select-file') {
      ipcRenderer.send('select-file');
    }
  });
});
