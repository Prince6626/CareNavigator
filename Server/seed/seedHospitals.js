require('dotenv').config();
const mongoose = require('mongoose');
const Hospital = require('../models/Hospital');

const hospitals = [
  {
    name: 'Civil Hospital Ahmedabad',
    address: 'Asarwa',
    city: 'Ahmedabad',
    pincode: '380016',
    lat: 23.0525,
    lng: 72.6028,
    contact: '079-22683721',
    specialities: ['General Medicine', 'Trauma', 'Cardiology', 'Neurology'],
    hospital_type: 'government',
    rating: 4.0,
    base_cost_factor: 0.9
  },
  {
    name: 'Apollo Hospitals',
    address: 'Plot No. 1A, Bhat GIDC Estate',
    city: 'Ahmedabad',
    pincode: '382428',
    lat: 23.1096,
    lng: 72.5937,
    contact: '079-66701800',
    specialities: ['Cardiology', 'Oncology', 'Orthopedics', 'Transplants'],
    hospital_type: 'premium',
    rating: 4.8,
    base_cost_factor: 1.3
  },
  {
    name: 'Zydus Hospital',
    address: 'Zydus Hospitals Road, Thaltej',
    city: 'Ahmedabad',
    pincode: '380054',
    lat: 23.0642,
    lng: 72.5156,
    contact: '079-66190201',
    specialities: ['Neurology', 'Nephrology', 'Gastroenterology'],
    hospital_type: 'private',
    rating: 4.7,
    base_cost_factor: 1.2
  },
  {
    name: 'Sterling Hospital',
    address: 'Sterling Hospital Road, Memnagar',
    city: 'Ahmedabad',
    pincode: '380052',
    lat: 23.0497,
    lng: 72.5317,
    contact: '079-40011111',
    specialities: ['General Surgery', 'Urology', 'Pulmonology'],
    hospital_type: 'private',
    rating: 4.5,
    base_cost_factor: 1.1
  },
  {
    name: 'HCG Cancer Centre',
    address: 'Sola-Science City Road',
    city: 'Ahmedabad',
    pincode: '380060',
    lat: 23.0785,
    lng: 72.5089,
    contact: '079-40410101',
    specialities: ['Oncology', 'Radiotherapy', 'Hematology'],
    hospital_type: 'private',
    rating: 4.6,
    base_cost_factor: 1.25
  },
  {
    name: 'V.S. General Hospital',
    address: 'Ellisbridge',
    city: 'Ahmedabad',
    pincode: '380006',
    lat: 23.0225,
    lng: 72.5714,
    contact: '079-26577621',
    specialities: ['General Medicine', 'Pediatrics', 'Dermatology'],
    hospital_type: 'trust',
    rating: 3.8,
    base_cost_factor: 1.0
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Hospital.deleteMany({});
    console.log('Cleared existing hospitals');

    await Hospital.insertMany(hospitals);
    console.log('Hospitals seeded');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
