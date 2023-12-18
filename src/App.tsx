// App.tsx
import React, { useState } from 'react';
import './index.css';
import Sidebar from './components/layout/Sidebar';
import TabArea from './components/layout/TabArea';

function App() {
  const [isSplitView, setIsSplitView] = useState(false);

  const toggleSplitView = () => {
    setIsSplitView(!isSplitView);
  };

  return (
    <div className="App" style={{ display: 'flex', height: '100vh' }}> {/* Flex container */}
      <Sidebar toggleSplitView={toggleSplitView} />
      <div className="content-container" style={{ flex: 1 }}> {/* Flex item */}
        <TabArea isSplitView={isSplitView} />
      </div>
    </div>
  );
}

export default App;

