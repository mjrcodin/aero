import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
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
            .post('/api/v1/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ')
                console.log(response)

                if (response.status === 200) {
                    //get JWT token into local memory
                    if (response.headers['authorization']) {
                        localStorage.setItem('token', response.headers['authorization'])
                        localStorage.setItem('username', response.data.username)
                    }
                    // update App.js state
                    this.props.updateUser({
                        username: response.data.username
                    })
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/pin'
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
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-12 text-center">
                            <h4>Login</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offset-2 col-8 offset-sm-4 col-sm-8 offset-md-3 col-md-6">
                            <form className="form-inline">
                                <div className="form-group">
                                    <label className="form-label defaultText float-left" htmlFor="username">Username</label>
                                    <input className="form-input form-control ml-auto ml-sm-auto defaultText"
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                        <label className="form-label defaultText float-left" htmlFor="password">Password: </label>
                                        <input className="form-input form-control ml-auto ml-sm-auto defaultText"
                                            placeholder="password"
                                            type="password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                        />                                    
                                </div>
                                <div className="form-group">
                                    <button
                                        className="btn btn-primary defaultText"

                                        onClick={this.handleSubmit}
                                        type="submit">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default LoginForm
