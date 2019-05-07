export const login = (user, id, permission) => ({
  type: 'LOGIN',
  id,
  user,
  permission
});

export const logout = () => ({
  type: 'LOGOUT'
});
