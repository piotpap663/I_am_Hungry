import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import { logout } from '../actions/auth';
import { OWNER_PERMISSION, USER_PERMISSION } from '../config';
const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});
export const Header = props => {
  const { logoutUser, user, permission, classes } = props;

  return (
    <header className="header">
      <div className="content-container">
        <div className="header__content">
          <Link className="header__title" to="/dashboard">
            <h1>🥘 NaZąb</h1>
          </Link>
          {!user ? (
            <Link to="/login" className="button button--link">
              Login
            </Link>
          ) : (
            <div>
              {user && permission === OWNER_PERMISSION ? (
                <Link to="/myRestaurants">
                  <Button
                    variant="contained"
                    component="p"
                    color="primary"
                    className={classes.button}
                  >
                    Moje Restauracje
                  </Button>
                </Link>
              ) : null}
              {user && permission === USER_PERMISSION ? (
                <Link to="/myOrders">
                  <Button
                    variant="contained"
                    component="p"
                    color="primary"
                    className={classes.button}
                  >
                    Moje zamówienia
                  </Button>
                </Link>
              ) : null}
              {user && permission === OWNER_PERMISSION ? (
                <Link to="/restaurantOrders">
                  <Button
                    variant="contained"
                    component="p"
                    color="primary"
                    className={classes.button}
                  >
                    Historia zamówień
                  </Button>
                </Link>
              ) : null}
              <Button
                variant="contained"
                component="p"
                color="primary"
                className={classes.button}
              >
                Zalogowany jako {user}
              </Button>
              <Button
                variant="contained"
                className={classes.button}
                onClick={logoutUser}
              >
                Wyloguj
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  permission: state.auth.permission
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header));
