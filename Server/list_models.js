require('dotenv').config();
const fetch = require('node-fetch');

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

  try {
    console.log('Fetching models from:', url.replace(apiKey, 'HIDDEN_KEY'));
    const response = await fetch(url);
    const data = await response.json();
    console.log('Response Status:', response.status);
    if (data.models) {
      const fs = require('fs');
      const modelNames = data.models
        .filter(m => m.supportedGenerationMethods.includes('generateContent'))
        .map(m => `- ${m.name}`)
        .join('\n');
      console.log('Writing models to models.txt');
      fs.writeFileSync('models.txt', modelNames);
    } else {
      console.log('Error/No models:', JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error('List models error:', err);
  }
}

listModels();
