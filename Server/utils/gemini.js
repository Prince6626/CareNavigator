const fetch = require('node-fetch');

const analyzeSymptoms = async (symptomsText, city) => {
  const apiKey = process.env.GEMINI_API_KEY;
  // Use official Google Gemini API endpoint from environment variable or fallback
  const geminiUrl = process.env.GEMINI_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent';
  const apiUrl = `${geminiUrl}?key=${apiKey}`;

  if (!apiKey) {
    console.error('Missing GEMINI_API_KEY in environment variables');
    return getDefaultResponse(symptomsText);
  }

  const inputJson = JSON.stringify({
    symptoms_text: symptomsText,
    location: city || ""
  });

  const prompt = `You are a concise, safety-first medical triage assistant. Output JSON only.

Task: Convert symptoms_text into up to 3 possible diseases, a single medical speciality, urgency (low|medium|high), and confidence.

Input:
${inputJson}

Return EXACT JSON:
{
  "possible_diseases":[
    {"name":"<string>","probability":<0.0-1.0>,"notes":"<<=12 words justification>"}
  ],
  "speciality":"<single string>",
  "urgency":"low|medium|high",
  "confidence":<0.0-1.0>
}

Rules:
- Use cautious phrasing; this is not a diagnosis.
- If emergency signs (severe chest pain + sweating + fainting / severe breathlessness / heavy bleeding) then urgency="high".
- Output valid JSON only.`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    // Extract text content from Gemini response format
    // Structure: data.candidates[0].content.parts[0].text
    let textContent = '';
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      textContent = data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Unexpected response format from Gemini API');
    }

    // Parse JSON from text - handle potential markdown code blocks
    const jsonStart = textContent.indexOf('{');
    const jsonEnd = textContent.lastIndexOf('}');
    
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error('No JSON object found in response');
    }
    
    const jsonStr = textContent.substring(jsonStart, jsonEnd + 1);
    return JSON.parse(jsonStr);

  } catch (error) {
    require('fs').writeFileSync('gemini_error.txt', error.toString() + '\\n' + (error.stack || ''));
    console.error('Gemini analysis error:', error);
    return getDefaultResponse(symptomsText);
  }
};

const getDefaultResponse = (symptomsText = '') => {
  // Provide intelligent fallback when Gemini API fails
  const symptoms = symptomsText.toLowerCase();
  
  // Simple symptom-based disease prediction
  let diseases = [];
  let speciality = "General Physician";
  let urgency = "low";
  
  // Fever-related conditions
  if (symptoms.includes('fever')) {
    if (symptoms.includes('joint') || symptoms.includes('muscle') || symptoms.includes('pain')) {
      diseases.push({ name: "Dengue Fever", probability: 0.6, notes: "Fever with joint/muscle pain" });
      diseases.push({ name: "Viral Infection", probability: 0.3, notes: "Common viral symptoms" });
      urgency = "medium";
    } else {
      diseases.push({ name: "Viral Fever", probability: 0.7, notes: "Common fever symptoms" });
      diseases.push({ name: "Flu", probability: 0.2, notes: "Influenza-like illness" });
    }
    speciality = "General Medicine";
  }
  
  // Chest pain
  else if (symptoms.includes('chest') && symptoms.includes('pain')) {
    diseases.push({ name: "Angina", probability: 0.5, notes: "Chest pain, needs evaluation" });
    diseases.push({ name: "Gastritis", probability: 0.3, notes: "Acid reflux related" });
    speciality = "Cardiology";
    urgency = "high";
  }
  
  // Headache
  else if (symptoms.includes('headache') || symptoms.includes('head')) {
    diseases.push({ name: "Tension Headache", probability: 0.6, notes: "Common headache" });
    diseases.push({ name: "Migraine", probability: 0.3, notes: "Severe headache" });
    speciality = "Neurology";
  }
  
  // Stomach issues
  else if (symptoms.includes('stomach') || symptoms.includes('abdominal') || symptoms.includes('vomit')) {
    diseases.push({ name: "Gastroenteritis", probability: 0.6, notes: "Stomach infection" });
    diseases.push({ name: "Food Poisoning", probability: 0.3, notes: "Food-related illness" });
    speciality = "Gastroenterology";
  }
  
  // Cough/cold
  else if (symptoms.includes('cough') || symptoms.includes('cold')) {
    diseases.push({ name: "Upper Respiratory Infection", probability: 0.7, notes: "Common cold" });
    diseases.push({ name: "Bronchitis", probability: 0.2, notes: "Chest infection" });
    speciality = "General Medicine";
  }
  
  // Default fallback
  else {
    diseases.push({ name: "General Checkup Recommended", probability: 0.5, notes: "Consult a doctor" });
  }
  
  return {
    possible_diseases: diseases,
    speciality: speciality,
    urgency: urgency,
    confidence: 0.5  // Indicate this is a fallback prediction
  };
};

module.exports = { analyzeSymptoms };
