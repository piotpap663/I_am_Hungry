import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GetDataFromGoogleAPI from './GetDataFromGoogleAPI';
import ChoosePostalCode from './ChoosePostalCode';
import { connect } from 'react-redux';
import slugify from '../actions/slugify';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  }),
  searchForm: {
    textAlign: 'center'
  },
  searchContainer: {
    textAlign: 'center',
    maxWidth: '400px',
    textAlign: 'center',
    margin: '0 auto',
    padding: '2em'
  },
  postalCodesDropdown: {
    textAlign: 'center',
    fontSize: '20rem!important'
  }
});

class PaperSheet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isButtonDisabled: true,
      postalCodes: [],
      showPostalCodeSelect: false
    };
  }

  changeButtonMode = () => {
    this.setState({ isButtonDisabled: false });
  };
  hideSearchButton = () => {
    this.setState({ isButtonDisabled: true });
  };
  showPostalCodeSelect = () => {
    this.setState({ showPostalCodeSelect: true });
  };
  hidePostalCodeSelect = () => {
    this.setState({ showPostalCodeSelect: false });
  };
  changePostalCodes = postalCodes => {
    postalCodes = postalCodes.sort();
    this.setState({ postalCodes });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper elevation={4} className={classes.searchContainer}>
          <Typography variant="headline" component="h2">
            Wpisz swoją lokalizację
          </Typography>
          <GetDataFromGoogleAPI
            hideSearchButton={this.hideSearchButton}
            showPostalCodeSelect={this.showPostalCodeSelect}
            hidePostalCodeSelect={this.hidePostalCodeSelect}
            changePostalCodes={this.changePostalCodes}
          />
          {this.state.showPostalCodeSelect ? (
            <ChoosePostalCode
              postalCodes={this.state.postalCodes}
              changeButtonMode={this.changeButtonMode}
            />
          ) : (
            undefined
          )}
          <Button
            component={Link}
            to={`service/${slugify(
              this.props.postalcode + '-' + this.props.address
            )}`}
            disabled={this.state.isButtonDisabled}
            variant="raised"
            color="primary"
          >
            Szukaj
          </Button>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  postalcode: state.service.address.postalcode,
  address: state.service.address.name
});
export default connect(mapStateToProps)(withStyles(styles)(PaperSheet));
