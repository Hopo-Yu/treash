import React, { useState } from 'react';


interface NewRepoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewRepoModal: React.FC<NewRepoModalProps> = ({ isOpen, onClose }) => {
  const [repoName, setRepoName] = useState('');
  const [repoPath, setRepoPath] = useState('');
  const [isGitRepo, setIsGitRepo] = useState(false);


  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create New Repository</h2>
        <input
          type="text"
          placeholder="Repository Name"
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Repository Path"
          value={repoPath}
          onChange={(e) => setRepoPath(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={isGitRepo}
            onChange={(e) => setIsGitRepo(e.target.checked)}
          />
          Initialize as Git Repository
        </label>
        <button>Create Repository</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default NewRepoModal;
