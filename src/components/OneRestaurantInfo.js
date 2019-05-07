import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

import OneRestaurantMenuDetails from './OneRestaurantMenuDetails';

const styles = {
  root: {
    flex: '3 1'
  },
  tab: {
    fontSize: '1em'
  }
};
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
class CenteredTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, handleModalOpen } = this.props;

    return (
      <div className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab className={classes.tab} label="Menu" />
          {/* <Tab className={classes.tab} label="Opinie" />
          <Tab className={classes.tab} label="Info" /> */}
        </Tabs>
        {this.state.value === 0 && (
          <OneRestaurantMenuDetails
            handleModalClose={this.props.handleModalClose}
            handleModalOpen={handleModalOpen}
          />
        )}
        {/* {this.state.value === 1 && <TabContainer>Opinieinfo</TabContainer>}
        {this.state.value === 2 && <TabContainer>Infoinfo</TabContainer>} */}
      </div>
    );
  }
}

CenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CenteredTabs);
