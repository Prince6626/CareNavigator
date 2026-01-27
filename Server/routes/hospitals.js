const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospital');
const { computeCostRange, formatCostText } = require('../utils/cost');
const { normalizeSpeciality } = require('../utils/specialityMapper');

router.get('/', async (req, res) => {
  try {
    const { speciality, city, disease, budget } = req.query;

    if (!speciality || !city) {
      return res.status(400).json({ error: 'speciality and city are required' });
    }

    // Normalize the speciality name to match database values
    const normalizedSpeciality = normalizeSpeciality(speciality);

    const hospitals = await Hospital.find({
      city: new RegExp(`^${city}$`, 'i'), // Case-insensitive match for city
      specialities: { $in: [normalizedSpeciality] }
    }).limit(50).lean();

    const enrichedHospitals = hospitals.map(hospital => {
      const usedDisease = disease || "Dengue";
      const { low, high } = computeCostRange(usedDisease, city, hospital);
      
      const enriched = {
        ...hospital,
        computed_cost: { low, high },
        cost_text: formatCostText(low, high)
      };

      if (hospital.lat && hospital.lng) {
        enriched.map_url = `https://www.google.com/maps?q=${hospital.lat},${hospital.lng}`;
      }

      return enriched;
    });

    // Filter by budget if provided
    const filteredHospitals = budget 
      ? enrichedHospitals.filter(h => h.computed_cost.low <= Number(budget))
      : enrichedHospitals;

    res.json({ hospitals: filteredHospitals });

  } catch (err) {
    console.error('Hospitals route error:', err);
    res.status(500).json({ error: 'Failed to fetch hospitals' });
  }
});

module.exports = router;
