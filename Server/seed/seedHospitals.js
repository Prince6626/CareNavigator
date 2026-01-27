require('dotenv').config();
const mongoose = require('mongoose');
const Hospital = require('../models/Hospital');

const hospitals = [
  // ===== GOVERNMENT / TRUST (LOW COST, ALL-ROUND) =====
  {
    name: 'Civil Hospital Ahmedabad',
    address: 'Asarwa',
    city: 'Ahmedabad',
    pincode: '380016',
    lat: 23.0525,
    lng: 72.6028,
    contact: '079-22683721',
    specialities: [
      'General Medicine',
      'Emergency',
      'Trauma',
      'Cardiology',
      'Neurology',
      'Orthopedics',
      'Pediatrics',
      'Gynecology',
      'Psychiatry'
    ],
    hospital_type: 'government',
    rating: 4.0,
    base_cost_factor: 0.85
  },
  {
    name: 'V.S. General Hospital',
    address: 'Ellisbridge',
    city: 'Ahmedabad',
    pincode: '380006',
    lat: 23.0225,
    lng: 72.5714,
    contact: '079-26577621',
    specialities: [
      'General Medicine',
      'Dermatology',
      'Pediatrics',
      'ENT',
      'Ophthalmology'
    ],
    hospital_type: 'trust',
    rating: 3.8,
    base_cost_factor: 0.95
  },
  {
    name: 'IKDRC – Institute of Kidney Diseases',
    address: 'Civil Hospital Campus, Asarwa',
    city: 'Ahmedabad',
    pincode: '380016',
    lat: 23.0539,
    lng: 72.6031,
    contact: '079-22687101',
    specialities: [
      'Nephrology',
      'Dialysis',
      'Transplant',
      'Urology'
    ],
    hospital_type: 'government',
    rating: 4.1,
    base_cost_factor: 0.8
  },

  // ===== PREMIUM MULTISPECIALITY (ALL SYMPTOMS) =====
  {
    name: 'Apollo Hospitals',
    address: 'Plot No. 1A, Bhat GIDC Estate',
    city: 'Ahmedabad',
    pincode: '382428',
    lat: 23.1096,
    lng: 72.5937,
    contact: '079-66701800',
    specialities: [
      'Cardiology',
      'Cardiac Surgery',
      'Neurology',
      'Neurosurgery',
      'Oncology',
      'Gastroenterology',
      'Pulmonology',
      'Orthopedics',
      'Emergency',
      'ICU'
    ],
    hospital_type: 'premium',
    rating: 4.8,
    base_cost_factor: 1.4
  },
  {
    name: 'CIMS Hospital',
    address: 'Science City Road, Sola',
    city: 'Ahmedabad',
    pincode: '380060',
    lat: 23.0815,
    lng: 72.5112,
    contact: '079-66505555',
    specialities: [
      'Cardiology',
      'Neurology',
      'Transplants',
      'Emergency',
      'ICU',
      'General Surgery'
    ],
    hospital_type: 'premium',
    rating: 4.7,
    base_cost_factor: 1.35
  },

  // ===== PRIVATE MULTISPECIALITY (MID RANGE) =====
  {
    name: 'Zydus Hospital',
    address: 'Zydus Hospitals Road, Thaltej',
    city: 'Ahmedabad',
    pincode: '380054',
    lat: 23.0642,
    lng: 72.5156,
    contact: '079-66190201',
    specialities: [
      'Neurology',
      'Nephrology',
      'Gastroenterology',
      'Cardiology',
      'Endocrinology'
    ],
    hospital_type: 'private',
    rating: 4.7,
    base_cost_factor: 1.2
  },
  {
    name: 'Sterling Hospital',
    address: 'Memnagar',
    city: 'Ahmedabad',
    pincode: '380052',
    lat: 23.0497,
    lng: 72.5317,
    contact: '079-40011111',
    specialities: [
      'General Surgery',
      'Urology',
      'Pulmonology',
      'General Medicine'
    ],
    hospital_type: 'private',
    rating: 4.5,
    base_cost_factor: 1.1
  },
  {
    name: 'SAL Hospital',
    address: 'Drive In Road, Thaltej',
    city: 'Ahmedabad',
    pincode: '380054',
    lat: 23.0536,
    lng: 72.5179,
    contact: '079-66121000',
    specialities: [
      'Orthopedics',
      'Cardiology',
      'General Surgery',
      'Physiotherapy'
    ],
    hospital_type: 'private',
    rating: 4.2,
    base_cost_factor: 1.1
  },
  {
    name: 'Shalby Multispeciality Hospital',
    address: 'SG Highway',
    city: 'Ahmedabad',
    pincode: '380015',
    lat: 23.0358,
    lng: 72.5025,
    contact: '079-40203030',
    specialities: [
      'Orthopedics',
      'Joint Replacement',
      'Spine Care',
      'Physiotherapy'
    ],
    hospital_type: 'private',
    rating: 4.4,
    base_cost_factor: 1.15
  },

  // ===== CANCER / SPECIAL CASES =====
  {
    name: 'HCG Cancer Centre',
    address: 'Sola-Science City Road',
    city: 'Ahmedabad',
    pincode: '380060',
    lat: 23.0785,
    lng: 72.5089,
    contact: '079-40410101',
    specialities: [
      'Oncology',
      'Radiotherapy',
      'Chemotherapy',
      'Hematology'
    ],
    hospital_type: 'private',
    rating: 4.6,
    base_cost_factor: 1.3
  },
  {
    name: 'Narayana Multispeciality Hospital',
    address: 'Rakhial',
    city: 'Ahmedabad',
    pincode: '380023',
    lat: 23.0218,
    lng: 72.6229,
    contact: '079-71238888',
    specialities: [
      'Cardiac Surgery',
      'Emergency',
      'ICU',
      'Trauma'
    ],
    hospital_type: 'private',
    rating: 4.3,
    base_cost_factor: 1.2
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Hospital.deleteMany({});
    console.log('🗑️ Old hospitals removed');

    await Hospital.insertMany(hospitals);
    console.log(`🏥 ${hospitals.length} hospitals seeded successfully`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedDB();
