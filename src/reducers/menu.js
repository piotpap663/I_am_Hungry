export default (state = [], action) => {
  switch (action.type) {
    case 'SET_MENU':
      return {
        ...state,
        menu: action.menu
      };
    default:
      return state;
  }
};
