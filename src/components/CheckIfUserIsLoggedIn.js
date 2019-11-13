import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import axios from 'axios';
import { history } from '../routers/AppRouter';
import { ENDPOINT_CHECK_IF_USER_IS_LOGGED_IN } from '../config';

class EntryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = () => {
    axios
      .get('http://localhost:3000/api/checkIfUserIsLoggedIn')
      .then(response => {
        if (response.data.error) {
          alert('Nie udało sie zalogować');
          history.push('/login');
        } else if (response.data.user) {
          this.props.userLoggedIn(
            response.data.user.user,
            response.data.user._id,
            response.data.user.permission
          );
          history.push('/dashboard');
        }
      })
      .catch(function(error) {
        alert('Coś poszło nie tak');
        history.push('/login');
      });
  };
  render() {
    this.handleSubmit();
    return <div>fdsafsda</div>;
  }
}

const mapDispatchToProps = dispatch => ({
  userLoggedIn: (user, id, permission) => dispatch(login(user, id, permission))
});

export default connect(
  undefined,
  mapDispatchToProps
)(EntryPage);
