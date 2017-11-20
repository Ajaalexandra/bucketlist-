import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Memories.css";
import NavBar from "../NavBar/NavBar.js";

class Memories extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="memories-container">
        <NavBar />
        <h1> Memories </h1>
        <Link to="/memories" />
      </div>
    );
  }
}

export default Memories;
