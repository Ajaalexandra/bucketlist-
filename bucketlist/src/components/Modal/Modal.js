import React, { Component } from "react";
import "./Modal.css";
import { connect } from "react-redux";

import {
  addToBucketlist,
  removeFromBucketList,
  addToVisitedList,
  removeFromVisitedList,
  getCountriesByUserId
} from "../../redux/reducers/reducer.js";

class Modal extends Component {
  constructor(props) {
    super(props);
    console.log("modal props: ", props);

    this.state = {
      visited: props.country.visited,
      bucketlist: props.country.bucketlist
    };

    this.saveChanges = this.saveChanges.bind(this);
  }

  componentDidMount() {
    console.log(this.state);
  }

  saveChanges() {
    const { visited, bucketlist } = this.state;
    let { country, user } = this.props;
    user = { id: 1 };
    if (!country.visited && visited) {
      this.props.addToVisitedList(country.id, user.id);
    }
    if (!country.bucketlist && bucketlist) {
      this.props.addToBucketlist(country.id, user.id);
    }
    if (country.visited && !visited) {
      this.props.removeFromVisitedList(country.id, user.id);
    }
    if (country.bucketlist && !bucketlist) {
      this.props.removeFromBucketList(country.id, user.id);
    }
    this.props.getCountriesByUserId(user.id);
  }

  render() {
    // console.log(this.state);
    return (
      <div className="Modal">
        <p> {this.props.country.name} </p>
        <span>visited</span>
        <input
          type="checkbox"
          checked={this.state.visited}
          onChange={e => this.setState({ visited: !this.state.visited })}
        />
        <span>bucketlist</span>
        <input
          checked={this.state.bucketlist}
          type="checkbox"
          onChange={e => this.setState({ bucketlist: !this.state.bucketlist })}
        />
        <button
          onClick={() => {
            this.saveChanges();
            this.props.closeModal();
          }}
        >
          Save
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { countryList, user } = state;
  return {
    countryList,
    user
  };
}

export default connect(mapStateToProps, {
  addToBucketlist,
  removeFromBucketList,
  addToVisitedList,
  removeFromVisitedList,
  getCountriesByUserId
})(Modal);
