const BASE_COST = {
  "Angina": 40000,
  "Myocardial infarction": 150000,
  "Dengue": 12000,
  "Appendicitis": 50000,
  "Hip Replacement": 180000
};

const HOSPITAL_MULT = {
  government: 0.8,
  private: 1.2,
  premium: 1.6,
  trust: 1.0,
  unknown: 1.1
};

const CITY_FACTOR = {
  Ahmedabad: 1.05,
  Mumbai: 1.3,
  Delhi: 1.25,
  rural: 0.85
};

const computeCostRange = (disease, city, hospital) => {
  const base = BASE_COST[disease] || 30000;
  
  const cityFactor = CITY_FACTOR[city] || 1.0;
  const hospitalTypeMult = HOSPITAL_MULT[hospital.hospital_type || 'unknown'] || 1.1;
  const hospitalBaseFactor = hospital.base_cost_factor || 1.0;

  const total = base * cityFactor * hospitalTypeMult * hospitalBaseFactor;

  const low = Math.round(total * 0.85);
  const high = Math.round(total * 1.25);

  return { low, high };
};

const formatCostText = (low, high) => {
  const format = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  return `${format(low)} – ${format(high)} (approx.)`;
};

module.exports = {
  BASE_COST,
  computeCostRange,
  formatCostText
};
