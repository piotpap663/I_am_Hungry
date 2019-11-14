export default (state = { address: { name: '', postalcode: '' } }, action) => {
  switch (action.type) {
    case 'SET_ADDRESS':
      return {
        ...state,
        address: {
          ...state.address,
          name: action.name
        }
      };
    case 'SET_POSTAL_CODE':
      return {
        ...state,
        address: {
          ...state.address,
          postalcode: action.postalcode
        }
      };
    default:
      return state;
  }
};
