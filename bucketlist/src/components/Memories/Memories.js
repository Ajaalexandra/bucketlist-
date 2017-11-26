import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fire as firebase } from "../../fire.js";
import RaisedButton from "material-ui/RaisedButton";
import Card from "material-ui/Card";
import axios from "axios";
import "./Memories.css";
import NavBar from "../NavBar/NavBar.js";
import { reqUser } from "../../redux/reducers/reducer.js";

const style = {
  margin: 12
};
class Memories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: "",
      imagePreviewUrl: "",
      downloadURL: "",
      name: "",
      description: ""
    };
    this.uploadImage = this.uploadImage.bind(this);
    this.processImageUpload = this.processImageUpload.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
  }

  componentDidMount() {
    this.props.reqUser();
    // console.log("Memories: ", this.props.user);
  }

  processImageUpload(event) {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }
  uploadImage(event) {
    let that = this;
    event.preventDefault();
    let file = this.state.file;
    let name = this.state.name;
    let description = this.state.description;
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef
      .child("profilePictures/" + file.name)
      .put(file);
    uploadTask.on(
      "state_changed",
      snapshot => {},
      function(error) {},
      function() {
        axios
          .post("/api/uploads", {
            name: name,
            description: description,
            url: uploadTask.snapshot.downloadURL
          })
          .then(result => {
            alert("Photo succesfully uploaded!");
            console.log(result);
          });
      }
    );
  }

  handleNameChange(userInput) {
    this.setState({ name: userInput });
  }

  handleDescription(userInput) {
    this.setState({ description: userInput });
  }

  render() {
    let imagePreview = null;

    if (this.state.imagePreviewUrl) {
      imagePreview = (
        <img src={this.state.imagePreviewUrl} className="image-preview" />
      );
    }
    return (
      <div className="memories-container">
        <NavBar />
        <h1>Memories</h1>
        <form
          onSubmit={event => {
            this.uploadImage(event);
          }}
        >
          <div className="name-input">
            <h3>Name: </h3>
            <input
              placeholder="title of photo"
              onChange={e => this.handleNameChange(e.target.value)}
            />
          </div>
          <Card className="img-preview-card">{imagePreview}</Card>

          <div className="desc-input">
            <h3>Description: </h3>
            <textarea onChange={e => this.handleDescription(e.target.value)} />
          </div>

          <div className="upload-btns">
            <input
              className="file-btn"
              type="file"
              onChange={event => {
                this.processImageUpload(event);
              }}
              alt=""
            />
            <RaisedButton
              secondary={true}
              labelColor="white"
              label="Upload Image"
              style={style}
              type="submit"
            />
          </div>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { user } = state;
  return {
    user
  };
}

export default connect(mapStateToProps, { reqUser })(Memories);
