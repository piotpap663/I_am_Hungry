const Restaurant = require('../Models/Restaurant');

module.exports = async (req, res, next) => {
  const slug = req.params.id;
  let result = await Restaurant.find({
    slug
  });
  res.send(result);
};
