import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import Review from './Review';
import { connect } from 'react-redux';
import { history } from '../routers/AppRouter';
import { ENPOINT_ADD_ORDER } from '../config';
import axios from 'axios';
const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

const steps = ['Adres dostawy', 'Podsumowanie'];
const payments = ['Płatność gotówką', 'PayU', 'Paypal'];

class Checkout extends React.Component {
  state = {
    activeStep: 0,
    firstName: '',
    email: '',
    phone: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    zip: '',
    country: '',
    state: '',
    paymentMethod: payments[0]
  };
  handleNext = () => {
    if (this.state.activeStep === steps.length - 1) {
      this.addOrderToDatabase();
    }
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };
  addOrderToDatabase = () => {
    const _id = this.props.cart._id;
    const userId =
      this.props.currentUser && this.props.currentUser.id
        ? this.props.currentUser.id
        : null;
    const products =
      this.props.cart.products && this.props.cart.products.length > 0
        ? this.props.cart.products
        : null;
    if (!_id || !products) {
      alert('brak id lub produktów');
      return;
    }
    const {
      firstName,
      lastName,
      address1,
      address2,
      city,
      zip,
      country,
      state,
      classes,
      paymentMethod,
      payments,
      cart,
      email,
      phone
    } = this.state;
    const order = {
      firstName,
      lastName,
      address1,
      address2,
      city,
      zip,
      country,
      state,
      classes,
      paymentMethod,
      payments,
      cart,
      email,
      phone,
      date: new Date(),
      products,
      userId
    };
    axios
      .post(ENPOINT_ADD_ORDER + '/' + _id, {
        _id,
        order
      })
      .then(response => {})
      .catch(function(error) {
        console.error(error);
      })
      .then(function() {
        // always executed
      });
  };
  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <AddressForm
            handleChange={this.handleChange}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            address1={this.state.address1}
            address2={this.state.address2}
            city={this.state.city}
            zip={this.state.zip}
            country={this.state.country}
          />
        );

      case 1:
        return (
          <Review
            handleChange={this.handleChange}
            paymentMethod={this.state.paymentMethod}
            payments={payments}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            address1={this.state.address1}
            address2={this.state.address2}
            city={this.state.city}
            zip={this.state.zip}
            country={this.state.country}
            state={this.state.state}
            cart={this.props.cart.products}
            email={this.state.email}
            phone={this.state.phone}
          />
        );
      default:
        throw new Error('Nieznany krok');
    }
  };
  componentDidMount() {
    this.checkIfCartIsEmptyAndRedirect();
  }
  checkIfCartIsEmptyAndRedirect = () => {
    if (
      this.props.cart &&
      this.props.cart.products &&
      this.props.cart.products.length === 0
    ) {
      history.push('/');
    }
  };
  render() {
    const { classes, cart } = this.props;
    const { activeStep } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Koszyk
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Dziękujemy za złożenie zamówienia
                  </Typography>
                  <Typography variant="subtitle1">
                    Twoje zamówienie jest w trakcie realizacji.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this.getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Wróć
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                      disabled={
                        !(cart && cart.products && cart.products.length > 0)
                      }
                    >
                      {activeStep === steps.length - 1
                        ? 'Zamawiam i płacę'
                        : 'Następny'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  const cart = state.cart;
  const currentUser = state.auth;
  return {
    cart,
    currentUser
  };
};
export default connect(mapStateToProps)(withStyles(styles)(Checkout));
