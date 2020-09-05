const path = require('path');
const { app, BrowserWindow } = require('electron')
const { webContents } = require('electron')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width:360,
    height: 640,
    frame: true,
    backgroundColor: '#2e2c29',
    autoHideMenuBar: 'true',

    //webview: true,
  })

  // and load the index.html of the app.
  //mainWindow.loadFile('index.html')
  mainWindow.loadURL('https://www.instagram.com/', {
  userAgent:'Mozilla/5.0 (Linux; Android 7.0; SM-G930VC Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/58.0.3029.83 Mobile Safari/537.36'
  })

  const ses = mainWindow.webContents.session
  console.log(ses.getUserAgent())
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  const win = new BrowserWindow({
    width: 360,
    height: 32,
    frame: false,
    resizable: true,
    movable: false,
    skipTaskbar: true,
    parent: mainWindow,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('menu.html')

  mainWindow.on('move', function() {
  let position = mainWindow.getPosition();
  win.setPosition(position[0], position[1]+640);
});

}

const { shell } = require('electron')

app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', async (event, url) => {
    // In this example, we'll ask the operating system
    // to open this event's url in the default browser.
    //event.preventDefault()
    console.log(url);
    //await shell.openExternal(navigationUrl)
  })
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs
app.whenReady().then(createWindow)
//app.whenReady().then(createMenu)
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
//event listeners
