import React, { Component } from "react";
import "../App.css";

class Experience extends Component {
  constructor(props) {
    super(props);
  }

  //   removeButton = () => {
  //     document.getElementById("add").remove();
  //   };
  // const { jobs } = props;

  // organize the data into an object here, and then pass the data up to the parent component and push it to state.jobs

  // look into passing props back up to parent component

  render() {
    return (
      <div id="jobInput">
        <form>
          {new Array(this.props.count)
            .fill("arbitrary value")
            .map((item, index) => (
              <div key={index}>
                <input
                  type="text"
                  //   id={`position${this.props.count}`}
                  id="position"
                  placeholder="Position"
                ></input>
                <br></br>
                <input
                  type="text"
                  //   id={`company${this.props.count}`}
                  id="company"
                  placeholder="Company"
                ></input>
                <br></br>
                {/* <input type="date" id={`jobStart${this.props.count}`}></input> */}
                <input type="date" id="jobStart"></input>
                <br></br>
                {/* <input type="date" id={`jobEnd${this.props.count}`}></input> */}
                <input type="date" id="jobEnd"></input>
                <br></br>
                <button id="add" onClick={this.props.handleExtraInfo}>
                  + Experience
                </button>
              </div>
            ))}
        </form>
      </div>
    );
  }
}

export default Experience;
