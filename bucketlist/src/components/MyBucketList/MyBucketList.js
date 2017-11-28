import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { getCountriesByUserId } from "../../redux/reducers/reducer.js";
import Card from "material-ui/Card";
import axios from "axios";
import "./MyBucketList.css";
import NavBar from "../NavBar/NavBar.js";
import countries_json from "../../data/countries_json.js";

class MyBucketList extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      id: 1,
      bucketlist: [],
      notes: []
    };
  }

  componentWillMount() {
    // axios
    //   .get("/api/bucketlist/:id")
    //   .then(response => this.setState({ bucketlist: response.data }));
    axios.get(`/api/bucketlist/${this.state.id}`).then(response => {
      console.log("response", response.data);
      return this.setState({ bucketlist: response.data });
    });
  }

  //handleChangeForComment
  //submit change
  //onChange for text area handleChangeForComment()
  handleChangeForComment() {}

  //country names
  //countriesData is an array of objects imported from a local file.
  //country is each piece of data that is being returned from our getBucketlistByUserId SQL query.
  render() {
    const countriesData = countries_json;
    const bucket = this.state.bucketlist.map(function(country, index) {
      for (let i = 0; i < countriesData.length; i++) {
        if (countriesData[i].id === country.countryid) {
          return (
            <Card className="bucket-item">
              <p key={index}>{countriesData[i].name}</p>
              <p>My Trip Ideas</p>
              <textarea />
              <button>Save</button>
            </Card>
          );
        }
      }
    });
    return (
      <div className="bucketlist-container">
        <NavBar />
        <h1> Welcome to Your Bucketlist </h1>
        {bucket}
        <Link to="/bucketlist" />
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   const { bucketlist } = state;
//   return {
//     bucketlist
//   };
// }

// export default connect(mapStateToProps, { getCountriesByUserId })(MyBucketList);
export default MyBucketList;
