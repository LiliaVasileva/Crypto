const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, 'Name should be at least 2 char!']
  },
  image: {
    type: String,
    required: true,
    validate: /^https?:\/\//,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minLength: [10, 'Description should be at least 10 char!']
  },
  payment: {
    type: String,
    enum: {
      values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
      message: 'Invalid payment method!',
    },
    required: true,
  },
  buyers: [{
    type: mongoose.Types.ObjectId,
    ref: 'User',
  }],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;
