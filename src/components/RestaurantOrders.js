import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { ENDPOINT_GET_RESTAURANT_ORDERS } from '../config';
import { Typography, Grid, Paper } from '@material-ui/core';

const styles = theme => ({
  Typography: {
    fontSize: '1em'
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  h1: {
    display: 'flex',
    justifyContent: 'center'
  }
});

class OneRestaurant extends React.Component {
  constructor(props) {
    super(props);

    this.state = { orders: [] };
  }

  componentDidMount() {
    axios
      .post(ENDPOINT_GET_RESTAURANT_ORDERS, {
        userId: this.props.userId
      })
      .then(response => {
        const orders = response.data;
        this.setState({ orders, filteredOrders: orders });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  filteredOrders = name => {
    if (!name) {
      return this.state.filteredOrders;
    } else {
      return this.state.filteredOrders.filter(
        item => item.restaurantName === name
      );
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <h1 className={classes.h1}>
          {this.state.orders && this.state.orders.length > 0
            ? 'Historia zamówień'
            : 'Brak zamówień'}
        </h1>
        <Grid container spacing={8}>
          {this.state.orders && this.state.orders.length > 0
            ? this.filteredOrders().map((resproduct, index) => {
                return (
                  resproduct &&
                  resproduct.length > 0 &&
                  resproduct.map(product => (
                    <Grid key={index} item xs={12} sm={6}>
                      <Paper className={classes.root} elevation={1}>
                        <Typography
                          key={index + 'typo'}
                          className={classes.Typography}
                        >
                          Nazwa restauracji: {product.restaurantName} <br />
                          Adres linia 1: {product.address1} <br />
                          Adres linia 2: {product.address2} <br />
                          Miasto: {product.city} <br />
                          Data zamówienia: {product.date} <br />
                          Sposób płatności: {product.paymentMethod} <br />
                          Województwo: {product.state}
                          <br />
                          Kod pocztowy: {product.zip}
                          <br />
                          Kraj: {product.country}
                          <br />
                        </Typography>
                        Zamówienie:
                        <br />
                        {product.products.map(item => (
                          <span>
                            {item.count}x {item.title} {item.type}
                            {item.extras && item.extras.length ? (
                              <span>
                                <br />
                                Dodatki:
                              </span>
                            ) : null}
                            <br />
                            {item.extras && item.extras.length
                              ? item.extras.map(extra => (
                                  <span>{extra.name}</span>
                                ))
                              : null}
                          </span>
                        ))}
                      </Paper>
                    </Grid>
                  ))
                );
              })
            : null}
        </Grid>

        {/* <Grid container spacing={16}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Wysyłka
            </Typography>
            <Typography gutterBottom>
              {address1} {lastName} <br />
              {address2} {lastName} <br />
              {city} {lastName} <br />
              {country} {lastName} <br />
              {date} {zip} <br />
              {firstName} {zip} <br />
              {lastName} {zip} <br />
              {paymentMethod} {zip} <br />
              {phone} <br />
              {state} <br />
              {restaurantName} <br />
              {state}
              {zip}
              {country}
              {country}
            </Typography>
            <Typography gutterBottom>
              {address1} {address2}
            </Typography>
            <Typography gutterBottom>
              {' '}
              {email ? 'E-mail' + email : null}
            </Typography>
            <Typography gutterBottom>
              {' '}
              {phone ? 'Tel' + phone : null}
            </Typography>
          </Grid> 
        </Grid>
          */}
      </React.Fragment>
    );
  }
}

OneRestaurant.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const userId = state.auth.id;
  return {
    userId
  };
};

export default connect(mapStateToProps)(withStyles(styles)(OneRestaurant));
