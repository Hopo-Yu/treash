import React from 'react';
import MapComponent from './components/MapComponent'; 
import TopBarComponent from './components/TopBarComponent';

function App() {
  console.log('App.tsx is loaded');
  return (
    <div className="App">
      <TopBarComponent/>
      <MapComponent />
    </div>
  );
}
export default App;
