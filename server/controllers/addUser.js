const User = require('../Models/User');
const uuid = require('uuid');

module.exports = (req, res, next) => {
  let user = req.body.user,
    password = req.body.password,
    permission = req.body.permission;
  if (!user || !password || !permission) {
    res.send({ error: 'Not enough data' });
    next();
  } else {
    User.create({
      user,
      password,
      permission,
      uuid: uuid()
    });
    // we're connected!
    res.send({
      user,
      password,
      permission,
      uuid: uuid()
    });
    next();
  }
};
