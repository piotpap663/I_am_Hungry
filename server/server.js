require('dotenv').config();
const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '..', 'public');
const mongoose = require('mongoose');
const User = require('./Models/User');
const cors = require('cors');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const logout = require('./controllers/logout');
const login = require('./controllers/login');
const checkIfUserIsLoggedIn = require('./controllers/checkIfUserIsLoggedIn');
const addUser = require('./controllers/addUser');
const getRestaurantByUserId = require('./controllers/getRestaurantByUserId');
const addRestaurant = require('./controllers/addRestaurant');
const addOrder = require('./controllers/addOrder');
const addOpinion = require('./controllers/addOpinion');
const getRestaurants = require('./controllers/getRestaurants');
const getRestaurantById = require('./controllers/getRestaurantById');
const patchRestaurantById = require('./controllers/patchRestaurantById');
const getUserOrders = require('./controllers/getUserOrders');
const getRestaurantOrders = require('./controllers/getRestaurantOrders');

const port = process.env.PORT || 3000;
const {
  ENDPOINT_RESTAURANT_LIST,
  ENDPOINT_ADD_RESTAURANT,
  ENDPOINT_REMOVE_RESTAURANT,
  ENDPOINT_ADD_USER,
  ENDPOINT_REMOVE_USER,
  ENDPOINT_GET_USERS,
  ENDPOINT_GET_RESTAURANT_BY_USER_ID,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  ENPOINT_ADD_ORDER,
  ENDPOINT_CHECK_IF_USER_IS_LOGGED_IN,
  ENDPOINT_GET_USER_ORDERS,
  ENDPOINT_GET_RESTAURANT_ORDERS,
  ENPOINT_LOGIN,
  ENPOINT_LOGOUT,
  ENDPOINT_ADD_OPINION
} = process.env;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect((dbURL = 'mongodb://localhost:27017'), function (err) {
  if (err) {
    console.log('Error connecting to: ' + dbURL);
  } else {
    console.log('Connected to: ' + dbURL);
  }
});

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
app.use(session({ secret: 'anything' }));
var LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use(
  new LocalStrategy(
    {
      usernameField: 'user',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, user, password, done) {
      User.findOne({ user }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        if (user.password !== password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  )
);
// Use the GoogleStrategy within Passport.
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    function (accessToken, refreshToken, profile, done) {
      //check user table for anyone with a facebook ID of profile.id
      User.findOne(
        {
          'google.id': profile.id
        },
        function (err, user) {
          if (err) {
            console.log('error');
            return done(err);
          }
          //No user was found... so create a new user with values from Facebook (all the profile. stuff)
          if (!user) {
            console.log('create user');

            user = new User({
              user: profile.displayName,
              provider: 'google',
              //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
              google: profile._json,
              token: accessToken,
              permission: 'USER'
            });
            user.save(function (err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            //found user. Return
            return done(err, user);
          }
        }
      );
    }
  )
);
// If user want to go back we save previous URI
app.get('*', saveRedirectTo);

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login']
  }),
  () => {
    console.log('logged in authgoogle');
  }
);

// GET /auth/google/callback
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    console.log('authorizerd user ', req.user);
    res.redirect('http://localhost:8080/checkIfUserIsLoggedIn');
    global.user = req.user;
  }
);

function saveRedirectTo(req, res, next) {
  global.returnTo = req.originalUrl;
  next();
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("we're connected!");
});

// input: none
app.get('/api/checkIfUserIsLoggedIn', checkIfUserIsLoggedIn);

// input: user, password permission
app.post(ENDPOINT_ADD_USER, addUser);

// input: name, owners
app.post(ENDPOINT_ADD_RESTAURANT, addRestaurant);

// input: _id, order
app.post(`${ENPOINT_ADD_ORDER}/:id`, addOrder);

app.use(express.static(publicPath));

app.get(ENPOINT_LOGOUT, logout);
app.post(ENPOINT_LOGIN, login);

// input: params: ID
// output: Restaurant
app.get(`${ENDPOINT_RESTAURANT_LIST}/:id`, getRestaurantById);

// input: query: postalCode
// output: Restaurant[]
app.get(`${ENDPOINT_RESTAURANT_LIST}`, getRestaurants);

// input: id
// output: Restaurants[]
app.post(ENDPOINT_GET_RESTAURANT_BY_USER_ID, getRestaurantByUserId);

// input: Restaurant schema properties
app.patch(`${ENDPOINT_RESTAURANT_LIST}/:id`, patchRestaurantById);

// input: userId
// output: orders[]
app.post(ENDPOINT_GET_USER_ORDERS, getUserOrders);

// input: userId
// output: orders[]
app.post(ENDPOINT_GET_RESTAURANT_ORDERS, getRestaurantOrders);

// input: opinion object
// {
//   stars,
//   idOrder,
//   message
// }
app.post(ENDPOINT_ADD_OPINION, addOpinion);

// TODO
app.get(ENDPOINT_GET_USERS, async (req, res, next) => {
  let result = await User.find({});
  res.send(result);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server is up! Port:', port);
});
