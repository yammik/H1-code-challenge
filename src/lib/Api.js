var axios = require('axios');

const apiHost = 'http://hidden-shore-16694.herokuapp.com/';
const version = 'v1';

module.exports = {
  getUSState: (stateId) => {
    return axios.get(`${apiHost}/api/${version}/states/${stateId}`)
      .then(resp => resp.data)
      .catch(error => undefined)
  },

  // was calling for every loan associated with each state before but that's obviously not the way to go
  // backend set up to receive purposeId parameter and return only matching loans
  getUSStateAndLoans: (stateId, purposeId) => {
    return axios.get(`${apiHost}/api/${version}/states/${stateId}/${purposeId}`)
      .then(resp => resp.data)
      .catch(error => undefined)
  },

  getUSStates: () => {
    return axios.get(`${apiHost}/api/${version}/states/`)
      .then(resp => resp.data)
      .catch(error => undefined)
  },

  getPurpose: (purposeId) => {
    return axios.get(`${apiHost}/api/${version}/purposes/${purposeId}`)
      .then(resp => resp.data)
      .catch(error => undefined)
  },

  getPurposes: () => {
    return axios.get(`${apiHost}/api/${version}/purposes/`)
      .then(resp => resp.data)
      .catch(error => undefined)
  },

} // end module.exports
