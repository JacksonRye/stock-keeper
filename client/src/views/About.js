import React from "react";
import Menu from "../components/Menu";
import logo from "../logo_text.svg";

const About = () => {
  return (
    <div className="AboutView">
      <div className="menu-container">
        <Menu className="menu" />
      </div>

      <img src={logo} alt="logo" />

      <div className="info">
        <p>© 2020</p>
        <p>Computer Wizards</p>
        <p>Jackson Chijioke</p>
      </div>

      <div className="contact">
        <p>chijiokejackson35@gmail.com</p>
        <p>+234 812 536 5368</p>
      </div>
    </div>
  );
};

export default About;
