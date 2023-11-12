import React from 'react';

const MainArea: React.FC = () => {
  return (
    <div className="main-area">
      <div className="tab">Tab 1</div>
      <div className="tab">Tab 2</div>
      <textarea placeholder="Markdown Editor"></textarea>
      <div className="node-visualization">Node Management Visualization</div>
    </div>
  );
}

export default MainArea;
