// preload.ts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  openFolderDialog: () => ipcRenderer.invoke('open-folder-dialog'),
  readDir: (dirPath: string) => ipcRenderer.invoke('read-dir', dirPath),
  isDirectory: (filePath: string) => ipcRenderer.invoke('is-directory', filePath),
  joinPath: (...args: string[]) => ipcRenderer.invoke('join-path', ...args),
  openPath: (filePath: string) => ipcRenderer.invoke('open-path', filePath),
  listFiles: (dirPath) => ipcRenderer.invoke('list-files', dirPath)
});