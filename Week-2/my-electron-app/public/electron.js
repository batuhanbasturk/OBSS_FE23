const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Use __dirname to get the correct path in production mode
  const isDev = process.env.NODE_ENV === "development";
  const startURL = isDev
    ? "http://localhost:3000"
    : url.format({
        pathname: path.join(__dirname, "../build/index.html"), // Adjust the path for production build
        protocol: "file:",
        slashes: true,
      });

  mainWindow.loadURL(startURL);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
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
