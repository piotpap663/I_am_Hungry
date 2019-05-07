import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import axios from 'axios';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  }),
  searchForm: {
    textAlign: 'center'
  },
  postalCodesDropdown: {
    textAlign: 'center',
    fontSize: '20rem!important'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  input: {
    margin: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

class PaperSheet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userPermission: 'USER'
    };
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleChangeSwitch = event => {
    this.setState({ userPermission: event.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { user, password, email } = e.target;

    if (user.value && password.value) {
      axios
        .post('http://localhost:3000/api/addUser', {
          user: user.value,
          password: password.value,
          email: email.value,
          permission: this.state.userPermission
        })
        .then(response => {
          alert('Dodano usera:', user.value);
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      alert('Uzupelnij pola');
    }
  };
  render() {
    const { classes, switchToLoginOrRegister } = this.props;

    return (
      <div>
        <div className="box-layout">
          <div className="box-layout__box">
            <button className="button" onClick={switchToLoginOrRegister}>
              Logowanie
            </button>
            <form
              className="form"
              onSubmit={this.handleSubmit}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              <label>Username:</label>
              <input type="text" name="user" />
              <label>Password:</label>
              <input type="password" name="password" />
              <label>E-mail:</label>
              <input type="text" name="email" />
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">ROLA:</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender2"
                  className={classes.group}
                  value={this.state.userPermission}
                  onChange={this.handleChangeSwitch}
                >
                  <FormControlLabel
                    value="USER"
                    control={<Radio color="primary" />}
                    label="UŻYTKOWNIK"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="OWNER"
                    control={<Radio color="primary" />}
                    label="ZARZĄDCA"
                    labelPlacement="start"
                  />
                </RadioGroup>
                {/* <FormHelperText>labelPlacement start</FormHelperText> */}
              </FormControl>
              <button className="button" type="submit">
                Zarejestruj
              </button>
            </form>
          </div>
        </div>
        {/* </Paper> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(withStyles(styles)(PaperSheet));
