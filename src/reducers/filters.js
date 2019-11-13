import moment from 'moment';

const filtersReducerDefaultState = {
  name: '',
  sortBy: 'id',
  order: 'ASCENDING',
  filterBy: 'ALL',
  minOrderPrice: -1,
  deliveryCost: -1,
  category: 'Wybierz wszystkie',
  stars: 0
};

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        name: action.name
      };
    case 'SET_MIN_PRICE':
      return {
        ...state,
        minOrderPrice: action.minOrderPrice
      };
    case 'SET_DELIVERY_COST':
      return {
        ...state,
        deliveryCost: action.deliveryCost
      };
    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.category
      };
    case 'SET_STARS':
      return {
        ...state,
        stars: action.stars
      };
    case 'FILTER_BY':
      return {
        ...state,
        filterBy: action.filterBy
      };
    default:
      return state;
  }
};
