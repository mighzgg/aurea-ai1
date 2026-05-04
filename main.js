import { app, BrowserWindow } from "electron";
import { spawn } from "child_process";

let backend;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  backend = spawn("node", ["server.js"], { windowsHide: true });
  createWindow();
});

app.on("window-all-closed", () => {
  if (backend) backend.kill();
  app.quit();
});
