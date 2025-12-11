import React from 'react';
import './ConfigSection.css';

const ConfigSection = ({ apiUrl, setApiUrl }) => {
  return (
    <div className="config-section">
      <label htmlFor="api-url">Backend API URL:</label>
      <input
        type="text"
        id="api-url"
        value={apiUrl}
        onChange={(e) => setApiUrl(e.target.value)}
        placeholder="http://localhost:5001"
      />
    </div>
  );
};

export default ConfigSection;
