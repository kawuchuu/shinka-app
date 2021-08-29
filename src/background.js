'use strict'

const {
    app,
    protocol,
    BrowserWindow,
    ipcMain
} = require('electron')
const { existsSync } = require('fs')
const path = require('path')
const isDevelopment = path.extname(__dirname) !== '.asar'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
    scheme: 'app',
    privileges: {
        secure: true,
        standard: true
    }
}])

// Check for Shinka & start

if (existsSync(__dirname, 'shinka/main.js') && process.argv.indexOf('--disableBot') === -1) {
    if (isDevelopment) {
        require(`../shinka/main`);
    } else {
        require(`${__dirname}/shinka/main`);
    }
}

async function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 1350,
        height: 750,
        minWidth: 750,
        minHeight: 400,
        show: false,
        backgroundColor: '#181818',
        title: 'Shinka',
        webPreferences: {

            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            preload: isDevelopment ? path.resolve(__dirname, '../src/preload.js') : path.resolve(__dirname, 'preload.js')
        }
    })

    if (isDevelopment && process.argv.indexOf('--disableBot') !== -1) {
        ipcMain.handle('state', () => {
            return 'dev'
        })
    } 

    ipcMain.handle('ytKey', () => {
        return require('../shinka/config.json').ytkey
    })

    win.setMenuBarVisibility(false)

    win.on('ready-to-show', () => {
        win.show()
    })

    if (process.env.NODE_ENV === 'development') {
        // Load the url of the dev server if in development mode
        await win.loadURL('http://localhost:8080')
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        // Load the index.html when not in development
        win.loadURL(`file://${__dirname}/index.html`)
    }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    createWindow()
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer');
            await installExtension(VUEJS_DEVTOOLS)
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}