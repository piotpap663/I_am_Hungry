import React from 'react';
import { connect } from 'react-redux';

import StarRatingComponent from 'react-star-rating-component';

class StarsFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.stars || 0,
      clickedRating: this.props.stars || 0
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.props.setStarsFilter(nextValue);
    this.setState({ rating: nextValue, clickedRating: nextValue });
  }
  onStarHover(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }
  onStarHoverOut(nextValue, prevValue, name) {
    this.setState({ rating: this.state.clickedRating });
  }
  clearStars = () => {
    this.props.setStarsFilter(0);
    this.setState({ rating: 0, clickedRating: 0 });
  };

  render() {
    const { rating, savedRating } = this.state;

    return (
      <div
        style={{
          fontSize: '2em',
          display: 'flex',
          justifyContent: 'space-around'
        }}
      >
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={rating}
          onStarHover={this.onStarHover.bind(this)}
          onStarHoverOut={this.onStarHoverOut.bind(this)}
          onStarClick={this.onStarClick.bind(this)}
          emptyStarColor={'grey'}
        />
        <div>
          <button style={{ fontSize: '.5em' }} onClick={this.clearStars}>
            Wyczyść
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({ stars: state.filters.stars });
const mapDispatchToProps = dispatch => {
  return {
    setStarsFilter: stars => {
      dispatch({
        type: 'SET_STARS',
        stars
      });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StarsFilter);
