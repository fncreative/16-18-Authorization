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
  return Artist.findById(this.artist)
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

const albumPostHook = (document, done) => {
  return Artist.findById(document.artist)
    .then((albumFound) => {
      if (!albumFound) {
        throw new HttpError(500, 'album not found');
      }
      albumFound.artist = albumFound.artist.filter((album) => {
        return album._id.toString() !== document._id.toString();
      });
      return albumFound.save();
    })
    .then(() => done())
    .catch(error => done(error));
};

albumSchema.pre('save', albumPreHook);
albumSchema.post('remove', albumPostHook);

module.exports = mongoose.model('album', albumSchema);
