import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { reqUser } from "../../redux/reducers/reducer.js";
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
      notes: [],
      comment: ""
    };
    this.handleChangeForComment = this.handleChangeForComment.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/bucketlist/${this.state.id}`).then(response => {
      // console.log("response", response.data);
      return this.setState({ bucketlist: response.data });
    });
  }

  handleChangeForComment(userInput) {
    this.setState({ comment: userInput });
  }

  submitComment() {
    axios.post(`/api/comments/${this.state.id}`, {
      userid: this.state.id,
      comment: this.state.comment
    });
  }

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
              <textarea
                onChange={e => this.handleChangeForComment(e.target.value)}
              />
              <button onClick={() => this.submitComment()}>Save</button>
            </Card>
          );
        }
      }
    }, this);
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
