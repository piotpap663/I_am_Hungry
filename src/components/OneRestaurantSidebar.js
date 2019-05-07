import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';

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
  }
});
const OneRestaurantSidebar = props => {
  const handleChange = name => event => {
    props.setTextFilter(event.target.value);
  };
  const { classes, categories } = props;
  return (
    <div style={{ flex: '1 1' }}>
      {/* <div style={{ fontSize: '5em', textAlign: 'center' }}>X</div> */}
      {categories.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
};

export default withStyles(styles)(OneRestaurantSidebar);
