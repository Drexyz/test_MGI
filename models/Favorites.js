const mongoose = require('mongoose');

const FavSchema = new mongoose.Schema({
  imageID: {
    type: INT
  },
})

module.exports = mongoose.models.Favorite || mongoose.model('Favorite', FavSchema)