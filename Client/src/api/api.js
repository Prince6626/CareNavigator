const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

export const fetchHospitals = async (query) => {
  try {
    const response = await fetch(`${BASE}/hospitals/search?query=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching hospitals: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch hospitals:", error);
    throw error;
  }
};

export async function analyzeSymptoms(symptoms_text, location) {
  try {
    const response = await fetch(`${BASE}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ symptoms_text, location })
    });
    
    if (!response.ok) {
      throw new Error(`Error analyzing symptoms: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Failed to analyze symptoms:", error);
    throw error;
  }
}

export async function findHospitals({ speciality, city, disease, budget }) {
  try {
    const params = new URLSearchParams();
    if (speciality) params.append('speciality', speciality);
    if (city) params.append('city', city);
    if (disease) params.append('disease', disease);
    if (budget) params.append('budget', budget);

    const response = await fetch(`${BASE}/hospitals?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Error finding hospitals: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Failed to find hospitals:", error);
    throw error;
  }
}
