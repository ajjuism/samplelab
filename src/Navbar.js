import React from "react";
import logo from "./logo.png";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img src={logo} alt="Sample Lab Logo" className="navbar-logo" />
        <h1 className="navbar-title">Sample Lab</h1>
      </div>
    </nav>
  );
}

export default Navbar;
