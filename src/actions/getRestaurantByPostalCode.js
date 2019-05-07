import { get } from 'axios';
import { ENDPOINT_RESTAURANT_LIST } from '../config';

export default postalcode =>
    get(`${ENDPOINT_RESTAURANT_LIST}?postalcode=${postalcode}`)
        .then(function(response) {
            // handle success
            return response.data;
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        });
