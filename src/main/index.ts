import { app, shell, BrowserWindow,ipcMain,ipcRenderer,dialog  } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { RunCommand } from './RunCommand'

import { spawn } from 'child_process'
import ipc from './ipc'

const appPath = app.getAppPath();

const path = require('path');
const fs = require('fs');


function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    minWidth: 900, // 设置最小宽度
    minHeight: 670, // 设置最小高度
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()

  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })


  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

}


app.whenReady().then(() => {

  electronApp.setAppUserModelId('com.electron')


  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })


  ipcMain.on('execute-command', RunCommand)
  ipcMain.on('generate-json', (event, data) => {
    // console.log(appPath, 'json', 'setting.json');
    const filePath = path.join(appPath, 'json', 'setting.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  });

  ipcMain.on('open-folder-dialog', (event) => {
    dialog.showOpenDialog({
      properties: ['openDirectory'],
    }).then(result => {
      if (!result.canceled) {
        event.sender.send('selected-folder', result.filePaths[0]);
      }
    }).catch(err => {
      console.error('Error opening folder dialog:', err);
    });
  });


  ipcMain.on('ping', () => console.log('pong'))

  ipcMain.on('upload-file', (event, filePath) => {
  console.log('File path:', filePath);

  });

  // createWindow()
  const win = createWindow()
  ipc(win)

  app.on('activate', function () {

    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

