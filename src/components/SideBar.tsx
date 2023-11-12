// SideBar.tsx
import React from 'react';
import FileExplorer from './FileExplorer';

interface SideBarProps {
  selectedFolderPath: string | null;
}

const SideBar: React.FC<SideBarProps> = ({ selectedFolderPath }) => {
  return (
    <div className="side-bar">
      <FileExplorer selectedFolderPath={selectedFolderPath} />
      {/* Include other components like PluginManager and NodeManager here */}
    </div>
  );
};

export default SideBar;
