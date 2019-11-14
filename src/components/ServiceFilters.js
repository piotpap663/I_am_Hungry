import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { setTextFilter } from '../actions/filters';
import NameFilter from './filters/NameFilter';
import MinPriceFilter from './filters/MinPriceFilter';
import DeliveryCostFilter from './filters/DeliveryCostFilter';
import StarsFilter from './filters/StarsFilter';
import CategoryFilter from './filters/CategoryFilter';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});
const ServiceFilters = props => {
  const handleChange = name => event => {
    props.setTextFilter(event.target.value);
  };
  const { classes } = props;
  return (
    <div style={{ flex: '1 1' }}>
      <NameFilter handleChange={handleChange} />
      <div style={{ padding: '1em' }}>
        {'Kuchnie świata'}
        <CategoryFilter />
      </div>
      <div style={{ padding: '1em' }}>
        {'Opinie'}
        <StarsFilter />
      </div>
      <div style={{ padding: '1em' }}>
        {'Koszt dostawy'}
        <DeliveryCostFilter />
      </div>
      <div style={{ padding: '1em' }}>
        {'Minimialna kwota zamówienia'}
        <MinPriceFilter />
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  const postalcode =
    state.service.address && state.service.address.postalcode
      ? state.service.address.postalcode
      : '';
  return {
    postalcode,
    restaurantsList: state.restaurants.restaurantsList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setTextFilter: name => {
      dispatch(setTextFilter(name));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ServiceFilters));
