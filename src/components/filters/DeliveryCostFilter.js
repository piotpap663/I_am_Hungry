import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MonetizationOn from '@material-ui/icons/monetizationon';
import FastFoodIcon from '@material-ui/icons/fastfood';
import { connect } from 'react-redux';
const categories = [
  'Nie gra roli',
  'Za darmo',
  '5,00 zł i mniej',
  '10,00 zł i mniej'
];

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
class DeliveryCostFilter extends React.Component {
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
                  value=""
                  onClick={e => {
                    this.setState({ selected: index });
                    this.props.setMinDeliveryCost(-1);
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
                  this.props.setMinDeliveryCost((index - 1) * 5);
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
const mapStateToProps = state => ({ minprice: state.filters.deliveryCost });
const mapDispatchToProps = dispatch => {
  return {
    setMinDeliveryCost: deliveryCost => {
      dispatch({
        type: 'SET_DELIVERY_COST',
        deliveryCost
      });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DeliveryCostFilter));
