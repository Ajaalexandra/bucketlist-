import React, { Component } from "react";
import "./Country.css";

class Country extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: {}
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.setState({
      style: {
        stroke: "rgb(0,0,0)",
        opacity: 1
      }
    });
    this.props.hoverCountry(this.props.name);
  }

  handleMouseLeave() {
    this.setState({
      style: {}
    });
    this.props.hoverCountry("");
  }

  render() {
    const visitedStyle = this.props.visited ? { fill: "blue" } : {};
    const bucketlistStyle = this.props.bucketlist ? { fill: "green" } : {};

    const style = Object.assign(
      {},
      visitedStyle,
      bucketlistStyle,
      this.state.style
    );

    return (
      <path
        className="country-svg"
        d={this.props.svg}
        id={this.props.id}
        onClick={this.props.toggleCountrySelect}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={style}
      />
    );
  }
}

export default Country;
