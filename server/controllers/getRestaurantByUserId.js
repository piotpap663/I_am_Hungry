const Restaurant = require('../Models/Restaurant');

module.exports = async (req, res, next) => {
  const ownerId = req.body.id || null;
  if (!ownerId) {
    res.send({ error: 'Wrong id' });
  } else {
    let result = await Restaurant.find({
      owners: ownerId
    });
    res.send(result);
  }
};
