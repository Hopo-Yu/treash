import React, { useState, useEffect } from 'react';

const SystemExplorer = ({ selectedFolderPath }) => {
  const [fileTree, setFileTree] = useState([]);
  const [expandedPaths, setExpandedPaths] = useState({});

  useEffect(() => {
    if (selectedFolderPath) {
      readDirectory(selectedFolderPath).catch(error => {
        console.error('Failed to read directory:', serializeError(error));
      });
    }
  }, [selectedFolderPath]);

  const serializeError = (error) => {
    return { message: error.message, stack: error.stack };
  };

  const readDirectory = async (dirPath) => {
    try {
      const fileTreeStructure = await window.electronAPI.readDir(dirPath);
      if (fileTreeStructure.error) {
        console.error(fileTreeStructure.error);
        // Handle the error in the UI
      } else {
        setFileTree(fileTreeStructure);
      }
    } catch (error) {
      console.error(`Error reading directory at path ${dirPath}:`, error);
      // Handle the error in the UI
    }
  };
  
  

  const openFile = (filePath) => {
    window.electronAPI.openPath(filePath).catch(error => {
      console.error('Failed to open file:', serializeError(error));
    });
  };

  const toggleDirectory = async (filePath) => {
    const isExpanded = expandedPaths[filePath];
    if (isExpanded) {
      setExpandedPaths({ ...expandedPaths, [filePath]: false });
    } else {
      try {
        await readDirectory(filePath);
        setExpandedPaths({ ...expandedPaths, [filePath]: true });
      } catch (error) {
        console.error('Failed to toggle directory:', serializeError(error));
      }
    }
  };

  return (
    <div className="system-explorer">
      {fileTree.map(file => (
        <div
          key={file.path}
          onClick={() => file.isDirectory ? toggleDirectory(file.path) : openFile(file.path)}
        >
          {file.name}
          {file.isDirectory && expandedPaths[file.path] && (
            <div>
              {/* Render the subdirectory here, you might need to create a recursive component for nested directories */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SystemExplorer;
