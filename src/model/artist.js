'use strict';

// This is my one

const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  album: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'album',
    },
  ],
});

module.exports = mongoose.model('artist', artistSchema);
