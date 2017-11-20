import React, { Component } from "react";
import { Link } from "react-router-dom";

class StartJourney extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1> helllooo </h1>
        <Link to="/map">
          <button>Start Journey</button>
        </Link>
      </div>
    );
  }
}

export default StartJourney;
