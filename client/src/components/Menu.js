import React, { useState } from "react";
import menu from "../menu.svg";
import logo_text_color from "../logo_text_color.svg";
import { Link } from "react-router-dom";


const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={"Menu"}>
      <img
        className={menuOpen ? "hide" : "show"}
        onClick={() => setMenuOpen(!menuOpen)}
        id="menu"
        src={menu}
        alt="menu"
      />


      <div onClick={() => setMenuOpen(false)} className={"dark-background " + (menuOpen ? "show" : "hide") }>

      </div>
      <div id="open-menu" className={menuOpen ? "show" : "hide"}>
        <svg
          onClick={() => setMenuOpen(!menuOpen)}
          className="close"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
            fill="white"
          />
        </svg>

        <img className="logo-text" src={logo_text_color} alt="logo" />

        <nav>
          <Link to="/">Inventory</Link>
          <Link to="/expenses">Expenses</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
