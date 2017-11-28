import React, { Component } from "react";
import Country from "../Country/Country";
// import axios from "axios";
import { connect } from "react-redux";
import "./InteractiveMap.css";
import Modal from "../Modal/Modal.js";
import NavBar from "../NavBar/NavBar.js";
import teal1 from "./teal1.jpg";

//redux actions
import {
  getCountriesByUserId,
  getCountries,
  addToBucketlist,
  removeFromBucketList,
  addToVisitedList,
  removeFromVisitedList
} from "../../redux/reducers/reducer.js";

//styles
const mapStyle = {
  background: `url(${teal1})`,
  "background-repeat": "no-repeat",
  "background-size": "cover"
};

class IntMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: 2,
      selectedCountry: null,
      hoverCountry: ""
    };
    this.toggleVisited = this.toggleVisited.bind(this);
    this.chooseCountry = this.chooseCountry.bind(this);
    this.setHoverCountry = this.setHoverCountry.bind(this);
  }

  componentDidMount() {
    this.props.getCountriesByUserId(1);
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
  toggleVisited(countryId) {
    var tempVisited = [...this.state.visitedList];
    if (tempVisited.includes(countryId)) {
      var index = tempVisited.indexOf(countryId);
      tempVisited.splice(index, 1);
    } else {
      tempVisited.push(countryId);
    }
    this.setState({ visitedList: tempVisited });
  }

  render() {
    const countries = this.props.countryList.map((country, index) => {
      // console.log("map render", this.props.countryList);
      return (
        <Country
          key={country.id}
          svg={country.svg}
          id={country.id}
          visited={country.visited}
          bucketlist={country.bucketlist}
          name={country.name}
          toggleCountrySelect={() => this.chooseCountry(country)}
          hoverCountry={this.setHoverCountry}
        />
      );
    });

    //pass svg
    return (
      <div>
        <NavBar />
        <svg viewBox="0 0 2000 1001" id="world" style={mapStyle}>
          {countries}
        </svg>
        {this.state.selectedCountry && (
          <Modal
            country={this.state.selectedCountry}
            closeModal={() => this.chooseCountry(null)}
          />
        )}
        {this.state.hoverCountry}
        <p>PIN IT PLAN IT POST IT</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { countryList, bucketList, visitedList } = state;
  return {
    countryList,
    bucketList,
    visitedList
  };
}

export default connect(mapStateToProps, {
  getCountriesByUserId,
  getCountries,
  addToBucketlist,
  removeFromBucketList,
  addToVisitedList,
  removeFromVisitedList
})(IntMap);
