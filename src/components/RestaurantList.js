import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import getRestaurantByPostalCode from '../actions/getRestaurantByPostalCode';
import { connect } from 'react-redux';
import { readFromLocalStorage } from '../actions/localStorage';
import { setAddress, setPostalCode } from '../actions/address';
import filteredRestaurants from '../selectors/filters';
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});
class RestaurantList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let address = readFromLocalStorage('address');
    let postalcode = readFromLocalStorage('postalcode');
    if (address) {
      this.props.changeAddress(address);
    }

    if (this.props.postalcode) {
      this.renderPosts(this.props.postalcode);
    } else if (postalcode) {
      this.props.changePostalCode(postalcode);
      this.renderPosts(postalcode);
    }
  }

  renderPosts = postalcode => {
    try {
      getRestaurantByPostalCode(postalcode)
        .then(restaurants => {
          this.props.setRestaurants(restaurants);
        })
        .catch(err => {});
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div style={{ flex: '3 1' }}>
        <p>{`${this.props.restaurantsList.length} restauracje`}</p>
        {this.props.restaurantsList && this.props.restaurantsList.length ? (
          this.props.restaurantsList.map((item, index) => (
            <Link
              to={`/restaurant/${item.slug}`}
              key={index}
              className={'restaurantListContainer'}
            >
              <div key={item.id} className={'OneRestaurantContainer'}>
                <p className={'restaurantName'} key={item.id}>
                  {item.name}
                </p>
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    whiteSpace: 'pre'
                  }}
                >
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    editing={false}
                    value={item.opinionStars}
                  />
                  <span> ({item.opinions})</span>
                </div>
                <p key={item.id}>
                  {'Kategorie: '}
                  {item.category &&
                    item.category.length &&
                    item.category.map((categoryName, index) => (
                      <span key={index}>
                        {categoryName}
                        {item.category.length - 1 !== index ? ', ' : ''}
                      </span>
                    ))}
                </p>
                <p key={item.id}>
                  💰Min: {item.minOrderPrice} zł 🚙 {item.deliveryCost} zł
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div>{'Nie znaleziono restauracji w twojej lokalizacji ⛔'}</div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const postalcode =
    state.service.address && state.service.address.postalcode
      ? state.service.address.postalcode
      : '';
  return {
    postalcode,
    restaurantsList: filteredRestaurants(
      state.restaurants.restaurantsList,
      state.filters
    )
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setRestaurants: restaurantsList => {
      dispatch({
        type: 'SET_RESTAURANTS',
        restaurantsList
      });
    },

    changeAddress: name => dispatch(setAddress(name)),
    changePostalCode: postalcode => dispatch(setPostalCode(postalcode))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RestaurantList));
