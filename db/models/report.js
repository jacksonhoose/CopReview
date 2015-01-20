var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reportSchema = new Schema({
  description: String,
  
  loc: {
    type: {
      type: String,
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      index: {
        type: '2dsphere'
      }
    }
  },

  policeDepartment: {
    type: String
  },

  age: {
    type: String,
    required: true,
    enum: [
      'Under 12 years old',
      '12-17 years old',
      '18-24 years old',
      '25-34 years old',
      '35-44 years old',
      '45-54 years old',
      '55-64 years old',
      '65-74 years old',
      '75 years or older'
    ]
  },

  sex: {
    type: String,
    required: true,
    enum: [
      'Male',
      'Female',
      'Other'
    ]
  },

  race: {
    type: String,
    required: true,
    enum: [
      'American Indian or Alaska Native',
      'Asian',
      'Black or African American',
      'Middle Eastern',
      'Native Hawaiian or Other Pacific Islander',
      'Hispanic or Latino',
      'White',
      'Other'
    ]
  },

  rating: {
    type: Number,
    required: true,
    enum: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
  },

  keywords: {
    type: []
  },

  date: {
    required: true,
    type: Date  
  },
  
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Report', reportSchema);