const express = require('express');
// Next we set up the Router
const router = express.Router();

// require Our Model - Remember Model is
// a representation of our data
// The model should capitalized
const Restaurant = require('../models/restaraunt');
// Creating the index route
// index route should show all the fruits
 router.get('/', async (req, res, next) => {
  // req.body this is from the fetch request
  console.log(req.body, ' this is get all')
     try  {

      const allRestaurants = await Restaurant.find();

      // This is the response to react
      res.json({
        status: 200,
        data: allRestaurants
      });

    } catch (err){

      res.send(err)

    }
});


router.post('/', async (req, res) => {

  try {
    console.log(req.body, ' this is req.body');
    const createdRestaurant = await Restaurant.create(req.body);
    console.log('response happening?')
    res.json({
      status: 200,
      data: createdRestaurant
    });

  } catch(err){
    console.log(err);
    res.send(err);
  }
});





router.get('/:id', async (req, res, next) => {


     try  {

        const foundRestaurant = await Restaurant.findById(req.params.id);
        res.json({
          status: 200,
          data: foundRestaurant
        });

      } catch (err){
        res.send(err);
      }



});

router.put('/:id', async (req, res) => {

  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json({
      status: 200,
      data: updatedRestaurant
    });
  } catch(err){
    res.send(err)
  }
});


// Delete route
router.delete('/:id', async (req, res) => {

  try {
     const deletedRestaurant = await Restaurant.findByIdAndRemove(req.params.id);
      res.json({
        status: 200,
        data: deletedRestaurant
      });
  } catch(err){
    res.send(err);
  }
});



module.exports = router;
