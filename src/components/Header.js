import React from "react";
import logo from "../assets/images/cv_logo.png";

export const Header = ({ setOpenSideNav }) => {

  return (
    <header>
      <span className="head-span">
        <div class="burger-icon" onClick={() => setOpenSideNav((PrevValue) => !PrevValue)}>
          <div class="burger-line"></div>
          <div class="burger-line"></div>
          <div class="burger-line"></div>
        </div>
        <img src={logo} alt="Logo" />
      </span>
    </header>
  );
};
