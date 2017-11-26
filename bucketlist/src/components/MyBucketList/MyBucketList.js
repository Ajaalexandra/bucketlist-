import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { getCountriesByUserId } from "../../redux/reducers/reducer.js";
import axios from "axios";
import "./MyBucketList.css";
import NavBar from "../NavBar/NavBar.js";

class MyBucketList extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      id: 1,
      bucketlist: []
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

  render() {
    // console.log("state: ", this.state.bucketlist);
    const bucket = this.state.bucketlist.map(function(country, index) {
      return <p key={index}>{country.countryid}</p>;
    });
    return (
      <div className="bucketlist-container">
        <NavBar />
        <h1> Bucketlist View </h1>
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
