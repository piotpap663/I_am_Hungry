module.exports = (req, res, next) => {
  let user = global.user;
  if (!user) {
    res.send({ error: 'not found' });
    next();
  } else {
    res.send({
      user
    });
    next();
  }
};
