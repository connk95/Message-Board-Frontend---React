import React, { Component } from "react";
import "../App.css";

class Education extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="educationInput">
        <form>
          {new Array(this.props.count)
            .fill("arbitrary value")
            .map((item, index) => (
              <div key={index}>
                <input
                  type="text"
                  id="instInput"
                  placeholder="Institution"
                ></input>
                <br></br>
                <input
                  type="text"
                  id="qualifInput"
                  placeholder="Qualification"
                ></input>
                <br></br>
                <input type="date" id="eduStart"></input>
                <br></br>
                <input type="date" id="eduEnd"></input>
                <br></br>
                <button onClick={this.props.handleExtraInfo}>
                  + Education
                </button>
              </div>
            ))}
        </form>
      </div>
    );
  }
}

export default Education;
