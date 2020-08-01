import React, { useState } from "react";
import hero from "../hero.svg";
import logo_text from "../logo_text.svg";
import Menu from "./Menu";

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

      <div className={"content"}>
        <p>{title}</p>

        <h3>{amount}</h3>
      </div>
    </div>
  );
};

export default Header;
