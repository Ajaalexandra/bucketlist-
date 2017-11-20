import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./StartJourney.css";

class StartJourney extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="body">
        <div className="background">
          <div className="welcome-box">
            <h1> DREAM BIG, TRAVEL FAR </h1>
            <div className="pin-it">
              <hr />
              <p>Pin it, plan it, do it</p>
              <hr />
            </div>
            <Link to="/map">
              <button className="transparent">START JOURNEY</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default StartJourney;
