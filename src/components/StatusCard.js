import React from 'react';
import './StatusCard.css';

const StatusCard = ({ status }) => {
  if (!status.show) return null;

  return (
    <div className={`status-card show ${status.type}`}>
      <div className="icon">{status.icon}</div>
      <div className="message">{status.message}</div>
      <div className="details">{status.details}</div>
    </div>
  );
};

export default StatusCard;
