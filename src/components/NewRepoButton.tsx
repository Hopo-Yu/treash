import React, { useState } from 'react';

const NewRepoButton: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const handleCreateNewRepo = async () => {
    try {
      const folderPath = await window.electronAPI.openFolderDialog();
      setSelectedFolder(folderPath);
      if (folderPath) {
        console.log('Selected Folder:', folderPath);
        // Here you can add additional logic to handle the selected folder
      } else {
        console.log('Folder selection was canceled');
      }
    } catch (error) {
      console.error('Error selecting folder:', error);
    }
  };

  return (
    <div>
      <button onClick={handleCreateNewRepo}>Create New Repository</button>
      {selectedFolder !== null && (
        <div>Selected Folder: {selectedFolder || 'None'}</div>
      )}
    </div>
  );
};

export default NewRepoButton;
