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
            <input type="text" id="name" placeholder="Name"></input>
            <br></br>
            <input type="text" id="email" placeholder="Email Address"></input>
            <br></br>
            <input type="number" id="phone" placeholder="Phone Number"></input>
            <br></br>
            <input type="text" id="address" placeholder="Address"></input>
            <br></br>
          </div>
        </form>
      </div>
    );
  }
}

export default Personal;
