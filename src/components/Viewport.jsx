import React, { Component } from "react";
import { init_b4w, loadFromClick } from "./Blend4Web.jsx";
import "./Viewport.css";

class Viewport extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    init_b4w();
  }

  handleClick(e) {
    let data = JSON.parse(e.target.getAttribute("data-load"));
    loadFromClick(data);
  }

  render() {
    return (
      <div className="Viewport">
        <div id="blend4web-container" />
        <div className="button-container">
          <button
            onClick={this.handleClick}
            data-load='{ "type": "band", "name": "ring1" }'
          >
            Load Ring 1
          </button>
          <button
            onClick={this.handleClick}
            data-load='{ "type": "band", "name": "ring2" }'
          >
            Load Ring 2
          </button>
          <button id="rotate-btn">Rotate</button>
          <button
            onClick={this.handleClick}
            data-load='{ "type": "diamond", "name": "diamond-round" }'
          >
            Load Round Diamond
          </button>
        </div>
      </div>
    );
  }
}

export default Viewport;
