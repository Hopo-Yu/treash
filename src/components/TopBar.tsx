import React from 'react';
import NewRepoButton from './NewRepoButton';
import OpenRepoButton from './OpenRepoButton';

interface TopBarProps {
  onFolderSelect: (path: string | null) => void;
}

const TopBar: React.FC<TopBarProps> = ({ onFolderSelect }) => {
  return (
    <div className="top-bar">
      <button>Menu</button>
      <NewRepoButton /> 
      <OpenRepoButton onFolderSelect={onFolderSelect} /> 
      <input type="text" placeholder="Search..." />
      <button>Notification</button>
      <button>Profile</button>
    </div>
  );
}

export default TopBar;
