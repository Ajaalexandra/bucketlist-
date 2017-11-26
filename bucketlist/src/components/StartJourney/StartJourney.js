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
          <Link to="/map">
            <button className="btn welcome-btn transparent">
              <span>Start your journey here...</span>
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default StartJourney;
