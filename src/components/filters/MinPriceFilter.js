import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MonetizationOn from '@material-ui/icons/monetizationon';

import { connect } from 'react-redux';
const categories = ['Nie gra roli', 'Mniej niż 15,00 zł', 'Mniej niż 30,00 zł'];

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
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
  },
  focusVisible: {
    backgroundColor: '#a9dbff'
  },
  ListItem: {
    margin: '2px',
    border: '1px solid #ececec',
    borderRadius: '5%'
  }
});
class MinPriceFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: 0 };
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List component="nav">
          {categories.map((category, index) => {
            if (index === 0) {
              return (
                <ListItem
                  className={classes.ListItem}
                  button
                  key={index}
                  value="sss"
                  onClick={e => {
                    this.setState({ selected: index });
                    this.props.setMinOrderPrice(-1);
                  }}
                  selected={this.state.selected === index}
                >
                  <ListItemIcon>
                    <MonetizationOn />
                  </ListItemIcon>
                  <ListItemText inset primary={category} />
                </ListItem>
              );
            }
            return (
              <ListItem
                className={classes.ListItem}
                button
                key={index}
                selected={this.state.selected === index}
                onClick={e => {
                  this.setState({ selected: index });
                  this.props.setMinOrderPrice(index * 15);
                }}
              >
                <ListItemText inset primary={category} />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}
const mapStateToProps = state => ({ minprice: state.filters.minOrderPrice });
const mapDispatchToProps = dispatch => {
  return {
    setMinOrderPrice: minOrderPrice => {
      dispatch({
        type: 'SET_MIN_PRICE',
        minOrderPrice
      });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MinPriceFilter));
