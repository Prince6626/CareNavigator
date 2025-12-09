import { useState } from 'react';
import { analyzeSymptoms, findHospitals } from './api/api';
import SearchForm from './components/SearchForm';
import Results from './components/Results';

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async ({ symptoms, city }) => {
    setError(null);
    setLoading(true);
    setHospitals([]);
    setAnalysis(null);

    try {
      // 1. Analyze Symptoms
      const analysisData = await analyzeSymptoms(symptoms, city);
      setAnalysis(analysisData.analysis);

      // 2. Derive Search Params
      const speciality = analysisData.analysis?.speciality || "General Physician";
      const disease = analysisData.analysis?.possible_diseases?.[0]?.name || "Dengue";

      // 3. Find Hospitals
      const hospitalsData = await findHospitals({ speciality, city, disease });
      setHospitals(hospitalsData.hospitals); // Assuming response structure { hospitals: [...] }
      
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>AI Health Assist (Hackathon Demo)</h1>
      
      <SearchForm onSearch={handleSearch} />

      {error && (
        <p style={{ textAlign: 'center', color: '#ff4444', fontWeight: 'bold' }}>
          {error}
        </p>
      )}
      
      <Results 
        analysis={analysis}
        hospitals={hospitals}
        loading={loading}
      />
    </div>
  );
}

export default App;
