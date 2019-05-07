const Restaurant = require('../Models/Restaurant');

module.exports = async (req, res, next) => {
  const { stars, idOrder, message } = req.body;

  let result = await Restaurant.findOne({
    orders: { $elemMatch: { idOrder } }
  });
  if (!result) {
    res.send({ error: 'Nie znaleziono zamówienia w bazie' });
    next();
  }
  const _id = result._id;
  const countOpinions = [];
  const orders = await result.orders.map(order => {
    if (order.idOrder === idOrder) {
      const editedOrder = { ...order };
      editedOrder.opinion = { message, stars };

      countOpinions.push(editedOrder.opinion);

      return editedOrder;
    } else {
      if (order.opinion) {
        countOpinions.push(order.opinion);
      }
      return order;
    }
  });

  const opinions = countOpinions.length;
  let opinionStars = await countAverageOpinion(countOpinions);

  Restaurant.updateOne(
    { _id },
    {
      orders,
      opinions,
      opinionStars
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

const countAverageOpinion = arr => {
  if (!arr || (arr && arr.length === 0)) {
    return 0;
  }
  let total = 0;
  for (var i = 0; i < arr.length; i++) {
    total += arr[i].stars;
  }
  return total / arr.length;
};
/*const Restaurant = require('../Models/Restaurant');

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
*/
