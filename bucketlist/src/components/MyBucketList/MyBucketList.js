import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./MyBucketList.css";
import NavBar from "../NavBar/NavBar.js";

class MyBucketList extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="bucketlist-container">
        <NavBar />
        <h1> Bucketlist View </h1>
        <Link to="/bucketlist" />
      </div>
    );
  }
}

export default MyBucketList;
