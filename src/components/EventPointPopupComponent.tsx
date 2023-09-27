import React from 'react';

type EventPointPopupProps = {
  title: string;
  description: string;
  onClose: () => void;
};

const EventPointPopupComponent: React.FC<EventPointPopupProps> = ({ title, description, onClose }) => {
  return (
    <div className="event-point-popup">
      <button onClick={onClose}>X</button>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default EventPointPopupComponent;
