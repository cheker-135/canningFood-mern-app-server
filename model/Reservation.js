const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please fill a valid email address']
  },

 
  message: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true,
    enum: ['09h-10h', '10h-11h', '11h-12h','14h-15h', '15h-16h', '16h-17h', '17h-18h'] // Adjust as needed
  }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
