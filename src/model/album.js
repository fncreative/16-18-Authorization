'use strict';

// this is the many

const mongoose = require('mongoose');
const HttpError = require('http-errors');
const Artist = require('./artist');

const albumSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
  year: {
    type: Number,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'artist',
  },
});

function albumPreHook(done) {
  return Album.findById(this.album)
    .then((albumFound) => {
      if (!albumFound) {
        throw new HttpError(404, 'album not found');
      }
      albumFound.artist.push(this._id);
      return albumFound.save();
    })
    .then(() => done())
    .catch(error => done(error));
}
