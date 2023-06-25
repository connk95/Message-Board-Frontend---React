import React, { Component } from "react";
import Experience from "./components/Experience";
import Personal from "./components/Personal";
import Education from "./components/Education";
import Skills from "./components/Skills";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      display: "personal",
      personalInfo: {
        name: "",
        address: "",
        phone: "",
        email: "",
      },
      jobs: [],
      edus: [],
      skills: [],
      util: {
        expRender: 1,
      },
    };
  }

  retrieveData = () => {
    if (this.state.display === "personal") {
      this.state.personalInfo.name = document.getElementById("name").value;
      this.state.personalInfo.address =
        document.getElementById("address").value;
      this.state.personalInfo.phone = document.getElementById("phone").value;
      this.state.personalInfo.email = document.getElementById("email").value;
      console.log(this.state.personalInfo);
    } else if (this.state.display === "experience") {
      let job = [
        document.getElementById("position").value,
        document.getElementById("company").value,
        document.getElementById("jobStart").value,
        document.getElementById("jobEnd.value").value,
      ];
      this.state.jobs.push(job);
    } else if (this.state.display === "education") {
      let edu = [
        document.getElementById("institution").value,
        document.getElementById("qualification").value,
        document.getElementById("eduStart").value,
        document.getElementById("eduEnd.value").value,
      ];
      this.state.edus.push(edu);
    } else if (this.state.display === "skills") {
      let skill = [
        document.getElementById("skill").value,
        document.getElementById("description").value,
      ];
      this.state.skills.push(skill);
    } else {
      return;
    }
  };

  handleExtraInfo = (e) => {
    console.log(this.props.util.expRender);
    this.retrieveData();

    // FOR FUTURE VERSION, CREATE MULTIPLE FORMS
    // e.preventDefault();
    // document.getElementById("add").remove();
    // this.setState({
    //   util: {
    //     expRender: this.state.util.expRender + 1,
    //   },
    // });
  };

  handleContinue = (e) => {
    e.preventDefault();
    if (this.state.display === "home") {
      this.setState({
        display: (this.state.display = "personal"),
      });
    } else if (this.state.display === "personal") {
      this.retrieveData();
      this.setState({
        display: (this.state.display = "skills"),
      });
    } else if (this.state.display === "skills") {
      this.retrieveData();
      this.setState({
        display: (this.state.display = "experience"),
      });
    } else if (this.state.display === "experience") {
      this.retrieveData();

      // FOR FUTURE VERSION, RETRIEVE MULTIPLE FORM DATA AT ONCE
      // for (let i = 0; i < this.util.expRender; i++) {
      // let job = [
      //   document.getElementById(`position${this.state.util.expRender}`).value,
      //   document.getElementById(`company${this.state.util.expRender}`).value,
      //   document.getElementById(`jobStart${this.state.util.expRender}`).value,
      //   document.getElementById(`jobEnd${this.state.util.expRender}`).value,
      // ];
      //this.setState({ jobs: this.state.jobs.push(job) });
      //}
      this.setState({
        display: (this.state.display = "education"),
        // util: {
        //   expRender: 1,
        // },
      });
    } else if (this.state.display === "education") {
      this.retrieveData();
      this.setState({
        display: (this.state.display = "resume"),
      });
    } else {
      return;
    }
  };

  render() {
    const display = this.state.display;
    if (this.display === "home") {
    } else if (display === "personal") {
      return (
        <div>
          <Personal />
          <button type="submit" onClick={this.handleContinue}>
            Continue
          </button>
        </div>
      );
    } else if (display === "skills") {
      return (
        <div>
          <Skills
            count={this.state.util.expRender}
            handleExtraInfo={this.handleExtraInfo}
          />
          <button type="submit" onClick={this.handleContinue}>
            Continue
          </button>
        </div>
      );
    } else if (display === "experience") {
      return (
        <div>
          <Experience
            count={this.state.util.expRender}
            handleExtraInfo={this.handleExtraInfo}
          />
          <button type="submit" onClick={this.handleContinue}>
            Continue
          </button>
        </div>
      );
    } else if (display === "education") {
      return (
        <div>
          <Education
            count={this.state.util.expRender}
            handleExtraInfo={this.handleExtraInfo}
          />
          <button type="submit" onClick={this.handleContinue}>
            Continue
          </button>
        </div>
      );
    } else if (display === "resume") {
      //print resume
    }
  }
}

export default App;
