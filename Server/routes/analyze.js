const express = require('express');
const router = express.Router();
const { analyzeSymptoms } = require('../utils/gemini');

router.post('/', async (req, res) => {
  try {
    const { symptoms_text, location } = req.body;

    if (!symptoms_text) {
      return res.status(400).json({ error: 'symptoms_text is required' });
    }

    const analysis = await analyzeSymptoms(symptoms_text, location);
    res.json({ analysis });

  } catch (error) {
    console.error('Analyze route error:', error);
    res.status(500).json({ error: 'analysis failed' });
  }
});

module.exports = router;
