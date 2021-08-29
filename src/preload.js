const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('shinkaServer', {
    getState: () => ipcRenderer.invoke('state'),
    getYtKey: () => ipcRenderer.invoke('ytKey')
})