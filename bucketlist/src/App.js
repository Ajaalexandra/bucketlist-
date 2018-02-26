import React, { Component } from "react";
import Router from "./router";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="App">{Router}</div>;
  }
}

export default App;


  // componentDidMount() {
  //   axios.get("/api/test").then(response => {
  //     console.log(response.data);
  //   });
  // }