import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import RestaurantList from './RestaurantList';
import ServiceFilters from './ServiceFilters';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexFlow: 'row wrap',
    padding: '5em!important'
  },
  button: {
    margin: theme.spacing.unit
  }
});

function ServiceHeader() {
  return (
    <div
      style={{
        flex: '1 1 100%',
        textAlign: 'center'
      }}
    />
  );
}

function ServicePage(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        className={classes.button}
        onClick={() => {
          props.history.goBack();
        }}
      >
        WRÓĆ
      </Button>
      <ServiceHeader />
      <ServiceFilters />
      <RestaurantList />
    </div>
  );
}

ServicePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ServicePage);
