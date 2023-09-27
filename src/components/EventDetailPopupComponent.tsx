import React, { useState } from 'react';

type EventDetailPopupProps = {
  initialContent: string;
  onClose: () => void;
};

const EventDetailPopupComponent: React.FC<EventDetailPopupProps> = ({ initialContent, onClose }) => {
  const [content, setContent] = useState(initialContent);

  return (
    <div className="event-detail-popup">
      <button onClick={onClose}>X</button>
      <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
      <button onClick={() => {/* Save logic here */}}>Save</button>
    </div>
  );
};

export default EventDetailPopupComponent;
