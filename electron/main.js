const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const url = require('url');
const { channels } = require('../src/shared/constants');

const express = require('../src/shared/express/index');

// const {
//   default: installExtension,
//   REACT_DEVELOPER_TOOLS,
//   REDUX_DEVTOOLS
// } = require('electron-devtools-installer');

// installExtension(REACT_DEVELOPER_TOOLS)
//   .then(name => console.log(`Added Extension:  ${name}`))
//   .catch(err => console.log('An error occurred: ', err));

// installExtension(REDUX_DEVTOOLS)
//   .then(name => console.log(`Added Extension:  ${name}`))
//   .catch(err => console.log('An error occurred: ', err));

let mainWindow;
function createWindow() {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true
    });
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: true
    }
  });
  mainWindow.loadURL(startUrl);
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('select-dirs', async (event, arg) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });
  event.sender.send('folder', result.filePaths[0]);
});

ipcMain.on('select-file', async (event, arg) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [{ name: 'sql', extensions: ['sql'] }]
  });
  event.sender.send('file', result.filePaths[0]);
});
