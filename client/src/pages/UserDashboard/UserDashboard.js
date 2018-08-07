import React, { Component } from 'react'

import FlightTable from '../../components/flight-table';

class UserDashboard extends Component {
  state = {
    start: '',
    q: '',
    start_year: '',
    end_year: '',
    message: 'Search For Articles To Begin!'
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleFormSubmit = event => {
    event.preventDefault()
    this.saveOperation()
  }

  render() {
    return (
    <div>
        This is the User Dashboard 
        <FlightTable/>
    </div>
    )
  }
}

export default UserDashboard