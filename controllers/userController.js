// const express = require('express');
// const router = express.Router();
// const Party = require('../models/restaraunt');
// const User = require('../models/user');
//
// // getting the user's profile information by ID
//
//
// router.get('/:id', async (req, res, next) => {
//      try  {
//        console.log(req.session.userId, 'this is req.session user id');
//         const foundUser = await User.findById(req.session.userId);
//
//         res.json({
//         status: 200,
//
//         });
//       } catch (err){
//         res.send(err);
//       }
// });
//
//
//
// module.exports = router;
