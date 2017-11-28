import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    //binds

    this.handleLogin = this.handleLogin.bind(this);
  }

  //methods

  handleLogin() {
    window.location.href = "http://localhost:3001/login";
  }

  render() {
    return (
      <div className="navBar-container">
        <div className="nav-left">
          <img className="nav-logo" src={require("../../images/B&W.png")} />
        </div>
        <div className="nav-mid">
          <Link to="/int-map">
            <h3>Pin It</h3>
          </Link>
          <Link to="/bucketlist">
            <h3>Plan It</h3>
          </Link>
          <Link to="/memories">
            <h3>Post It</h3>
          </Link>
        </div>
        <div className="nav-right" />
        <button className="login" onClick={this.handleLogin}>
          Login/Logout
        </button>
      </div>
    );
  }
}

export default NavBar;
