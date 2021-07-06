const { contextBridge, ipcRenderer } = require('electron')

console.log('lmaoooo')

contextBridge.exposeInMainWorld('shinkaServer', {
    getState: () => ipcRenderer.invoke('state')
})