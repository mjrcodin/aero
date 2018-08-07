import axios from 'axios'

export default {
  // Get all operations for the specified user id from database
  getOperations: function(id) {
    return axios.get('/api/v1/operation/', {params: id})
  },
  // Saves an operation to the database
  saveOperation: function(operationData) {
    return axios.post('/api/v1/operation/', operationData)
  },
  // Get an operation from the database with the given id
  getOperation: function(id) {
    return axios.get('/api/v1/operation/' + id)
  },
  // Deletes the operation with the given id
  deleteOperation: function(id) {
    return axios.delete('/api/v1/operation/' + id)
  }
}