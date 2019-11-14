/* eslint-disable react/no-multi-comp */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import blue from '@material-ui/core/colors/blue';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
});

class OneRestaurantDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value1: {},
      title: '',
      price: '',
      extrasItem: []
    };
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.modalProduct &&
      nextProps.modalProduct.types &&
      nextProps.modalProduct.types[0] &&
      nextProps.modalProduct.types[0].name &&
      nextProps.modalProduct.types[0].price
    ) {
      this.setState({
        value1: {
          name: nextProps.modalProduct.types[0].name,
          price: nextProps.modalProduct.types[0].price
        },
        title: nextProps.modalProduct.title,
        price: nextProps.modalProduct.types[0].price
      });
    } else if (
      nextProps.modalProduct &&
      nextProps.modalProduct.title &&
      nextProps.modalProduct.price
    ) {
      this.setState({
        value1: {
          name: '',
          price: nextProps.modalProduct.price
        },
        title: nextProps.modalProduct.title,
        price: nextProps.modalProduct.price
      });
    }

    // Return null if the state hasn't changed
    return null;
  }

  handleClose = () => {
    this.props.onClose();
    this.clearChosenProduct();
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };
  handleExtrasChange = (event, product) => {
    const extrasNames = this.state.extrasItem.map(item => item.name);
    if (extrasNames.includes(product.name)) {
      const newExtras = this.state.extrasItem.filter(
        item => item.name !== product.name
      );
      this.setState({
        extrasItem: newExtras
      });
    } else {
      this.setState(prevState => ({
        extrasItem: [...prevState.extrasItem, product]
      }));
    }
    () => {
      this.getCostOfProduct();
    };
  };
  getChosenProduct() {
    const product = {
      type:
        this.state.value1 && this.state.value1.name
          ? this.state.value1.name
          : '',
      price: this.getCostOfProduct(),
      title: this.state.title,
      extras:
        this.state.extrasItem && this.state.extrasItem.length
          ? this.state.extrasItem
          : []
    };

    return product;
  }
  clearChosenProduct() {
    this.setState({
      value1: {},
      extrasItem: []
    });
  }
  getCostOfProduct() {
    let sum = parseInt(this.state.value1.price);

    let extrasPrice = this.state.extrasItem.map(item => {
      sum += parseInt(item.price) ? parseInt(item.price) : 0;
    });
    return sum;
  }
  handleChange = (event, product) => {
    switch (event.target.name) {
      case '1':
        this.setState({ value1: { name: product.name, price: product.price } });
        break;
      case '2':
        this.setState({ value2: { name: product.name, price: product.price } });
        break;
      default:
        break;
    }
  };
  render() {
    const {
      classes,
      onClose,
      selectedValue,
      modalProduct: productVariety,
      addProductToCart,
      ...other
    } = this.props;
    if (!productVariety) {
      return null;
    }

    return (
      ((productVariety.types && productVariety.types.length) ||
        (productVariety.extras && productVariety.extras.length)) && (
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          {...other}
        >
          <DialogTitle id="simple-dialog-title">
            {productVariety.title}
          </DialogTitle>
          <div className={classes.root}>
            {productVariety.types && productVariety.types.length ? (
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Rodzaje: </FormLabel>
                <RadioGroup
                  aria-label="types"
                  name="1"
                  className={classes.group}
                  value={
                    this.state.value1 && this.state.value1.name
                      ? this.state.value1.name
                      : productVariety.types[0].name
                  }
                >
                  {productVariety.types.map((product, index) => (
                    <FormControlLabel
                      key={index}
                      value={product.name}
                      control={<Radio />}
                      label={product.name + ' ' + product.price + ' zł'}
                      price={product.price}
                      onChange={e => {
                        this.handleChange(e, product);
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            ) : null}

            {productVariety.extras && productVariety.extras.length ? (
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Dodatki</FormLabel>
                <FormGroup>
                  {productVariety.extras.map((product, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={this.state.extrasItem
                            .map(item => item.name)
                            .includes(product.name)}
                          onChange={e => {
                            this.handleExtrasChange(e, product);
                          }}
                          value={product.name}
                        />
                      }
                      label={product.name + ' ' + product.price}
                      price={product.price}
                    />
                  ))}
                </FormGroup>
                <FormHelperText>Smacznego</FormHelperText>
              </FormControl>
            ) : null}
          </div>
          <DialogActions>
            <Button
              onClick={() => {
                this.handleClose();
              }}
              color="primary"
            >
              Anuluj
            </Button>
            <Button
              onClick={() => {
                const prod = this.getChosenProduct();
                addProductToCart(prod);
                this.handleClose();
              }}
              color="primary"
            >
              Dodaj do koszyka 🛒 {this.getCostOfProduct()}
            </Button>
          </DialogActions>
        </Dialog>
      )
    );
  }
}

OneRestaurantDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string
};

const mapDispatchToProps = dispatch => {
  return {
    addProductToCart: product => {
      dispatch({ type: 'ADD_TO_CART', product });
    }
  };
};

export default connect(
  undefined,
  mapDispatchToProps
)(withStyles(styles)(OneRestaurantDialog));
