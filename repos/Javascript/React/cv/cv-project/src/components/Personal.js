import React, { Component } from "react";
import "../App.css";

class Personal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="personalInput">
        <form>
          <div>
            <input type="text" id="nameInput" placeholder="Name"></input>
            <br></br>
            <input
              type="text"
              id="emailInput"
              placeholder="Email Address"
            ></input>
            <br></br>
            <input
              type="number"
              id="phoneInput"
              placeholder="Phone Number"
            ></input>
            <br></br>
            <input type="text" id="addressInput" placeholder="Address"></input>
            <br></br>
          </div>
        </form>
      </div>
    );
  }
}

export default Personal;
