const Restaurant = require('../Models/Restaurant');

module.exports = async (req, res, next) => {
  var postalCode = req.query.postalcode;
  let result = await Restaurant.find({
    postalCode
  });
  res.send(result);
};
