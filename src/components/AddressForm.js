import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function AddressForm({
  handleChange,
  firstName,
  lastName,
  address1,
  address2,
  city,
  zip,
  country,
  state,
  email,
  phone
}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Adres dostawy
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Imię"
            fullWidth
            autoComplete="fname"
            value={firstName}
            onChange={handleChange('firstName')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Nazwisko"
            value={lastName}
            fullWidth
            autoComplete="lname"
            onChange={handleChange('lastName')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            value={address1}
            label="Adres linia 1"
            fullWidth
            autoComplete="billing address-line1"
            onChange={handleChange('address1')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            value={address2}
            label="Adres linia 2"
            fullWidth
            autoComplete="billing address-line2"
            onChange={handleChange('address2')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            value={city}
            label="Miasto"
            fullWidth
            autoComplete="billing address-level2"
            onChange={handleChange('city')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="Województwo"
            fullWidth
            onChange={handleChange('state')}
            value={state}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            value={zip}
            label="Kod pocztowy"
            fullWidth
            autoComplete="billing postal-code"
            onChange={handleChange('zip')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            value={country}
            label="Kraj"
            fullWidth
            autoComplete="billing country"
            onChange={handleChange('country')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email "
            value={email}
            label="E-mail"
            fullWidth
            autoComplete="billing email"
            onChange={handleChange('email')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id=" phone"
            name="phone"
            value={phone}
            label="Numer telefonu"
            fullWidth
            autoComplete="billing phone"
            onChange={handleChange('phone')}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AddressForm;
