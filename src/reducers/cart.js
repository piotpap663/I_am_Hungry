export default (
  state = { products: [], minOrderPrice: 0, deliveryCost: 0 },
  action
) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { product } = action;
      product.id = Object.keys(product)
        .map(attr => {
          if (attr === 'extras') {
            return product.extras
              .map(item => Object.keys(item).map(it => item[it]))
              .map(item => item.toString());
          }
          return product[attr];
        })
        .toString();
      const filter = state.products.filter(item => item.id === product.id);

      if (filter.length) {
        const products = state.products.map(item => {
          if (item.id === product.id) {
            ++item.count;
            item.sum = item.price * item.count;
            return item;
          }
          return item;
        });
        return {
          ...state,
          _id: state._id ? state._id : null,
          products
        };
      } else {
        product.count = 1;
        product.sum = 1 * product.price;
      }
      return {
        ...state,
        _id: state._id ? state._id : null,
        products: [...state.products, product]
      };

    case 'REMOVE_FROM_CART':
      const { id } = action;
      const products = state.products.filter(item => item.id !== id);
      return {
        ...state,
        products
      };

    case 'CLEAR_CART':
      return {
        ...state,
        products: []
      };

    case 'SET_CART_MIN_ORDER_PRICE':
      return {
        ...state,
        minOrderPrice: action.minOrderPrice
      };

    case 'SET_CART_DELIVERY_COST':
      return {
        ...state,
        deliveryCost: action.deliveryCost
      };

    case 'SET_CART_RESTAURANT_NAME':
      return {
        ...state,
        restaurantName: action.restaurantName
      };
    case 'SET_CART_RESTAURANT_ID':
      return {
        ...state,
        _id: action._id
      };
    default:
      return state;
  }
};
