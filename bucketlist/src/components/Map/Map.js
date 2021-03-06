import React, { Component } from "react";
import Country from "../Country/Country";
import { connect } from "react-redux";
import { getCountriesByUserId } from "../../redux/reducers/reducer.js";

import "./Map.css";
import Modal from "../Modal/Modal.js";
import NavBar1 from "../NavBar1/NavBar1.js";
import teal1 from "./teal1.jpg";

//redux actions
import { getCountries } from "../../redux/reducers/reducer.js";

//styles
const mapStyle = {
  background: `url(${teal1})`,
  "background-repeat": "no-repeat",
  "background-size": "cover"
};

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // userId: 2,
      selectedCountry: null,
      hoverCountry: ""
    };
    // this.toggleVisited = this.toggleVisited.bind(this);
    this.chooseCountry = this.chooseCountry.bind(this);
    this.setHoverCountry = this.setHoverCountry.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    // this.props.getCountriesByUserId(1);
    this.props.getCountries();
    // console.log("did mount: ", this.props.countryList);
  }

  chooseCountry(country) {
    this.setState({
      selectedCountry: country
    });
  }

  setHoverCountry(str) {
    this.setState({
      hoverCountry: str
    });
  }

  handleLogin() {
    window.location.href = "http://localhost:3001/login";
  }
  // toggleVisited(countryId) {
  //   var tempVisited = [...this.state.visitedList];
  //   if (tempVisited.includes(countryId)) {
  //     var index = tempVisited.indexOf(countryId);
  //     tempVisited.splice(index, 1);
  //   } else {
  //     tempVisited.push(countryId);
  //   }
  //   this.setState({ visitedList: tempVisited });
  // }

  render() {
    const countries = this.props.countryList.map((country, index) => {
      console.log("map render", country);
      return (
        <Country
          key={country.id}
          svg={country.svg}
          id={country.id}
          visited={country.visited}
          bucketList={country.bucketlist}
          name={country.name}
          toggleCountrySelect={() => this.chooseCountry(country)}
          hoverCountry={this.setHoverCountry}
        />
      );
    });

    //pass svg
    return (
      <div>
        <NavBar1 />

        <svg viewBox="0 0 2000 1001" id="world" style={mapStyle}>
          {countries}
        </svg>
        {this.state.hoverCountry}
        <button onClick={this.handleLogin}>Create Your Own Map</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { countryList, bucketList, visitedList } = state;
  return {
    countryList
  };
}

export default connect(mapStateToProps, {
  getCountries,
  getCountriesByUserId
})(Map);
