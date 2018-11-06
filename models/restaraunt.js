const mongoose = require('mongoose');


const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
});


// Exporting the whole fruits array
// and it will be named whatever we require as
module.exports = mongoose.model('Restaurant', restaurantSchema);
