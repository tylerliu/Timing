
'use strict';

const {Menu, app} = require('electron');
const windows = require('./windows');
var menu;

function getTemplate(){
  var template = [
    {
      label: app.getName(),
      submenu: [
        {role: 'about'},
        {type: 'separator'},
        {role: 'services', submenu: []},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
        {role: 'quit'}
      ]
    },
    {
      role: 'window',
      submenu: [
        {label: 'Open Timer', click(){windows.openTimerWindow()}},
        {label: 'Open Stopwatch', click(){windows.openStopwatchWindow()}},
        {role: 'close'},
        {role: 'minimize'},
        {role: 'zoom'},
        {type: 'separator'},
        {role: 'front'}
      ]
    }
  ]
  return process.platform === 'darwin' ? template : null;
}

function useTemplate(){
  menu = Menu.buildFromTemplate(getTemplate());
  Menu.setApplicationMenu(menu);
  setDockMenu();
}

function setDockMenu(){
  const dockMenu = Menu.buildFromTemplate(
    [
  {label: 'Open Timer', click () { windows.openTimerWindow() }},
  {label: 'Open Stopwatch',click() { windows.openStopwatchWindow()}}
  ]);
  app.dock.setMenu(dockMenu);
}

function setUserTask(){
  var argument = "";
  for (var i = 1; i < process.argv.length; i ++)
    argument += process.argv[i].replace(" ", "\ ") + ' ';
  app.setUserTasks([
  {
    program: process.execPath,
    arguments: argument + '--timer',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'Open Timer',
    description: 'Open the timer window'
  },
  {
    program: process.execPath,
    arguments: argument + '--stopwatch',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'Open Stopwatch',
    description: 'Open the stopwatch window'
  }
])
}

function setIconMenu(){
  if (process.platform === 'darwin')
    setDockMenu();
  else if (process.platform === 'win32')
    setUserTask();
}

module.exports = {
  getTemplate : getTemplate,
  template : getTemplate(),
  useTemplate : useTemplate,
  setIconMenu : setIconMenu
}
