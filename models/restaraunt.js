const mongoose = require('mongoose');


const restaurantSchema = new mongoose.Schema({
  name: String,
  featured_image: String,
  cuisines: String,
  createdBy: String
});



// Exporting the whole fruits array
// and it will be named whatever we require as
module.exports = mongoose.model('Restaurant', restaurantSchema);
