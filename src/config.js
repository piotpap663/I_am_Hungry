const prefix = 'http://localhost:3000';
export const SERVER_ADDRESS = 'http://localhost:3000';
export const CLIENT_SERVER = 'http://localhost:8080';
export const ENDPOINT_RESTAURANT_LIST = prefix + '/api/restaurantList';
export const ENDPOINT_ADD_RESTAURANT = prefix + '/api/addRestaurant';
export const ENDPOINT_REMOVE_RESTAURANT = prefix + '/api/removeRestaurant';
export const ENDPOINT_ADD_USER = prefix + '/api/addUser';
export const ENDPOINT_REMOVE_USER = prefix + '/api/removeUser';
export const ENDPOINT_GET_USERS = prefix + '/api/users';
export const ENDPOINT_GET_RESTAURANT_BY_USER_ID =
  prefix + '/api/getRestaurantByUserId';
export const ENPOINT_ADD_ORDER = prefix + '/api/addOrder';
export const ENDPOINT_CHECK_IF_USER_IS_LOGGED_IN =
  prefix + '/api/checkIfUserIsLoggedIn';
export const ENDPOINT_GET_USER_ORDERS = prefix + '/api/getUserOrders';
export const ENDPOINT_GET_RESTAURANT_ORDERS =
  prefix + '/api/getRestaurantOrders';
export const ENDPOINT_ADD_OPINION = prefix + '/api/addOpinion';
export const USER_PERMISSION = 'USER';
export const OWNER_PERMISSION = 'OWNER';
export const categories = [
  'Włoska',
  'Polska',
  'Sushi',
  'Amerykańska',
  'Chińska',
  'Turecka',
  'Pizza',
  'Burgery',
  'Kebab',
  'Indyjska',
  'Meksykańska',
  'Wietnamska',
  'Japońska',
  'Tajska',
  'Wegetariańska',
  'Wegańska',
  'Zupy',
  'Pierogi',
  'Sałatki',
  'Kanapki',
  'Gyros',
  'Makarony',
  'Curry',
  'Falafel',
  'Wrapy',
  'Przekąski',
  'Dania na lunch',
  'Menu dla dzieci',
  'Desery',
  'Międzynarodowa',
  'Arabska',
  'Hiszpańska/Tapas',
  'Gruzińska',
  'Drób',
  'Kaczka',
  'Wieprzowina',
  'Wołowina',
  'Ryby',
  'Owoce morza',
  'Naleśniki'
];
export default {
  ENDPOINT_RESTAURANT_LIST,
  ENDPOINT_ADD_RESTAURANT,
  ENDPOINT_REMOVE_RESTAURANT,
  ENDPOINT_ADD_USER,
  ENDPOINT_REMOVE_USER,
  ENDPOINT_GET_USERS,
  SERVER_ADDRESS
};
