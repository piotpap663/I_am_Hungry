import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import service from '../reducers/service';
import restaurants from '../reducers/restaurants';
import filters from '../reducers/filters';
import cart from '../reducers/cart';
import menu from '../reducers/menu';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      cart,
      menu,
      service,
      restaurants,
      filters
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
