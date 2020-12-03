// Modules
const {app, BrowserWindow} = require('electron')
const windowStateKeeper = require('electron-window-state')

setTimeout( () => {
console.log('Checking Ready => ' + app.isReady())
}, 2000)
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, secondaryWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  let winState = windowStateKeeper({
    defaultWidth: 1000, defaultHeight: 800
  })

  mainWindow = new BrowserWindow({
    width: winState.width, height: winState.height,
    x: winState.x, y: winState.y,
    minWidth: 300, minHeight: 150,
    webPreferences: { nodeIntegration: true },
    backgroundColor: '#2B2E3B',
   
  })

  
  
  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')
 

  // Open DevTools - Remove for PRODUCTION!
  //mainWindow.webContents.openDevTools();

  winState.manage(mainWindow)

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })



}


// Electron `app` is ready
app.on('ready', () => { 
createWindow()
})

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
