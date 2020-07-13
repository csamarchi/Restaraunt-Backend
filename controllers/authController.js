const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.get('/users', async (req, res) => {
  try {
      console.log("INVOKES", req.body);
      const allUsers = await User.find();
      console.log("ALLL USERS", allUsers);
      res.json({
        status: 200,
        data: allUsers
      });
  } catch (err) {
    res.send(err)
  }
})

//Check if Logged in
router.get('/user', async (req, res) => {
  if (req.session.logged) {
    res.json({
      status: 200,
      data: true,
    })
  } else {
    res.json({
      status: 200,
      data: false,
    })
  }
})

router.post('/register', async (req,res) => {
  try{
    const password = req.body.password;
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const userDbEntry = {};
    userDbEntry.username = req.body.username;
    userDbEntry.password = passwordHash;
    console.log(req.session)

    const createdUser = await User.create(userDbEntry);
      req.session.logged = true;
      req.session.username = req.body.username;
      req.session.save();
      console.log(createdUser, 'checking the session');
      res.json({
        status: 200,
        data: createdUser
      });
  }
     catch(err){
      console.log(err);
      res.send(err);
    }
})

router.post('/login', async (req, res) => {
  try {
    console.log(req.body, ' this is session')
    const user = await User.findOne({'username': req.body.username});
    if (user) {
      if ((bcrypt.compareSync(req.body.password, user.password))) {
          req.session.logged = true;
          req.session.username = req.body.username;
          req.session.save();
          console.log('req.session login', req.session);
          res.json({
            status: 200,
            data: 'login successful'
          });
} else {
        res.json({
          status: 200,
          data: 'login unsuccessful'
        });
}
} else {
      res.json({
        status: 200,
        data: 'login unsuccessful'
      });
}
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
