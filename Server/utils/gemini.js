const fetch = require('node-fetch');

const analyzeSymptoms = async (symptomsText, city) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = process.env.GEMINI_URL;

  if (!apiKey || !apiUrl) {
    console.error('Missing GEMINI_API_KEY or GEMINI_URL in environment variables');
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
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-5.1-mini",
        input: prompt,
        max_tokens: 250,
        temperature: 0.1
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    // Attempt to extract text content from common LLM response formats
    let textContent = '';
    if (data.choices && data.choices[0] && data.choices[0].message) {
      textContent = data.choices[0].message.content;
    } else if (data.output) {
      textContent = data.output;
    } else if (typeof data === 'string') {
      textContent = data;
    } else {
      // Fallback: try to stringify the whole data if it looks like the answer might be directly there
      textContent = JSON.stringify(data);
    }

    // Parse JSON from text
    const jsonStart = textContent.indexOf('{');
    const jsonEnd = textContent.lastIndexOf('}');
    
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error('No JSON object found in response');
    }
    
    const jsonStr = textContent.substring(jsonStart, jsonEnd + 1);
    return JSON.parse(jsonStr);

  } catch (error) {
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
