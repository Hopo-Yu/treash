import React, { useState } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
// import "../../styles/TabArea.scss";

interface TabAreaProps {
  isSplitView: boolean;
}

function TabArea({ isSplitView }: TabAreaProps) {
  return (
    <div style={{ width: '100%', height: '100%' }}> {/* Adjust width and height as needed */}
      {isSplitView ? (
        <Allotment>
          <div style={{ background: 'lightblue', height: '100%' }}>Pane 1</div>
          <div style={{ background: 'lightgreen', height: '100%' }}>Pane 2</div>
        </Allotment>
      ) : (
        <Allotment>
          <div style={{ background: 'lightcoral', height: '100%' }}>Single Pane</div>
        </Allotment>
      )}
    </div>
  );
}

export default TabArea;
