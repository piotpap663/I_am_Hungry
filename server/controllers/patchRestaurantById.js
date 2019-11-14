const Restaurant = require('../Models/Restaurant');

module.exports = async (req, res, next) => {
  const _id = req.params.id;
  let result = await Restaurant.find({
    _id
  });
  result = result && result[0] ? result[0] : null;
  const property = req.body.property;

  if (!result) {
    res.send({ error: 'Nie znaleziono restauracji w bazie' });
    next();
  }
  if (property === 'INFO') {
    const {
      name,
      address,
      email,
      deliveryCost,
      minOrderPrice,
      category,
      postalCode
    } = req.body;
    Restaurant.updateOne(
      { _id },
      {
        name,
        address,
        email,
        deliveryCost,
        minOrderPrice,
        category,
        postalCode
      }
    )
      .then(obj => {
        res.send({
          obj
        });
      })
      .catch(err => {
        res.send({ err });
      });
  } else if (req.body.Menu && req.body.Menu[0]) {
    const Menu = req.body.Menu[0];

    result.Menu[property] = Menu;
    Restaurant.updateOne({ _id }, result)
      .then(obj => {
        res.send({ obj });
      })
      .catch(err => {
        res.send({ err });
      });
  }
};
