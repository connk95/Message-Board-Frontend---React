import React, { Component } from "react";
import "../App.css";

class Skills extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="skillInput">
        <form>
          {new Array(this.props.count)
            .fill("arbitrary value")
            .map((item, index) => (
              <div key={index}>
                <input type="text" id="skill" placeholder="Skill"></input>
                <br></br>
                <input
                  type="text"
                  id="description"
                  placeholder="Description"
                ></input>
                <br></br>
                <button onClick={this.props.handleExtraInfo}>+ Skills</button>
              </div>
            ))}
        </form>
      </div>
    );
  }
}

export default Skills;
