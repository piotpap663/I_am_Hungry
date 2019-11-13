const Restaurant = require('../Models/Restaurant');

module.exports = async (req, res, next) => {
  const ownerId = req.body.userId || null;
  if (!ownerId) {
    res.send({ error: 'Wrong id' });
  } else {
    let result = await Restaurant.find({
      owners: ownerId
    });
    const check = [];
    const orders = await result.map(item => {
      if (item.orders && item.orders.length > 0) {
        const smallOrders = item.orders.map(order => {
          order.restaurantName = item.name;
          return order;
        });
        check.push(smallOrders);
      }
    });

    res.send(check);
    next();
  }
};
