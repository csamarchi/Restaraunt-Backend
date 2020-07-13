const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const cors           = require('cors');
const session        = require('express-session')

require('./db/db');

// Require the controller after the middleware
const restarauntController = require('./controllers/restarauntController');
const authController  = require('./controllers/authController');

app.use(session({
  secret: 'keyboard catt',
  resave: false,
  saveUninitialized: false
}));

// SET UP CORS AS MIDDLEWARE, SO any client can make a request to our server
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // This allows the session cookie to be sent back and forth
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));


//95f432cefc027eaa7c0c7881e0edd2e7


app.use('/api/v1/restaraunt', restarauntController);
app.use('/auth', authController);
// app.use('/user', userController);

app.get('/testing', (req, res) => {
  res.send("HELLO!!!")
})

app.listen(process.env.PORT || 9000, () => {
  console.log('listening on port 9000');
});
