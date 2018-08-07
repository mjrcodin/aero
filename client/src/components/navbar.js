import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../images/icon-home-a_360.png";
import "../App.css";
import axios from "axios";

class Navbar extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    axios
      .post("/api/v1/user/logout")
      .then(response => {
        if (response.status === 200) {
          localStorage.clear()
          this.props.updateUser({
            loggedIn: false,
            username: null
          })
          this.setState({
            redirectTo: '/'
          })
        }
      })
      .catch(error => {
        console.log("Logout error", error);
      });
  }

  render() {
    const loggedIn = this.props.loggedIn;
    return (
      <div>
        <header id="nav-container">
          <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
            <button className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#altNavbar"
              aria-controls="nav-container"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            {loggedIn ? (
              <section className="navbar-section">
                <div className="navbar-collapse collapse" id="altNavbar">
                  <div className="navbar-nav">
                    <Link to="/" className="nav-item nav-link">
                      <span className="text-secondary">home</span>
                    </Link>
                    <Link to="/flightplan" className="nav-item nav-link">
                      <span className="text-secondary">flight plan</span>
                    </Link>
                    <Link
                      to="/login"
                      className="nav-item nav-link"
                      onClick={this.logout}
                    >
                      <span className="text-secondary">logout</span>
                    </Link>
                  </div>
                </div>
              </section>
            ) : (
                <section className="navbar-section">
                  <div className="collapse navbar-collapse" id="altNavbar">
                    <div className="navbar-nav">
                      <Link to="/" className="nav-item nav-link">
                        <span className="defaultText">home</span>
                      </Link>
                      <Link to="/flightplan" className="nav-item nav-link">
                        <span className="defaultText">flight plan</span>
                      </Link>
                      <Link to="/login" className="nav-item nav-link">
                        <span className="defaultText">login</span>
                      </Link>
                      <Link to="/signup" className="nav-item nav-link">
                        <span className="defaultText">sign up</span>
                      </Link>
                    </div>
                  </div>
                </section>
              )}
            <Link to="/" className="navbar-brand ml-auto">
              <img src={logo} className="navbarLogo" alt="logo" />
              <h1 className="App-title">USS AERONYDE</h1>
            </Link>
          </nav>
        </header>
      </div>
    );
  }
}

export default Navbar;
