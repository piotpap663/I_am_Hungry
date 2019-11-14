export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.user,
        id: action.id,
        permission: action.permission
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
