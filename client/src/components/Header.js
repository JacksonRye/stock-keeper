import React, { useState } from "react";
import hero from "../hero.svg";
import logo_text from "../logo_text.svg";
import Menu from "./Menu";
import GenerateReport from "./GenerateReport";

const Header = ({ title, amount }) => {
  return (
    <div className="Header blur">
      <header>
        <div>
          <img src={logo_text} alt="logo_text" />
        </div>

        <div>
          <Menu />
        </div>
      </header>

      <div className="content">
        <div className="info">
          <p>{title}</p>

          <h3>{amount}</h3>
        </div>

        <div className="report">
          <GenerateReport />
        </div>
      </div>
    </div>
  );
};

export default Header;
