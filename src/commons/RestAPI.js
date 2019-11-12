/** eslint verified */
import axios from 'axios';

// Data mockups
import { geometryDAGMA } from '../assets/mockups/summaryData';
//import arrayData from '../assets/mockups/indicatorsDashData';


class RestAPI {
  /** *************** */
  /** MAPS IN SUMMARY */
  /** *************** */

  /**
   * Request area geometry by id
   *
   * @param {String} areaId area id to request
   */
  static requestGeometryByArea() {
    return geometryDAGMA;
  }

  /**
   * Request indicators list by area
   *
   * @param {String} areaId area id to request
   */
  static requestIndicatorsByArea(areaId) {
    return RestAPI.makeGetRequest(`anh_areas/${areaId}/indicators`);
  }

  /**
   * Request an endpoint through a GET request
   *
   * @param {String} endpoint endpoint to attach to url
   */
  static makeGetRequest(endpoint, options) {
    return axios.get(RestAPI.getEndpointUrl(endpoint), options)
      .then((res) => res.data)
      .catch((error) => {
        let message = 'Bad GET response. Try later';
        if (error.response) message = error.response.status;
        if (error.request && error.request.statusText === '') message = 'no-data-available';
        return Promise.reject(message);
      });
  }

  /**
   * Request an endpoint through a POST request
   *
   * @param {String} endpoint endpoint to attach to url
   * @param {Object} requestBody JSON object with the request body
   */
  static makePostRequest(endpoint, requestBody) {
    return axios.post(RestAPI.getEndpointUrl(endpoint), requestBody)
      .then((res) => res.data)
      .catch((error) => {
        let message = 'Bad POST response. Try later';
        if (error.response) message = error.response.status;
        if (error.request.statusText === '') message = 'no-data-available';
        return Promise.reject(message);
      });
  }

  /**
   * Return the entire URL endpoint
   *
   * @param {String} endpoint endpoint to attach to url
   */
  static getEndpointUrl(endpoint) {
    return `${process.env.REACT_APP_REST_HOST}/${endpoint}`;
  }
}

export default RestAPI;
