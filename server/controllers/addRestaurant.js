const slugify = require('../../src/actions/slugify');
const Restaurant = require('../Models/Restaurant');
const uuid = require('uuid');

module.exports = (req, res, next) => {
  const { name, owners } = req.body;
  const slug = slugify(name + '-' + uuid());
  if (!name || !owners || (owners && owners.length === 0)) {
    res.send({ error: 'Not enough data' });
    next();
  }
  Restaurant.create({
    name,
    owners,
    address: [],
    email: '',
    postalCode: [],
    minOrderPrice: 0,
    opinionStars: 0,
    opinions: 0,
    deliveryCost: 0,
    category: [],
    slug,
    Menu: {
      Pizza: [
        {
          title: 'Pizza Sknera',
          types: [
            {
              name: '30cm',
              price: '30.00'
            }
          ],
          components: [],
          extras: []
        }
      ]
    }
  });
  res.send({ message: `Restaurant ${name} was added` });
  next();
};
