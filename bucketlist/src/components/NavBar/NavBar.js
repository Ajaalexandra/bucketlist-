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
        <div className="nav-left">Logo</div>
        <div className="nav-mid">
          <Link to="/bucketlist">
            <h3>Bucketlist</h3>
          </Link>
          <Link to="/memories">
            <h3>Memories</h3>
          </Link>
        </div>
        <div className="nav-right" />
        <button className="login" onClick={this.handleLogin}>
          Logout/login
        </button>
      </div>
    );
  }
}

export default NavBar;
