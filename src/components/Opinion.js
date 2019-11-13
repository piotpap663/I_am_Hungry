import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Button } from '@material-ui/core';
import { ENDPOINT_ADD_OPINION } from '../../src/config';
import { history } from '../routers/AppRouter';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import axios from 'axios';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});
class Opinion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.value || '',
      rating: this.props.stars ? parseInt(this.props.stars) : 0,
      clickedRating: this.props.stars || 0
    };
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue, clickedRating: nextValue });
  }
  onStarHover(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }
  onStarHoverOut(nextValue, prevValue, name) {
    this.setState({ rating: this.state.clickedRating });
  }
  addOpinion = () => {
    const { idOrder } = this.props;
    const { clickedRating, message } = this.state;
    axios
      .post(ENDPOINT_ADD_OPINION, {
        stars: clickedRating,
        idOrder,
        message
      })
      .then(response => {
        history.push('myOrders');
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const { rating } = this.state;
    const { classes, editing } = this.props;
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            fontSize: '1.5em'
          }}
        >
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={rating}
            editing={editing}
            onStarHover={this.onStarHover.bind(this)}
            onStarHoverOut={this.onStarHoverOut.bind(this)}
            onStarClick={this.onStarClick.bind(this)}
            emptyStarColor={'grey'}
          />
        </div>

        <TextField
          id="textarea"
          onChange={this.handleChange('message')}
          label={this.props.value === undefined ? 'Dodaj wiadomość' : 'Opinia'}
          multiline
          className={classes.textField}
          margin="normal"
          value={this.state.message}
          disabled={this.props.value !== null}
        />

        {this.props.value === null ? (
          <Button
            color="primary"
            variant="contained"
            onClick={this.addOpinion}
            style={{ marginLeft: '1em' }}
          >
            Oceń
          </Button>
        ) : null}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Opinion);
