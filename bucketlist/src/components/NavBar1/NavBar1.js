import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar1.css";

class NavBar1 extends Component {
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

        <div className="nav-right" />
        <button className="login" onClick={this.handleLogin}>
          Logout/login
        </button>
      </div>
    );
  }
}

export default NavBar1;
