var axios = require('axios')

const apiHost = 'http://' + (process.env.API_HOST || 'localhost') + ':3000'
const version = 'v1'

module.exports = {
  getUSState: (stateId) => {
    return axios.get(`${apiHost}/api/${version}/states/${stateId}`)
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

  getGrade: (gradeId) => {
    return axios.get(`${apiHost}/api/${version}/grades/${gradeId}`)
      .then(resp => resp.data)
      .catch(error => undefined)
  },

  getGradess: () => {
    return axios.get(`${apiHost}/api/${version}/grades/`)
      .then(resp => resp.data)
      .catch(error => undefined)
  },

  getAllLoans: () => {
    return axios.get(`${apiHost}/api/${version}/loans/`)
      .then(resp => resp.data)
      .catch(error => undefined)
  }, // end getTodos: fn()


} // end module.exports
