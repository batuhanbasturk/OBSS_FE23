const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev"); // Import the 'electron-is-dev' module

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Check if running in development mode or production mode
  const startURL = isDev
    ? "http://localhost:3000" // Development server URL
    : url.format({
        pathname: path.join(__dirname, "build", "index.html"), // Production build path
        protocol: "file:",
        slashes: true,
      });

  mainWindow.loadURL(startURL);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // Hide the top menu
  //Menu.setApplicationMenu(null);
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
