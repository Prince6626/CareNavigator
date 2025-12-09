const fetch = require('node-fetch');

const analyzeSymptoms = async (symptomsText, city) => {
  const apiKey = process.env.GEMINI_API_KEY;
  // Use official Google Gemini API endpoint
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

  if (!apiKey) {
    console.error('Missing GEMINI_API_KEY in environment variables');
    return getDefaultResponse();
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
    return getDefaultResponse();
  }
};

const getDefaultResponse = () => ({
  possible_diseases: [],
  speciality: "General Physician",
  urgency: "low",
  confidence: 0.0
});

module.exports = { analyzeSymptoms };
