require('dotenv').config();

console.log('Checking Environment Variables...');
console.log('GEMINI_URL present:', !!process.env.GEMINI_URL);
if (process.env.GEMINI_URL) console.log('GEMINI_URL value:', process.env.GEMINI_URL);

console.log('GEMINI_API_KEY present:', !!process.env.GEMINI_API_KEY);
if (process.env.GEMINI_API_KEY) {
    console.log('GEMINI_API_KEY length:', process.env.GEMINI_API_KEY.length);
    console.log('GEMINI_API_KEY starts with:', process.env.GEMINI_API_KEY.substring(0, 4) + '...');
} else {
    console.log('GEMINI_API_KEY is MISSING!');
}
