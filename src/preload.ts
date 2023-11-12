import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  openFolderDialog: () => ipcRenderer.invoke('open-folder-dialog'),
  listFiles: (dirPath) => ipcRenderer.invoke('list-files', dirPath),
  openFile: (filePath) => ipcRenderer.invoke('open-file', filePath) // Add this line
});
