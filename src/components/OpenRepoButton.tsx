import React from 'react';

const OpenRepoButton = ({ onFolderSelect }) => {

  const handleOpenExistingRepo = async () => {
    try {
      const folderPath = await window.electronAPI.openFolderDialog();
      if (folderPath && typeof folderPath === 'string') { // Check if folderPath is a string
        console.log('Opened Repository Folder:', folderPath);
        onFolderSelect(folderPath); // Call the onFolderSelect function with the folder path
      } else if (Array.isArray(folderPath) && folderPath.length > 0) { // Handle the case where folderPath might be an array
        console.log('Opened Repository Folder:', folderPath[0]);
        onFolderSelect(folderPath[0]); // Use the first item if it's an array
      } else {
        console.log('Repository opening was canceled');
      }
    } catch (error) {
      console.error('Error opening repository:', error);
    }
  };

  return (
    <button onClick={handleOpenExistingRepo}>Open Existing Repository</button>
  );
};

export default OpenRepoButton;
