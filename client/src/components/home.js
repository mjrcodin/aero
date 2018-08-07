import React, { Component } from 'react';
import fullLogo from "../images/image-logo-aeronyde-blue_480.png";

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <img src={fullLogo} className="App-logo fade-in img-fluid" alt="logo" />
        <div className="fade-in-slower">
          <p className="defaultText">Please login or sign up above.</p>
        </div>
      </div>
    );
  }
}

export default Home;
