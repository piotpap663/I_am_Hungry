import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import ServiceHeader from '../components/ServiceHeader';

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={props =>
        isAuthenticated ? (
          <Redirect to="/dashboard" />
        ) : (
          <div>
            <ServiceHeader />
            <Component {...props} />
          </div>
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  isAuthenticated: false
});

export default connect(mapStateToProps)(PublicRoute);
