import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { ENDPOINT_RESTAURANT_LIST } from '../config';
import OneRestaurantInfo from './OneRestaurantInfo';
import OneRestaurantSidebar from './OneRestaurantSidebar';
import OneRestaurantDetailsCart from './OneRestaurantDetailsCart';
import OneRestaurantDialog from './OneRestaurantDialog';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexFlow: 'row wrap'
  },
  cart: {
    ...theme.mixins.gutters(),

    display: 'flex',
    position: 'sticky',
    display: 'flex',
    justifyContent: 'space-evenly',
    top: 0,
    backgroundColor: '#cac0c0',
    zIndex: 1
  },
  button: {
    margin: theme.spacing.unit
  }
});

class OneRestaurant extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetchedData: false,
      menu: {},
      showCart: false,
      isDialogoOpen: false,
      modalProduct: null
    };
  }
  handleModalOpen = item => {
    this.setState({
      isDialogoOpen: true,
      modalProduct: item
    });
  };

  componentWillMount() {
    this.props.clearCart();
  }

  handleModalClose = () => {
    this.setState({ isDialogoOpen: false, modalProduct: null });
  };

  showHideCart = () => {
    this.setState(prevState => {
      return {
        showCart: !prevState.showCart
      };
    });
  };
  componentDidMount() {
    axios
      .get(
        ENDPOINT_RESTAURANT_LIST +
          this.props.location.pathname.replace('/restaurant', '')
      )
      .then(response => {
        // handle success

        if (response.data[0] && response.data[0].Menu) {
          this.props.setMenu(response.data[0].Menu);
          this.props.setRestaurantName(response.data[0].name);
          this.props.setRestaurantId(response.data[0]._id);
          this.props.setDeliveryCost(response.data[0].deliveryCost);
          this.props.setMinOrderPrice(response.data[0].minOrderPrice);
          this.setState({
            isFetchedData: true
          });
        }
      })
      .catch(function(error) {
        // handle error
        console.error(error);
      })
      .then(function() {
        // always executed
      });
  }

  render() {
    const { classes, menu, handleModalOpen } = this.props;
    return this.state.isFetchedData && menu ? (
      <div>
        <OneRestaurantDialog
          modalProduct={this.state.modalProduct}
          open={this.state.isDialogoOpen}
          onClose={this.handleModalClose}
        />
        <div className={classes.cart}>
          <div
            style={{
              display: 'flex',
              flex: '1',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => {
                this.props.history.goBack();
              }}
            >
              WRÓĆ
            </Button>
          </div>
          {/* <div
            style={{
              display: 'flex',
              flex: '3',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            Wyszukaj
          </div> */}
          <div
            style={{
              display: 'flex',
              flex: 2,
              justifyContent: 'space-evenly',
              fontSize: '1.5em',
              top: 0,
              position: 'sticky',
              backgroundColor: '#cac0c0',
              padding: '0.5em',
              zIndex: 1
            }}
          >
            <OneRestaurantDetailsCart
              className={classes.cart}
              showHideCart={this.showHideCart}
              showCart={this.state.showCart}
              showIcon
            />
          </div>
        </div>
        <div className={classes.root}>
          <OneRestaurantSidebar categories={Object.keys(menu)} />
          <OneRestaurantInfo
            menu={menu}
            handleModalClose
            handleModalOpen={this.handleModalOpen}
          />
          <div
            style={{
              // border: '1px solid red',
              flex: '1 1 100%',
              textAlign: 'center',
              flex: this.state.showCart ? 2 : 0
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            />
          </div>
        </div>
      </div>
    ) : (
      <p>Animation</p>
    );
  }
}

OneRestaurant.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const menu = state.menu.menu;
  return {
    menu
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // setMenu: restaurantsList => {
    //   dispatch({
    //     type: 'SET_RESTAURANTS',
    //     restaurantsList
    //   });
    // },
    setMenu: menu => {
      dispatch({ type: 'SET_MENU', menu });
    },
    clearCart: () => {
      dispatch({ type: 'CLEAR_CART' });
    },
    setDeliveryCost: deliveryCost => {
      dispatch({ type: 'SET_CART_DELIVERY_COST', deliveryCost });
    },
    setMinOrderPrice: minOrderPrice => {
      dispatch({ type: 'SET_CART_MIN_ORDER_PRICE', minOrderPrice });
    },
    setRestaurantName: restaurantName => {
      dispatch({ type: 'SET_CART_RESTAURANT_NAME', restaurantName });
    },
    setRestaurantId: _id => {
      dispatch({ type: 'SET_CART_RESTAURANT_ID', _id });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(OneRestaurant));
