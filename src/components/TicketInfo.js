import React from 'react';
import './TicketInfo.css';

const TicketInfo = ({ ticketData }) => {
  if (!ticketData) return null;

  return (
    <div className="ticket-info show">
      <h3>معلومات التذكرة</h3>
      <div className="ticket-row">
        <span className="ticket-label">رقم التذكرة:</span>
        <span className="ticket-value">{ticketData.ticketId?.slice(-8) || '-'}</span>
      </div>
      {ticketData.match && (
        <div className="ticket-row">
          <span className="ticket-label">المباراة:</span>
          <span className="ticket-value">
            {ticketData.match.homeTeam} vs {ticketData.match.awayTeam}
          </span>
        </div>
      )}
      {ticketData.seat && (
        <div className="ticket-row">
          <span className="ticket-label">المقعد:</span>
          <span className="ticket-value">
            {ticketData.seat.zone} - {ticketData.seat.area}
          </span>
        </div>
      )}
      <div className="ticket-row">
        <span className="ticket-label">الحالة:</span>
        <span className="ticket-value">{ticketData.status || '-'}</span>
      </div>
    </div>
  );
};

export default TicketInfo;
