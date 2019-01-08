import React, { Component } from "react";
import { init_b4w, load } from "./Blend4Web.jsx";
import Options from "./Options";
import "./Viewport.css";

class Viewport extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    init_b4w();
  }

  handleOptionsChange(obj){
    console.log(obj);
    load(obj);
  }

  render() {
    return (
      <div className="Viewport">
        <div id="blend4web-container" />
        <Options onChange={this.handleOptionsChange} />
      </div>
    );
  }
}

export default Viewport;
