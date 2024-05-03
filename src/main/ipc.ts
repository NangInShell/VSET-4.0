import {IpcMainInvokeEvent, ipcMain, BrowserWindow} from 'electron'
import{ selectDirectory } from './directory'
import{ getGpuInfo,getCpuInfo } from './getSystemInfo'


export default (win: BrowserWindow) => {
    ipcMain.handle('selectDirectory', async () => {
      return selectDirectory()
    })

    ipcMain.handle('getGpuInfo', async () => {
      return getGpuInfo()
    })

    ipcMain.handle('getCpuInfo', async () => {
      return getCpuInfo()
    })

  }