import React, { useState } from 'react';

const SearchForm = ({ onSearch, loading }) => {
  const [symptoms, setSymptoms] = useState('');
  const [city, setCity] = useState('Ahmedabad');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ symptoms, city });
  };

  return (
    <div className="card-glass search-form-card">
      <div className="step-label">Step 1: Triage</div>
      <h2>Describe Symptoms</h2>
      <p className="helper-text">Our AI will analyze your condition and recommend the right specialist.</p>
      
      <form onSubmit={handleSubmit} className="form-layout">
        <div className="form-group">
          <label htmlFor="symptoms">Symptoms Description</label>
          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g. I have had a severe high fever for 3 days with joint pain and nausea..."
            rows={4}
            className="modern-input"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="city">Current Location (City)</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="modern-input"
            placeholder="e.g. New York"
            required
          />
        </div>

        <button 
          type="submit" 
          className={`btn-primary ${loading ? 'btn-loading' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex-center gap-2">
              <span className="spinner"></span> Analyzing...
            </span>
          ) : (
            'Analyze & Find Hospitals'
          )}
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
