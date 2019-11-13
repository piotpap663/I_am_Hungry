import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import ServicePage from '../components/ServicePage';
import NotFoundPage from '../components/NotFoundPage';
import EntryPage from '../components/EntryPage';
import OneRestaurant from '../components/OneRestaurant';
import MyRestaurantsList from '../components/MyRestaurantsList';
import CheckIfUserIsLoggedIn from '../components/CheckIfUserIsLoggedIn';
import MyOrders from '../components/MyOrders';
import RestaurantOrders from '../components/RestaurantOrders';
import Checkout from '../components/Checkout';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/login" component={EntryPage} exact={true} />
        <PublicRoute
          path="/checkIfUserIsLoggedIn"
          component={CheckIfUserIsLoggedIn}
        />
        <PublicRoute path="/service" component={ServicePage} />
        <PublicRoute path="/checkout" component={Checkout} />
        <PublicRoute path="/restaurant" component={OneRestaurant} />
        <PrivateRoute path="/myRestaurants" component={MyRestaurantsList} />
        <PrivateRoute path="/myOrders" component={MyOrders} />
        <PrivateRoute path="/restaurantOrders" component={RestaurantOrders} />
        <PrivateRoute path="/admin" />
        <PublicRoute path="/" component={DashboardPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
