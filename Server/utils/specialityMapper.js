/**
 * Maps common speciality names from Gemini API to actual database speciality names
 * This ensures consistent matching between AI-generated specialities and hospital data
 */

const SPECIALITY_MAP = {
  // --------------------
  // General Medicine
  // --------------------
  'general physician': 'General Medicine',
  'general doctor': 'General Medicine',
  'general practice': 'General Medicine',
  'family doctor': 'General Medicine',
  'family medicine': 'General Medicine',
  'internal medicine': 'General Medicine',
  'gp': 'General Medicine',
  'primary care': 'General Medicine',
  'general checkup': 'General Medicine',
  'fever': 'General Medicine',
  'cold': 'General Medicine',
  'cough': 'General Medicine',
  'viral': 'General Medicine',
  'flu': 'General Medicine',
  'infection': 'General Medicine',
  'weakness': 'General Medicine',
  'body pain': 'General Medicine',

  // --------------------
  // ENT
  // --------------------
  'ent': 'ENT',
  'ear specialist': 'ENT',
  'nose specialist': 'ENT',
  'throat specialist': 'ENT',
  'ear nose throat': 'ENT',
  'sinus': 'ENT',
  'tonsils': 'ENT',
  'ear pain': 'ENT',
  'hearing problem': 'ENT',

  // --------------------
  // Eye
  // --------------------
  'eye specialist': 'Ophthalmology',
  'eye doctor': 'Ophthalmology',
  'vision problem': 'Ophthalmology',
  'blur vision': 'Ophthalmology',
  'eye pain': 'Ophthalmology',
  'optometrist': 'Ophthalmology',
  'ophthalmologist': 'Ophthalmology',

  // --------------------
  // Heart
  // --------------------
  'heart specialist': 'Cardiology',
  'cardiologist': 'Cardiology',
  'heart problem': 'Cardiology',
  'chest pain': 'Cardiology',
  'heart pain': 'Cardiology',
  'bp problem': 'Cardiology',
  'high bp': 'Cardiology',
  'low bp': 'Cardiology',
  'cardiac': 'Cardiology',
  'heart attack': 'Cardiology',

  // --------------------
  // Brain / Nerves
  // --------------------
  'brain specialist': 'Neurology',
  'neurologist': 'Neurology',
  'headache': 'Neurology',
  'migraine': 'Neurology',
  'seizures': 'Neurology',
  'epilepsy': 'Neurology',
  'nerve problem': 'Neurology',
  'paralysis': 'Neurology',
  'stroke': 'Neurology',

  // --------------------
  // Bone / Ortho
  // --------------------
  'bone specialist': 'Orthopedics',
  'orthopedic': 'Orthopedics',
  'joint pain': 'Orthopedics',
  'knee pain': 'Orthopedics',
  'back pain': 'Orthopedics',
  'shoulder pain': 'Orthopedics',
  'fracture': 'Orthopedics',
  'slip disc': 'Orthopedics',
  'arthritis': 'Orthopedics',

  // --------------------
  // Skin
  // --------------------
  'skin specialist': 'Dermatology',
  'dermatologist': 'Dermatology',
  'skin allergy': 'Dermatology',
  'rashes': 'Dermatology',
  'itching': 'Dermatology',
  'acne': 'Dermatology',
  'pimples': 'Dermatology',
  'hair fall': 'Dermatology',

  // --------------------
  // Child
  // --------------------
  'child specialist': 'Pediatrics',
  'pediatrician': 'Pediatrics',
  'baby doctor': 'Pediatrics',
  'newborn': 'Pediatrics',
  'child fever': 'Pediatrics',
  'vaccination': 'Pediatrics',

  // --------------------
  // Women
  // --------------------
  'gynecologist': 'Gynecology',
  'pregnancy': 'Gynecology',
  'period problem': 'Gynecology',
  'pcos': 'Gynecology',
  'women health': 'Gynecology',
  'delivery': 'Gynecology',
  'pregnant': 'Gynecology',

  // --------------------
  // Stomach
  // --------------------
  'stomach pain': 'Gastroenterology',
  'acidity': 'Gastroenterology',
  'gas': 'Gastroenterology',
  'indigestion': 'Gastroenterology',
  'constipation': 'Gastroenterology',
  'diarrhea': 'Gastroenterology',
  'vomiting': 'Gastroenterology',
  'liver': 'Gastroenterology',

  // --------------------
  // Kidney / Urine
  // --------------------
  'kidney': 'Nephrology',
  'urine problem': 'Urology',
  'urinary infection': 'Urology',
  'uti': 'Urology',
  'bladder': 'Urology',

  // --------------------
  // Lung / Breathing
  // --------------------
  'lung': 'Pulmonology',
  'breathing problem': 'Pulmonology',
  'asthma': 'Pulmonology',
  'shortness of breath': 'Pulmonology',
  'coughing blood': 'Pulmonology',

  // --------------------
  // Mental Health
  // --------------------
  'depression': 'Psychiatry',
  'anxiety': 'Psychiatry',
  'panic attack': 'Psychiatry',
  'stress': 'Psychiatry',
  'sleep problem': 'Psychiatry',
  'insomnia': 'Psychiatry',

  // --------------------
  // Emergency
  // --------------------
  'emergency': 'Emergency Care',
  'accident': 'Emergency Care',
  'injury': 'Emergency Care',
  'bleeding': 'Emergency Care',
  'unconscious': 'Emergency Care',
  'burn': 'Emergency Care',

  // --------------------
  // Diabetes / Hormone
  // --------------------
  'diabetes': 'Endocrinology',
  'thyroid': 'Endocrinology',
  'hormone': 'Endocrinology',
  'sugar problem': 'Endocrinology'
};

/**
 * Production-grade normalizer
 * - Handles exact match
 * - Handles partial match
 * - Handles unexpected Gemini text
 * - Guarantees fallback
 */
const normalizeSpeciality = (speciality) => {
  if (!speciality) return 'General Medicine';

  const normalized = speciality.toLowerCase().trim();

  // 1. Exact match
  if (SPECIALITY_MAP[normalized]) {
    return SPECIALITY_MAP[normalized];
  }

  // 2. Partial match (handles "general practice physician", etc.)
  for (const key in SPECIALITY_MAP) {
    if (normalized.includes(key)) {
      return SPECIALITY_MAP[key];
    }
  }

  // 3. Final fallback (never empty result)
  return 'General Medicine';
};

module.exports = {
  normalizeSpeciality,
  SPECIALITY_MAP
};