// FileExplorer.tsx
import React, { useState, useEffect } from 'react';

interface FileItem {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FileItem[];
}

const FileExplorer: React.FC<{ selectedFolderPath: string | null }> = ({ selectedFolderPath }) => {
  const [fileTree, setFileTree] = useState<FileItem[]>([]);

  const fetchFiles = async (path: string, parent?: FileItem) => {
    try {
      const fileList = await window.electronAPI.listFiles(path);
      const files = fileList.map(file => ({
        ...file,
        path: `${path}/${file.name}`,
        children: file.isDirectory ? [] : undefined
      }));

      if (parent) {
        // Update the parent node with children
        parent.children = files;
        setFileTree([...fileTree]);
      } else {
        // Set the root level files
        setFileTree(files);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    if (selectedFolderPath) {
      fetchFiles(selectedFolderPath);
    }
  }, [selectedFolderPath]);

  const toggleDirectory = async (file: FileItem) => {
    if (file.children && file.children.length > 0) {
      // Collapse the directory
      file.children = [];
    } else {
      // Expand the directory
      await fetchFiles(file.path, file);
    }
    setFileTree([...fileTree]);
  };

  const renderFileTree = (files: FileItem[]) => {
    return files.map(file => (
      <div key={file.path}>
        <div onClick={() => file.isDirectory && toggleDirectory(file)}>
          {file.name} {file.isDirectory ? '[Dir]' : '[File]'}
        </div>
        {file.isDirectory && file.children && <div style={{ paddingLeft: '20px' }}>{renderFileTree(file.children)}</div>}
      </div>
    ));
  };

  if (!selectedFolderPath) {
    return <div>Select a folder to view its contents</div>;
  }

  return <div>{renderFileTree(fileTree)}</div>;
};

export default FileExplorer;
