import React from 'react';
import HospitalCard from './HospitalCard';

const Results = ({ analysis, hospitals, loading }) => {
  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.2em' }}>Loading...</p>;
  }

  return (
    <div style={{ padding: '0 20px', paddingBottom: '50px' }}>
      {analysis && (
        <div style={{
          backgroundColor: '#1a1a1a',
          border: '1px solid #646cff',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '20px',
          maxWidth: '800px',
          margin: '0 auto 20px'
        }}>
          <h3 style={{ marginTop: 0, color: '#646cff' }}>Analysis Result</h3>
          <p><strong>Detected Speciality:</strong> {analysis.speciality}</p>
          <p><strong>Urgency:</strong> {analysis.urgency}</p>
        </div>
      )}

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {(!hospitals || hospitals.length === 0) ? (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>No hospitals found.</p>
        ) : (
          hospitals.map((hospital) => (
            <HospitalCard key={hospital._id || hospital.name} h={hospital} />
          ))
        )}
      </div>
    </div>
  );
};

export default Results;
