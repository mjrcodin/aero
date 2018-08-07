import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			phone: '',
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
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('/user/', {
			username: this.state.username,
			password: this.state.password,
			phone: this.state.phone
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('successful signup')

					this.setState({ //redirect to login page
						redirectTo: '/login'
					})
				} else {
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

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
							<div className="SignupForm defaultText">
								<h4>Sign up</h4>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="offset-2 col-8 offset-sm-3 col-sm-6 offset-md-3 col-md-6">
							<form className="form-inline">
								<div className="form-group">
									<label className="form-label defaultText float-left" htmlFor="username">User:</label>
									<input className="form-input form-control ml-auto ml-sm-auto defaultText"
										type="text"
										id="username"
										name="username"
										placeholder="Username"
										value={this.state.username}
										onChange={this.handleChange} />
								</div>
								<div className="form-group">
									<label className="form-label defaultText float-left" htmlFor="phone">Phone: </label>
									<input className="form-input form-control ml-auto ml-sm-auto defaultText"
										placeholder="phone"
										type="text"
										name="phone"
										value={this.state.phone}
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
										type="submit">
										Sign up</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)
		}
	}
}

export default Signup
