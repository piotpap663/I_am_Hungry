import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' }
];
const addresses = [
  '1 Material-UI Drive',
  'Reactville',
  'Anytown',
  '99999',
  'USA'
];

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`
  },
  total: {
    fontWeight: '700'
  },
  title: {
    marginTop: theme.spacing.unit * 2
  },
  formControl: {
    width: '90%',
    margin: theme.spacing.unit
  }
});

function Review({
  handleChange,
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
}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Podsumowanie zamówienia
      </Typography>
      {cart && cart.length > 0
        ? cart.map((product, index) => (
            <li className="cart-li" key={index}>
              <span>{product.count}x </span>
              <span>{product.title} </span>
              {product.type ? <span>{product.type} </span> : null}
              <span>{product.name} </span>
              <span>{product.sum + ' zł '}</span>
              {product.extras && product.extras.length ? (
                <span style={{ fontSize: '0.7em' }}>
                  {' '}
                  <br />
                  {'Dodatki: ' +
                    product.extras.map(
                      item => item.name + ' ' + item.price + ' zł'
                    )}
                </span>
              ) : null}
            </li>
          ))
        : 'Brak produktów'}

      <Grid container spacing={16}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Wysyłka
          </Typography>
          <Typography gutterBottom>
            {firstName} {lastName} <br />
            {city} {zip} <br />
            {state} <br />
            {country}
          </Typography>
          <Typography gutterBottom>
            {address1} {address2}
          </Typography>
          <Typography gutterBottom>
            {' '}
            {email ? 'E-mail' + email : null}
          </Typography>
          <Typography gutterBottom> {phone ? 'Tel' + phone : null}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Szczegóły płatności
          </Typography>
          <Grid container>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="paymentMethod-simple">
                Sposób płatności
              </InputLabel>
              <Select
                value={paymentMethod}
                onChange={handleChange('paymentMethod')}
                inputProps={{
                  name: 'paymentMethod',
                  id: 'paymentMethod-simple'
                }}
              >
                {payments.map(item => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

Review.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Review);
