import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: '3em'
  },
  textField: {
    margin: '0 auto',
    width: '90%',
    fontSize: '3em'
  },
  menu: {
    width: 200
  }
});
const NameFilter = props => {
  const { classes } = props;

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="restaurant-name-filter"
        label="Nazwa restauracji"
        type="string"
        className={classes.textField}
        margin="normal"
        onChange={e => {
          props.handleChange('name')(e);
        }}
      />
    </form>
  );
};

export default withStyles(styles)(NameFilter);
