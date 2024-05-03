"use strict";
const electron = require("electron");
const path$1 = require("path");
const utils = require("@electron-toolkit/utils");
const child_process = require("child_process");
const si = require("systeminformation");
const icon = path$1.join(__dirname, "../../resources/icon.png");
let child;
async function RunCommand(event, config_json) {
  const value = config_json["_value"];
  console.log(value);
  child = child_process.spawn(config_json["_value"], { shell: true });
  child.stdout.on("data", (data) => {
    event.sender.send("ffmpeg-output", data.toString());
  });
  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
    event.sender.send("ffmpeg-output", data.toString());
  });
  child.on("close", (code) => {
    console.log(`����`);
  });
}
const selectDirectory = async () => {
  const res = await electron.dialog.showOpenDialog({
    title: "选择文件夹",
    properties: ["openDirectory", "createDirectory"]
  });
  return res.canceled === false ? res.filePaths[0].replace(/\\/g, "/") : "";
};
async function getGpuInfo() {
  const deviceList = [];
  const gpus = await si.graphics();
  for (const i in gpus.controllers) {
    deviceList.push(gpus.controllers[i].model);
  }
  return deviceList;
}
async function getCpuInfo() {
  const cpu = await si.cpu();
  return cpu.brand;
}
const ipc = (win) => {
  electron.ipcMain.handle("selectDirectory", async () => {
    return selectDirectory();
  });
  electron.ipcMain.handle("getGpuInfo", async () => {
    return getGpuInfo();
  });
  electron.ipcMain.handle("getCpuInfo", async () => {
    return getCpuInfo();
  });
};
const appPath = electron.app.getAppPath();
const path = require("path");
const fs = require("fs");
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 900,
    height: 670,
    minWidth: 900,
    // 设置最小宽度
    minHeight: 670,
    // 设置最小高度
    show: false,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path$1.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path$1.join(__dirname, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.ipcMain.on("execute-command", RunCommand);
  electron.ipcMain.on("generate-json", (event, data) => {
    const filePath = path.join(appPath, "json", "setting.json");
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  });
  electron.ipcMain.on("open-folder-dialog", (event) => {
    electron.dialog.showOpenDialog({
      properties: ["openDirectory"]
    }).then((result) => {
      if (!result.canceled) {
        event.sender.send("selected-folder", result.filePaths[0]);
      }
    }).catch((err) => {
      console.error("Error opening folder dialog:", err);
    });
  });
  electron.ipcMain.on("ping", () => console.log("pong"));
  electron.ipcMain.on("upload-file", (event, filePath) => {
    console.log("File path:", filePath);
  });
  createWindow();
  ipc();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
