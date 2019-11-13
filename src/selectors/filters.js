export default (
  restaurantList = [],
  { name, minOrderPrice, deliveryCost, category, stars }
) => {
  return restaurantList
    .filter(restaurant =>
      restaurant.name.toUpperCase().includes(name.toUpperCase())
    )
    .filter(
      restaurant =>
        minOrderPrice === -1 || restaurant.minOrderPrice < minOrderPrice
    )
    .filter(
      restaurant =>
        deliveryCost === -1 || restaurant.deliveryCost <= deliveryCost
    )
    .filter(
      restaurant =>
        category === 'Wybierz wszystkie' ||
        restaurant.category.indexOf(category) !== -1
    )
    .filter(restaurant => restaurant.opinionStars >= stars);
};
