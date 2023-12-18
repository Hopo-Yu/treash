import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  openFolderDialog: () => ipcRenderer.invoke('open-folder-dialog'),
  listFiles: (dirPath) => ipcRenderer.invoke('list-files', dirPath),
  openFile: (filePath) => ipcRenderer.invoke('open-file', filePath),
  renameFile: (oldPath, newPath) => ipcRenderer.invoke('rename-file', oldPath, newPath),
  deleteFile: (filePath) => ipcRenderer.invoke('delete-file', filePath),
  createFile: (filePath) => ipcRenderer.invoke('create-file', filePath),
  createDirectory: (dirPath) => ipcRenderer.invoke('create-directory', dirPath),
  moveFile: (source, destination) => ipcRenderer.invoke('move-file', source, destination),
});
