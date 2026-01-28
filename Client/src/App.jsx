import { useState } from 'react';
import { Heart, MapPin, Stethoscope, Hospital, TrendingUp, Search, ChevronRight, Star, Shield } from 'lucide-react';
import { analyzeSymptoms, findHospitals } from './api/api';
import HospitalDetail from './components/HospitalDetail';

function App() {
  const [symptoms, setSymptoms] = useState('');
  const [city, setCity] = useState('Ahmedabad');
  const [step, setStep] = useState('hero');
  const [analysis, setAnalysis] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;
    
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
      const disease = analysisData.analysis?.possible_diseases?.[0]?.name || "General";

      // 3. Find Hospitals
      const hospitalsData = await findHospitals({ speciality, city, disease });
      setHospitals(hospitalsData.hospitals);
      
      setStep('results');
    } catch (err) {
      console.error(err);
      setError("Unable to process request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleHospitalClick = (hospital) => {
    setSelectedHospital(hospital);
    setStep('detail');
  };

  const handleBackToResults = () => {
    setSelectedHospital(null);
    setStep('results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Care<span className="text-emerald-600">Navigator</span>
              </h1>
              <p className="text-xs text-slate-500">AI-Powered Healthcare</p>
            </div>
          </div>
        </div>
      </header>

      {step === 'hero' && (
        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              AI-Powered Healthcare Assistant
            </div>
            <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Find the Right Care,<br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Right When You Need It
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              Describe your symptoms and get instant recommendations for nearby specialists, 
              hospitals, and estimated treatment costs.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl">
                  <Hospital className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">200+</p>
                  <p className="text-sm text-slate-600">Hospitals Mapped</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-xl">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">1K+</p>
                  <p className="text-sm text-slate-600">Conditions Covered</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">98%</p>
                  <p className="text-sm text-slate-600">Accuracy Rate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Input Card */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl shadow-slate-300/50 border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
                <h3 className="text-2xl font-bold text-white mb-2">Start Your Health Journey</h3>
                <p className="text-emerald-50">Tell us what you're experiencing</p>
              </div>
              <div className="p-8 space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    ⚠️ {error}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Describe Your Symptoms
                  </label>
                  <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="E.g., I have had a severe high fever for 3 days with joint pain and nausea..."
                    className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-hidden transition-all resize-none text-slate-700 placeholder-slate-400"
                    rows="4"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Your Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-hidden transition-all text-slate-700"
                      placeholder="Enter your city"
                    />
                  </div>
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={!symptoms.trim() || loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-4 rounded-xl hover:from-emerald-700 hover:to-teal-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-200 hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Analyze & Find Hospitals
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Input Symptoms</h4>
                <p className="text-slate-600">Describe what you're feeling in plain English</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">AI Analysis</h4>
                <p className="text-slate-600">Our AI identifies potential causes and specialist types</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-200">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Get Recommendations</h4>
                <p className="text-slate-600">See nearby specialists and estimated costs</p>
              </div>
            </div>
          </div>
        </main>
      )}

      {step === 'results' && (
        <main className="max-w-7xl mx-auto px-6 py-8">
          <button
            onClick={() => setStep('hero')}
            className="mb-6 text-emerald-600 font-medium flex items-center gap-2 hover:gap-3 transition-all"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            New Search
          </button>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Results */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Recommended Hospitals & Doctors</h3>
              
              {hospitals && hospitals.length > 0 ? (
                hospitals.map((hospital, i) => (
                  <div key={hospital._id || i} className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-slate-900 mb-1">{hospital.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {hospital.address}
                          </div>
                          {hospital.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              {hospital.rating}
                            </div>
                          )}
                        </div>
                      </div>
                      {hospital.cost_text && (
                        <div className="text-right">
                          <div className="text-2xl font-bold text-emerald-600">{hospital.cost_text}</div>
                          <div className="text-xs text-slate-500">Est. treatment</div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                        {hospital.hospital_type || 'General Hospital'}
                      </span>
                      {analysis?.speciality && (
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
                          {analysis.speciality}
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex gap-3">
                      <button 
                        onClick={() => handleHospitalClick(hospital)}
                        className="flex-1 bg-white border-2 border-slate-200 text-slate-700 font-semibold py-3 rounded-lg hover:border-emerald-500 hover:text-emerald-600 transition-all text-center"
                      >
                        View Details
                      </button>
                      {hospital.map_url ? (
                        <a
                          href={hospital.map_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all text-center flex items-center justify-center gap-2"
                        >
                          <MapPin className="w-4 h-4" />
                          Directions
                        </a>
                      ) : (
                        <button disabled className="flex-1 bg-slate-100 text-slate-400 font-semibold py-3 rounded-lg cursor-not-allowed">
                          Map Unavailable
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl p-8 text-center text-slate-500">
                  No hospitals found for this search.
                </div>
              )}
            </div>

            {/* Summary Sidebar */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 sticky top-24">
                <h4 className="font-bold text-slate-900 mb-4">Your Search</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-slate-500 mb-1">Symptoms</p>
                    <p className="text-slate-700">{symptoms}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Location</p>
                    <p className="text-slate-700">{city}</p>
                  </div>
                  {analysis && (
                    <>
                      <div className="pt-3 border-t">
                        <p className="text-slate-500 mb-1">Recommended Specialist</p>
                        <p className="text-lg font-bold text-emerald-600">{analysis.speciality}</p>
                      </div>
                      {analysis.urgency && (
                        <div>
                          <p className="text-slate-500 mb-1">Urgency Level</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            analysis.urgency.toLowerCase() === 'high' ? 'bg-red-100 text-red-700' :
                            analysis.urgency.toLowerCase() === 'medium' ? 'bg-orange-100 text-orange-700' :
                            'bg-emerald-100 text-emerald-700'
                          }`}>
                            {analysis.urgency.toUpperCase()}
                          </span>
                        </div>
                      )}
                      {analysis.possible_diseases && analysis.possible_diseases.length > 0 && (
                        <div>
                          <p className="text-slate-500 mb-2">Possible Conditions</p>
                          <div className="space-y-1">
                            {analysis.possible_diseases.map((disease, idx) => (
                              <div key={idx} className="flex justify-between text-xs">
                                <span className="text-slate-700">{disease.name}</span>
                                <span className="text-slate-500">{(disease.probability * 100).toFixed(0)}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {step === 'detail' && (
        <HospitalDetail 
          hospital={selectedHospital} 
          onBack={handleBackToResults} 
        />
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm">
            <strong>Disclaimer:</strong> AI-generated results for informational purposes only. 
            Always consult medical professionals for emergencies.
          </p>
          <p className="text-xs mt-2 text-slate-500">Powered by Gemini AI</p>
        </div>
      </footer>
    </div>
  );
}

export default App;