'use strict'
const electron = require('electron');

// get Electron modules
const {app, BrowserWindow, Menu, powerSaveBlocker, Notification} = require('electron');
//Menu
var menu = require('./menu');
var windows = require('./windows');
if (app.makeSingleInstance((argv, dir) => {
  //running instance
  if (argv[argv.length - 1] == '--stopwatch')
    windows.createStopwatchWindow();
  else windows.createTimerWindow();
})){
  //second instance
  app.quit();
}

app.on('ready', function(){
  if (process.argv [process.argv.length - 1] === '--stopwatch')
    windows.createStopwatchWindow();
  else windows.createTimerWindow();
  app.setAboutPanelOptions({applicationName: app.getName(), applicationVersion: app.getVersion(), copyright: "Copyright (C) 2017 Tyler Liu"});
  menu.useTemplate();
  menu.setIconMenu();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    windows.setQuit();
    app.quit();
    console.log('quit');
  }
});

app.on('before-quit', () => {
  windows.setQuit();
});

app.on('activate', windows.openTimerWindow);
