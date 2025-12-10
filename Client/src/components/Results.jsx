import React from 'react';
import HospitalCard from './HospitalCard';

const Results = ({ analysis, hospitals, loading }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader-pulse"></div>
        <p>AI is analyzing your symptoms and finding the best care...</p>
      </div>
    );
  }

  if (!analysis && !hospitals.length) return null;

  const getUrgencyClass = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case 'high': return 'badge-red';
      case 'medium': return 'badge-orange';
      default: return 'badge-green';
    }
  };

  return (
    <div className="results-container">
      {analysis && (
        <div className="card-glass analysis-card fade-in">
          <div className="step-label">Step 2: AI Analysis</div>
          
          <div className="analysis-grid">
            <div className="analysis-item">
              <span className="label">Recommended Specialist</span>
              <h3 className="text-highlight">{analysis.speciality}</h3>
            </div>

            <div className="analysis-item">
              <span className="label">Urgency Level</span>
              <span className={`badge ${getUrgencyClass(analysis.urgency)}`}>
                {analysis.urgency?.toUpperCase()}
              </span>
            </div>

            <div className="analysis-item full-width">
              <span className="label">Possible Conditions Detected</span>
              <div className="chips-container">
                {analysis.possible_diseases?.map((d, index) => (
                  <div key={index} className="chip">
                    <span className="chip-name">{d.name}</span>
                    <span className="chip-prob">{(d.probability * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {hospitals && hospitals.length > 0 && (
        <div className="hospitals-section fade-in-delay">
          <div className="section-header">
            <div className="step-label">Step 3: Nearby Care</div>
            <h3>Recommended Hospitals</h3>
            <p className="text-sm text-gray">Sorted by relevance and cost</p>
          </div>
          
          <div className="hospitals-grid">
            {hospitals.map((hospital, i) => (
              <HospitalCard key={hospital._id || i} h={hospital} />
            ))}
          </div>
        </div>
      )}

      {analysis && (!hospitals || hospitals.length === 0) && (
        <p className="no-results">No relevant hospitals found in this area.</p>
      )}
    </div>
  );
};

export default Results;
