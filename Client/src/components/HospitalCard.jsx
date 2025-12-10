import React from 'react';

const HospitalCard = ({ h }) => {
  if (!h) return null;

  return (
    <div className="hospital-card card-glass-hover">
      <div className="card-header">
        <div className="hospital-info">
          <h3 className="hospital-name">{h.name}</h3>
          <span className="hospital-type">{h.hospital_type || 'General Hospital'}</span>
        </div>
        
        {h.rating != null && (
          <div className="rating-badge">
            <span className="star">★</span> {h.rating}
          </div>
        )}
      </div>

      <div className="card-body">
        <p className="address-text">📍 {h.address}</p>
        
        {h.cost_text && (
          <div className="cost-section">
            <span className="label">Est. Treatment Cost</span>
            <span className="cost-value">{h.cost_text}</span>
          </div>
        )}

        <div className="card-actions">
           {h.map_url ? (
            <a 
              href={h.map_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-outline btn-map"
            >
              Get Directions ↗
            </a>
           ) : (
             <button disabled className="btn-outline disabled">Map Unavailable</button>
           )}
           
           <button className="btn-outline btn-call">
             Call Now
           </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;
