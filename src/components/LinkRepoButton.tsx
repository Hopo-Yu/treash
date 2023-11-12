// components/LinkRepoButton.tsx

import React from 'react';

const LinkRepoButton: React.FC = () => {
  const handleLinkRepo = async () => {
    const path = await (window as any).electron.showDialog();
    if (path) {
      console.log('Selected repository path:', path);
      // Here, you can add further logic to handle the selected repository.
    }
  };

  return (
    <button onClick={handleLinkRepo}>Link Repository</button>
  );
};

export default LinkRepoButton;
