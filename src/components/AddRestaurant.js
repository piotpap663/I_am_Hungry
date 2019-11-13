import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import axios from 'axios';

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
  }
});

class PaperSheet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { user, password } = e.target;
    if (user.value && password.value) {
      axios
        .post('http://localhost:3000/api/addUser', {
          user: user.value,
          password: password.value
        })
        .then(response => {})
        .catch(function(error) {
          console.log(error);
        });
    } else {
      alert('Uzupelnij pola');
    }
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className="box-layout">
          <div className="box-layout__box">
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="user" />
              <input type="password" name="password" />
              <button type="submit">Dodaj restauracje</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(withStyles(styles)(PaperSheet));
