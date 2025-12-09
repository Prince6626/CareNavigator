require('dotenv').config();
const { analyzeSymptoms } = require('./utils/gemini');

async function test() {
  console.log('Testing analyzeSymptoms...');
  try {
    const result = await analyzeSymptoms('fever', 'New York');
    console.log('Result:', result);
  } catch (error) {
    const fs = require('fs');
    fs.writeFileSync('error.txt', error.message + '\n' + (error.stack || ''));
    console.error('Error written to error.txt');
  }
}

test();
