const Restaurant = require('../Models/Restaurant');

module.exports = async (req, res, next) => {
  const userId = req.body.userId;
  let result = await Restaurant.find({ orders: { $elemMatch: { userId } } });
  if (!result || (result && result.length === 0)) {
    res.send({ error: 'Nie znaleziono restauracji w bazie' });
    next();
  }
  const orders = [];
  await result.map(restaurant => {
    restaurant.orders.map(order => {
      if (order.userId === userId) {
        orders.push({ ...order, restaurantName: restaurant.name });
      }
    });
  });
  res.send(orders);
  next();
};
