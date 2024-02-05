// Import mongoose
const mongoose = require('mongoose');

// Define the schema
const CurrencySchema = new mongoose.Schema({
  time_last_update_utc: {
    type: Date,
    required: true
  },
  time_next_update_utc: {
    type: Date,
    required: true
  },
  base_code: {
    type: String,
    required: true
  },
  conversion_rates: {
    type: Object,
    required: true
  }
});

// Export the model
module.exports = mongoose.model('Currency', CurrencySchema);
