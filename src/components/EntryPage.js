import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import axios from 'axios';
import RegisterUser from '../components/RegisterUser';
import { history } from '../routers/AppRouter';

class EntryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      user: '',
      password: '',
      showLoginPage: true
    };
  }

  handleChangeName = event => {
    this.setState({ user: event.target.value });
  };
  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  };
  switchToLoginOrRegister = () => {
    this.setState({ showLoginPage: !this.state.showLoginPage });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { user, password = 'USER' } = e.target;
    if (user.value && password.value) {
      axios
        .post('http://localhost:3000/api/login', {
          user: user.value,
          password: password.value
        })
        .then(response => {
          if (response.data.info) {
            alert('Nieprawidłowe dane');
          } else {
            this.props.userLoggedIn(
              response.data.user,
              response.data._id,
              response.data.permission
            );
            history.push('/dashboard');
          }
        })
        .catch(function(error) {
          console.log(error);
          alert('Coś poszło nie tak');
        });
    } else {
      alert('Uzupelnij pola');
    }
  };
  render() {
    return this.state.showLoginPage ? (
      <div className="box-layout">
        <div className="box-layout__box">
          <button className="button" onClick={this.switchToLoginOrRegister}>
            Załóż konto
          </button>
          <form className="form" onSubmit={this.handleSubmit}>
            <label>Username:</label>
            <input
              type="text"
              name="user"
              value={this.state.name}
              onChange={this.handleChangeName}
            />
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChangePassword}
            />
            <button className="button" type="submit">
              Zaloguj
            </button>
          </form>

          <a className="button" href="http://localhost:3000/auth/google">
            Login with Google
          </a>
        </div>
      </div>
    ) : (
      <RegisterUser switchToLoginOrRegister={this.switchToLoginOrRegister} />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  userLoggedIn: (user, id, permission) => dispatch(login(user, id, permission))
});

export default connect(
  undefined,
  mapDispatchToProps
)(EntryPage);
