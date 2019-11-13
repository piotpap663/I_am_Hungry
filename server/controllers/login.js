var passport = require('passport');

module.exports = function(req, res, next) {
  // generate the authenticate method and pass the req/res
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send({ info });
    }

    // req / res held in closure
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.send(user);
    });
  })(req, res, next);
};
