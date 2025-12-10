import { useState } from 'react';
import { analyzeSymptoms, findHospitals } from './api/api';
import SearchForm from './components/SearchForm';
import Results from './components/Results';
import './styles.css';

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
      setHospitals(hospitalsData.hospitals); 
      
    } catch (err) {
      console.error(err);
      setError("Unable to process request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="glass-wrapper">
        <header className="app-header">
          <div className="logo-badge">AI Powered</div>
          <h1>Health <span className="text-neon">Navigator</span></h1>
          <p className="subtitle">Advanced Symptom Triage & Hospital Finder</p>
        </header>

        <main>
          {/* Step 1: Input */}
          <section className="input-section">
            <SearchForm onSearch={handleSearch} loading={loading} />
          </section>

          {error && (
            <div className="error-banner">
              ⚠️ {error}
            </div>
          )}

          {/* Step 2 & 3: Results */}
          <Results 
            analysis={analysis}
            hospitals={hospitals}
            loading={loading}
          />
        </main>

        <footer className="app-footer">
          <p>
            <strong>Disclaimer:</strong> AI-generated results for informational purposes only. In strict medical emergencies, call emergency services immediately.
          </p>
          <p className="footer-credit">Powered by Gemini AI • React • Node.js</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
