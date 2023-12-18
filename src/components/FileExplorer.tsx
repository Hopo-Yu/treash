import React, { useState, useEffect } from 'react';

interface FileItem {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FileItem[];
}

const FileExplorer: React.FC<{ selectedFolderPath: string | null }> = ({ selectedFolderPath }) => {
  const [fileTree, setFileTree] = useState<FileItem[]>([]);
  const [contextMenu, setContextMenu] = useState({ xPos: "0px", yPos: "0px", file: null, isDirectory: false });
  const [clipboard, setClipboard] = useState({ file: null, action: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [editingFile, setEditingFile] = useState(null);
  const [newFileName, setNewFileName] = useState('');

  const startEditing = (file) => {
    setEditingFile(file);
    setNewFileName(file.name);
  };

  const saveEdit = async () => {
    if (editingFile && newFileName !== editingFile.name) {
      await window.electronAPI.renameFile(editingFile.path, newFileName);
      fetchFiles(selectedFolderPath); // Refresh the file tree
    }
    setEditingFile(null);
  };

  const renderFileItem = (file) => {
    if (editingFile && editingFile.path === file.path) {
      return (
        <input
          type="text"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          onBlur={saveEdit}
          onKeyPress={(e) => { if (e.key === 'Enter') saveEdit(); }}
          autoFocus
        />
      );
    }
    return (
      <div 
        onClick={(e) => handleDirectoryClick(file, e)}
        onDoubleClick={(e) => !file.isDirectory && handleFileOpen(file, e)}>
        {file.name} {file.isDirectory ? '[Dir]' : '[File]'}
      </div>
    );
  };

  const fetchFiles = async (path: string, parent?: FileItem) => {
    try {
      const fileList = await window.electronAPI.listFiles(path);
      const files = fileList.map(file => ({
        ...file,
        path: `${path}/${file.name}`,
        children: file.isDirectory ? [] : undefined
      }));

      if (parent) {
        parent.children = files;
        setFileTree([...fileTree]);
      } else {
        setFileTree(files);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file, event) => {
    event.stopPropagation();
    setSelectedFile(file);
  };

  useEffect(() => {
    if (selectedFolderPath) {
      fetchFiles(selectedFolderPath);
    }

    // Function to close the context menu
    const closeContextMenu = () => {
      setContextMenu({ ...contextMenu, file: null });
    };

    // Add event listener to close the context menu
    document.addEventListener('click', closeContextMenu);

    // Clean up the event listener
    return () => {
      document.removeEventListener('click', closeContextMenu);
    };
  }, [selectedFolderPath, contextMenu]);

  
  const handleFileOpen = (file, event) => {
    event.stopPropagation();
    if (!file.isDirectory) {
      window.electronAPI.openFile(file.path);
    }
  };
  

  const toggleDirectory = async (file, event) => {
    // Prevent event from propagating to the document
    event.stopPropagation();
    if (file.children && file.children.length > 0) {
      file.children = [];
    } else {
      await fetchFiles(file.path, file);
    }
    setFileTree([...fileTree]);
  };

  const handleDirectoryClick = (file, event) => {
    event.stopPropagation();
    setSelectedFile(file);

    if (event.button === 0) { // Left-click
      toggleDirectory(file, event);
    }
  };

  const handleContextMenu = (event, file) => {
    event.preventDefault();
    event.stopPropagation();

    setContextMenu({ 
      xPos: `${event.pageX}px`, 
      yPos: `${event.pageY}px`, 
      file,
      isDirectory: file.isDirectory 
    });
  };

  
  const handleDragStart = (e, file) => {
    e.dataTransfer.setData("application/my-app", file.path);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e, targetFolder) => {
    e.preventDefault();
    const fileToMovePath = e.dataTransfer.getData("application/my-app");
    window.electronAPI.moveFile(fileToMovePath, targetFolder.path);
    // Refresh file tree or handle UI update
  };

  const renderFileTree = (files: FileItem[]) => {
    return files.map(file => (
      <div key={file.path} 
           onContextMenu={(e) => handleContextMenu(e, file)}
           draggable={true}
           onDragStart={(e) => handleDragStart(e, file)}
           onDrop={(e) => file.isDirectory && handleDrop(e, file)}>
        <div 
          onClick={(e) => handleDirectoryClick(file, e)}
          onDoubleClick={(e) => !file.isDirectory && handleFileOpen(file, e)}>
          {file.name} {file.isDirectory ? '[Dir]' : '[File]'}
        </div>
        {file.isDirectory && file.children && <div style={{ paddingLeft: '20px' }}>{renderFileTree(file.children)}</div>}
      </div>
    ));
  };

  
  
   const onRename = () => {
    if (!contextMenu.file) return;
    startEditing(contextMenu.file);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentFile(null);
  };

  const handleModalConfirm = async (newName) => {
    if (currentFile) {
      await window.electronAPI.renameFile(currentFile.path, newName);
      fetchFiles(selectedFolderPath); // Refresh the file tree
    }
    handleModalClose();
  };

  const onNewFile = async () => {
    if (!contextMenu.file || !contextMenu.isDirectory) return;
    const fileName = prompt("Enter file name:");
    if (fileName) {
      await window.electronAPI.createFile(`${contextMenu.file.path}/${fileName}`);
      fetchFiles(selectedFolderPath); // Refresh the file tree
    }
  };

  const onNewFolder = async () => {
    if (!contextMenu.file || !contextMenu.isDirectory) return;
    const folderName = prompt("Enter folder name:");
    if (folderName) {
      await window.electronAPI.createFolder(`${contextMenu.file.path}/${folderName}`);
      fetchFiles(selectedFolderPath); // Refresh the file tree
    }
  };

  const onCopy = () => {
    if (!contextMenu.file) return;
    setClipboard({ file: contextMenu.file, action: 'copy' });
  };

  const onCut = () => {
    if (!contextMenu.file) return;
    setClipboard({ file: contextMenu.file, action: 'cut' });
  };

  const onPaste = async (targetFolder) => {
    if (!clipboard.file) return;
    const targetPath = `${targetFolder.path}/${clipboard.file.name}`;
    if (clipboard.action === 'copy') {
      await window.electronAPI.copyFile(clipboard.file.path, targetPath);
    } else if (clipboard.action === 'cut') {
      await window.electronAPI.moveFile(clipboard.file.path, targetPath);
      setClipboard({ file: null, action: '' }); // Clear clipboard after cut
    }
    fetchFiles(selectedFolderPath); // Refresh the file tree
  };

  const onDelete = async () => {
    if (!contextMenu.file) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this?");
    if (confirmDelete) {
      await window.electronAPI.deleteFile(contextMenu.file.path);
      fetchFiles(selectedFolderPath); // Refresh the file tree
    }
  };
  

  const ContextMenu = () => {
    if (!contextMenu.file) return null;

    return (
      <ul className="context-menu" style={{ top: contextMenu.yPos, left: contextMenu.xPos }}>
        <li onClick={onRename}>Rename</li>
        {contextMenu.isDirectory && <li onClick={onNewFile}>New File</li>}
        {contextMenu.isDirectory && <li onClick={onNewFolder}>New Folder</li>}
        <li onClick={onCopy}>Copy</li>
        <li onClick={onCut}>Cut</li>
        {clipboard.file && contextMenu.isDirectory && <li onClick={() => onPaste(contextMenu.file)}>Paste</li>}
        <li onClick={onDelete}>Delete</li>
      </ul>
    );
  };

  const Modal = ({ isOpen, onClose, onConfirm, defaultValue }) => {
    const [inputValue, setInputValue] = useState(defaultValue);
  
    if (!isOpen) return null;
  
    return (
      <div className="modal">
        <div className="modal-content">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={() => onConfirm(inputValue)}>Confirm</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    );
  };
  

  if (!selectedFolderPath) {
    return <div>Select a folder to view its contents</div>;
  }

  return (
    <div>
      {renderFileTree(fileTree)}
      <ContextMenu onRename={() => onRename(contextMenu.file)} />
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        defaultValue={currentFile ? currentFile.name : ''}
      />
    </div>
  );
};

export default FileExplorer;


  
