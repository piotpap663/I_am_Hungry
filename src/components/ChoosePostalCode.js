import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { saveDataToLocalStorage } from '../actions/localStorage';
import { setPostalCode } from '../actions/address';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class SimpleSelect extends React.Component {
  state = {
    postalCode: ''
  };

  handleChange = event => {
    if (event.target.value) {
      this.setState({ [event.target.name]: event.target.value });
      this.props.changePostalCode(event.target.value);
      this.props.changeButtonMode();
      saveDataToLocalStorage('postalcode', event.target.value);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl required className={classes.formControl}>
          <InputLabel htmlFor="age-required">Kod pocztowy</InputLabel>
          <Select
            value={this.state.postalCode}
            onChange={this.handleChange}
            name="postalCode"
            inputProps={{
              id: 'postal-code-required'
            }}
            className={classes.selectEmpty}
          >
            {this.props.postalCodes.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            Upewnij się, że kod pocztowy jest prawidłowy
          </FormHelperText>
        </FormControl>
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapDispatchToProps = dispatch => ({
  changePostalCode: postalcode => dispatch(setPostalCode(postalcode))
});

export default connect(
  undefined,
  mapDispatchToProps
)(withStyles(styles)(SimpleSelect));
