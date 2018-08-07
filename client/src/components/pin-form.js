import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class PinForm extends Component {
    constructor() {
        super()
        this.state = {
            authPin: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
  
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')

        axios
            .post('/api/v1/user/pin',
            {
                authPin: this.state.authPin,
                username: localStorage.getItem('username')
            },
            {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            .then(response => {
                console.log('pin response: ')
                console.log(response)
                if (response.status === 200) {
                    // update App.js state
                    this.setState({
                        redirectTo: '/user'
                    })
                    this.props.updateUser({
                        loggedIn: true
                    })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
                
            })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div>
                    <h4>Enter Flight Code</h4>
                    <form className="form-horizontal">
                        <div className="form-group">
                            <div className="col-2 col-ml-auto">
                                <label className="form-label" htmlFor="username">Flight Code</label>
                            </div>
                            <div className="col-3 col-mr-auto">
                                <input className="form-input"
                                    type="text"
                                    id="authPin"
                                    name="authPin"
                                    placeholder="Flight Code"
                                    value={this.state.authPin}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group ">
                            <div className="col-7"></div>
                            <button
                                className="btn btn-primary col-1 col-mr-auto"
                               
                                onClick={this.handleSubmit}
                                type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            )
        }
    }
}

export default PinForm
