import React, { Component } from "react";
import "./App.css";
import Options from "./components/Options.jsx";
import Viewport from "./components/Viewport.jsx";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Viewport />
        <Options />
      </div>
    );
  }
}

export default App;
