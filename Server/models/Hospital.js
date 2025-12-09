const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  address: String,
  city: String,
  pincode: String,
  lat: Number,
  lng: Number,
  contact: String,
  specialities: [String],
  hospital_type: { 
    type: String, 
    enum: ['government', 'private', 'trust', 'premium', 'unknown'], 
    default: 'private' 
  },
  rating: Number,
  base_cost_factor: { 
    type: Number, 
    default: 1.0 
  }
}, { timestamps: true });

module.exports = mongoose.model('Hospital', HospitalSchema);
