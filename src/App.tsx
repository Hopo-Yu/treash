import React, { useState } from 'react';
import SideBar from './components/SideBar';
import MainArea from './components/MainArea';
import TopBar from './components/TopBar';
import './index.css';


function App() {
  console.log('App.tsx is loaded');
  const [selectedFolderPath, setSelectedFolderPath] = useState<string | null>(null);
  return (
    <div className="App">
      <TopBar onFolderSelect={setSelectedFolderPath} />
      <div className="content-container">
        <SideBar selectedFolderPath={selectedFolderPath} />
        <MainArea />
      </div>
    </div>
  );
}
export default App;
