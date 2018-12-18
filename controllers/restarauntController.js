const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaraunt');

// Index Route
 router.get('/', async (req, res) => {
   console.log(req.session.logged, 'CHECKING IF LOGGED IN ')
     try  {

        const allRestaurants = await Restaurant.find();

        res.json({
          status: 200,
          data: allRestaurants
        });


    } catch (err){
      res.send(err)
    }
});

//Add Route
router.post('/', async (req, res) => {
  try {
    if (req.session.logged === true) {
      req.body.createdBy = req.session.username;
      console.log(req.body.username, ' this is req.body');
      const createdRestaurant = await Restaurant.create(req.body);
      console.log('response happening?', createdRestaurant)
      res.json({
        status: 200,
        data: createdRestaurant
      });
    } else {
      res.json({
        status: 200,
        data: 'unsuccessful'
      });
    }

  } catch(err){
    console.log(err);
    res.send(err);
  }
});

//Search Route
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

//Update Route
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
     console.log(deletedRestaurant, ' this is deleted');
      res.json({
        status: 200,
        data: deletedRestaurant
      });
  } catch(err){
    res.send(err);
  }
});



module.exports = router;
