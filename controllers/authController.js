const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/register', async (req,res,err) => {
  console.log(req.session, ' this is session')
try{
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash;


let createdUser= await User.create(userDbEntry,(err,createdUser) => {
    req.session.logged = true;
    req.session.username = req.body.username;
    console.log(createdUser);
    res.json({
      status: 200,
      data: 'register successful'
    });
  })
}

   catch(err){
    console.log(err);
    res.send(err);
  }

})

router.post('/', async (req, res) => {
  console.log(req.body, ' this is session')
  try {
    const user = await User.create(req.body);
    req.session.logged = true;
    req.session.username = req.body.username;
    res.json({
      status: 200,
      data: 'login successful'
    });
  } catch(err){
    console.log(err);
    res.send(err);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.json({
      status: 404,
      data: 'log out unsuccessful',
    });
    } else {
      res.json({
      status: 200,
      data: 'Logout successful'
     })
   }
 })
})











module.exports = router;
