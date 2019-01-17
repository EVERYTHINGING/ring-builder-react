import React, { Component } from "react";
import { initVerge3D, loadRing } from "./Verge3D.js";
import Options from "./Options";
import "./Viewport.css";

class Viewport extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    initVerge3D();
    loadRing();
  }

  handleOptionsChange(obj){
    console.log(obj);
    //loadRing();
  }

  render() {
    return (
      <div className="Viewport">
        <div id="verge3d-container" />
        <Options onChange={this.handleOptionsChange} />
      </div>
    );
  }
}

export default Viewport;
