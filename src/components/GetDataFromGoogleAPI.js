import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
let GoogleMapApiKey = 'XXXXXXXXXXXXXX';
import { connect } from 'react-redux';
import { readFromLocalStorage } from '../actions/localStorage';
import { saveDataToLocalStorage } from '../actions/localStorage';
import { setAddress } from '../actions/address';
class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.address ? props.address : '',
      postal_code: ''
    };
    this.postalCodes = [];
  }
  componentDidMount() {
    let address = readFromLocalStorage('address');
    if (address) {
      this.setState({ address });
      this.props.changeAddress(address);
      this.handleSelect(address);
    }
  }

  lookForPostalCode = async data => {
    //data.results = [...data];
    for (let j = 0; j < data.length; j += 1) {
      let res = data[j].address_components;

      for (let i = 0; i < res.length; i += 1) {
        if (res[i].types.indexOf('postal_code') !== -1) {
          if (res[i].long_name.length === 6) {
            this.postalCodes.push(res[i].long_name);
          }
        }
      }
    }
    if (this.postalCodes && this.postalCodes.length) {
      this.props.changePostalCodes(
        [...new Set(this.postalCodes)].sort((a, b) => a > b)
      );
      this.props.showPostalCodeSelect();
    }
  };
  getPostalCode = async latLng => {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
      latLng.lat
    },${latLng.lng}&key=${GoogleMapApiKey}`;
    return fetch(url)
      .then(resp => resp.json()) // Transform the data into json
      .then(data => {
        this.lookForPostalCode(data.results);
      })
      .catch(error => {
        console.error(error);
      });
  };
  handleChange = address => {
    this.props.hidePostalCodeSelect();
    this.props.hideSearchButton();
    this.setState({ address });
    this.props.changeAddress(address);
    saveDataToLocalStorage('address', address);
  };

  handleSelect = address => {
    let postal_code = '';
    //address = address + '&language=pl';
    saveDataToLocalStorage('address', address);
    this.props.changeAddress(address);

    geocodeByAddress(address)
      .then(results => {
        this.postalCodes = [];
        this.lookForPostalCode(results);
        return getLatLng(results[0]);
      })
      .then(latLng => {
        this.getPostalCode(latLng);
      })
      .catch(error => console.error('Error 💩', error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Szukaj adresu ...',
                className: 'location-search-input'
              })}
            />
            <div className="autocomplete-dropdown-container">
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
const mapStateToProps = state => ({
  address: state.service.address.name
});

const mapDispatchToProps = dispatch => ({
  changeAddress: name => dispatch(setAddress(name))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationSearchInput);
