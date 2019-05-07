const Restaurant = require('../Models/Restaurant');
const uuid = require('uuid');

module.exports = async (req, res, next) => {
  const _id = req.body._id;
  let result = await Restaurant.find({
    _id
  });
  result = result && result[0] ? result[0] : null;
  if (!result) {
    res.send({ error: 'Nie znaleziono restauracji w bazie' });
    next();
  }
  const { order } = req.body;

  order.idOrder = uuid();
  order.opinion = null;
  const orders = result.orders ? result.orders : [];
  orders.push(order);
  Restaurant.updateOne(
    { _id },
    {
      orders
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
};
