'use strict';

module.exports = {
  createTimerWindow : createTimerWindow,
  createStopwatchWindow : createStopwatchWindow,
  setQuit : setQuit,
  openTimerWindow : openTimerWindow,
  openStopwatchWindow : openStopwatchWindow
}

const $ = require('jQuery');

const {app, BrowserWindow, Menu, powerSaveBlocker} = require('electron');
var quit = false;

//id of powerSaveBlocker
var saveBlockerID;

//windows
var timerWindow, stopwatchWindow;

function setQuit(){
  quit = true;
}

function createTimerWindow() {

  saveBlockerID = powerSaveBlocker.start('prevent-app-suspension');
  timerWindow = new BrowserWindow({
    width: 410, height: 600, title: "Timer", minWidth: 390, fullscreenable: false, show: false
  });
  timerWindow.once('ready-to-show', timerWindow.show)
  timerWindow.$ =timerWindow.jQuery= $;
  timerWindow.loadURL(`file://${__dirname}/Stopwatch/Timer2.html`);
  // devTools
  //timerWindow.webContents.openDevTools();
  timerWindow.on('close', (event) => {
    if (!quit){
      timerWindow.hide();
      event.preventDefault();
    } else {
      powerSaveBlocker.stop(saveBlockerID);
      timerWindow = null;
    }
  });
}

function createStopwatchWindow() {

  stopwatchWindow = new BrowserWindow({
    width: 350, height: 600, title: "Stopwatch", minWidth: 330, fullscreenable: false, show: false
  });
  stopwatchWindow.once('ready-to-show', stopwatchWindow.show);
  stopwatchWindow.$ =stopwatchWindow.jQuery= $;
  stopwatchWindow.loadURL(`file://${__dirname}/Stopwatch/Stopwatch_precise.html`);
  // devTools
  //timerWindow.webContents.openDevTools();

  stopwatchWindow.on('close', (event) => {
    if (!quit){
      stopwatchWindow.hide();
      event.preventDefault();
    } else {
      stopwatchWindow = null;
    }
  });
}

function openTimerWindow() {
  if (timerWindow === null || timerWindow === undefined)
    createTimerWindow();
  else {
    timerWindow.show();
    if (timerWindow.isMinimized())timerWindow.restore();
    timerWindow.focus();
  }
}

function openStopwatchWindow() {
  if (stopwatchWindow === null || stopwatchWindow === undefined)
    createStopwatchWindow();
  else {
    stopwatchWindow.show();
    if (stopwatchWindow.isMinimized())stopwatchWindow.restore();
    stopwatchWindow.focus();
  }
}
