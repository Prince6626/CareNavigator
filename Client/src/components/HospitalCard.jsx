import React from 'react';

const HospitalCard = ({ h }) => {
  if (!h) return null;

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      margin: '10px 0',
      backgroundColor: '#2a2a2a',
      textAlign: 'left'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: '5px' }}>
        {h.name} <span style={{ fontSize: '0.8em', fontWeight: 'normal', color: '#aaa' }}>({h.hospital_type})</span>
      </h3>
      <p style={{ margin: '5px 0' }}><strong>Address:</strong> {h.address}</p>
      
      {h.rating != null && (
        <p style={{ margin: '5px 0' }}><strong>Rating:</strong> {h.rating} / 5</p>
      )}

      {h.cost_text && (
        <p style={{ margin: '5px 0' }}><strong>Cost: {h.cost_text}</strong></p>
      )}

      {h.map_url && (
        <a 
          href={h.map_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ display: 'inline-block', marginTop: '10px', color: '#646cff' }}
        >
          Open in Maps
        </a>
      )}
    </div>
  );
};

export default HospitalCard;
