import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [symptoms, setSymptoms] = useState('');
  const [city, setCity] = useState('Ahmedabad');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ symptoms, city });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto 30px', padding: '20px', borderRadius: '8px', backgroundColor: '#333' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Describe your symptoms</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="symptoms" style={{ display: 'block', marginBottom: '5px' }}>Symptoms</label>
          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g. I have a severe headache and nausea..."
            rows={4}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #555',
              backgroundColor: '#444',
              color: 'white',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
        </div>
        
        <div>
          <label htmlFor="city" style={{ display: 'block', marginBottom: '5px' }}>City</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #555',
              backgroundColor: '#444',
              color: 'white',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button 
          type="submit" 
          style={{ 
            padding: '12px', 
            fontSize: '16px', 
            fontWeight: 'bold',
            marginTop: '10px',
            backgroundColor: '#646cff',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Find Hospitals
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
