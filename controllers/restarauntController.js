const express = require('express');
// Next we set up the Router
const router = express.Router();

// require Our Model - Remember Model is
// a representation of our data
// The model should capitalized
const Restaraunt = require('../models/Restaraunt');
// Creating the index route
// index route should show all the fruits
 router.get('/', async (req, res, next) => {
  // req.body this is from the fetch request
  console.log(req.body, ' this is get all')
     try  {

      const allRestaraunts = await Restaraunt.find();

      // This is the response to react
      res.json({
        status: 200,
        data: allRestaraunts
      });

    } catch (err){

      res.send(err)

    }
});


router.post('/', async (req, res) => {

  try {
    console.log(req.body, ' this is req.body');
    const createdRestaraunt = await Restaraunt.create(req.body);
    console.log('response happening?')
    res.json({
      status: 200,
      data: createdRestaraunt
    });

  } catch(err){
    console.log(err);
    res.send(err);
  }
});





router.get('/:id', async (req, res, next) => {


     try  {

        const foundRestaraunt = await Restaraunt.findById(req.params.id);
        res.json({
          status: 200,
          data: foundRestaraunt
        });

      } catch (err){
        res.send(err);
      }



});

router.put('/:id', async (req, res) => {

  try {
    const updatedRestaraunt = await Restaraunt.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json({
      status: 200,
      data: updatedRestaraunt
    });
  } catch(err){
    res.send(err)
  }
});


// Delete route
router.delete('/:id', async (req, res) => {

  try {
     const deletedRestaraunt = await Restaraunt.findByIdAndRemove(req.params.id);
      res.json({
        status: 200,
        data: deletedRestaraunt
      });
  } catch(err){
    res.send(err);
  }
});



module.exports = router;
