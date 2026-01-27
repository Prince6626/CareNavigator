// =====================
// BASE COST DATA
// =====================
const BASE_COST = {
  "Angina": 40000,
  "Myocardial infarction": 150000,
  "Appendicitis": 50000,
  "Hip Replacement": 180000,
  "Dengue": 12000,

  // Common problems
  "Fever": 800,
  "Cold": 500,
  "Cough": 600,
  "Viral Infection": 1200,
  "Stomach Pain": 1000,
  "Headache": 500,
  "Body Pain": 700,
  "Food Poisoning": 2000,
  "Minor Injury": 1500,
  "Skin Allergy": 1000,
  "UTI": 2500,
  "Sore Throat": 600,
  "General Checkup": 500
};

// =====================
// SEVERITY LOGIC
// =====================
const SEVERITY_BASE = {
  mild: 1000,
  moderate: 8000,
  severe: 50000,
  critical: 150000
};

const DISEASE_SEVERITY = {
  Fever: "mild",
  Cold: "mild",
  Cough: "mild",
  Headache: "mild",
  "Sore Throat": "mild",
  "Skin Allergy": "mild",
  "General Checkup": "mild",

  Dengue: "moderate",
  "Food Poisoning": "moderate",
  UTI: "moderate",
  "Viral Infection": "moderate",

  Appendicitis: "severe",
  "Hip Replacement": "severe",

  "Myocardial infarction": "critical"
};

// =====================
// SYMPTOM → DISEASE MAP
// =====================
const SYMPTOM_TO_DISEASE = {
  cold: "Cold",
  fever: "Fever",
  cough: "Cough",
  headache: "Headache",
  throat: "Sore Throat",
  sorethroat: "Sore Throat",
  vomiting: "Food Poisoning",
  stomach: "Stomach Pain",
  stomachpain: "Stomach Pain",
  bodypain: "Body Pain",
  weakness: "Viral Infection",
  allergy: "Skin Allergy",
  urine: "UTI",
  injury: "Minor Injury"
};

const getDiseaseFromSymptoms = (symptomsArray) => {
  for (let symptom of symptomsArray) {
    const key = symptom.toLowerCase().replace(/\s/g, "");
    if (SYMPTOM_TO_DISEASE[key]) {
      return SYMPTOM_TO_DISEASE[key];
    }
  }
  return "General Checkup";
};

// =====================
// MULTIPLIERS
// =====================
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

// =====================
// MAIN FUNCTION
// =====================
const computeCostRange = (input, city, hospital) => {
  let disease = input;

  // If input is symptoms array
  if (Array.isArray(input)) {
    disease = getDiseaseFromSymptoms(input);
  }

  const severity = DISEASE_SEVERITY[disease];

  const base = BASE_COST[disease]
    || SEVERITY_BASE[severity]
    || 1500;

  const cityFactor = CITY_FACTOR[city] || 1.0;
  const hospitalTypeMult =
    HOSPITAL_MULT[hospital?.hospital_type || "unknown"] || 1.1;
  const hospitalBaseFactor = hospital?.base_cost_factor || 1.0;

  const total = base * cityFactor * hospitalTypeMult * hospitalBaseFactor;

  const low = Math.round(total * 0.85);
  const high = Math.round(total * 1.25);

  return {
    predictedDisease: disease,
    low,
    high
  };
};

// =====================
// FORMATTER
// =====================
const formatCostText = (low, high) => {
  const format = (num) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(num);
  };

  return `${format(low)} – ${format(high)} (approx.)`;
};

// =====================
module.exports = {
  BASE_COST,
  computeCostRange,
  formatCostText
};