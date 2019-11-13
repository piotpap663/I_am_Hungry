export default (state = [], action) => {
  switch (action.type) {
    case 'SET_RESTAURANTS':
      return {
        ...state,
        restaurantsList: action.restaurantsList
      };
    default:
      return state;
  }
};
