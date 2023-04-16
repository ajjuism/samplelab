import React from "react";
import logo from "./logo.png";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-title-container">
          <img src={logo} alt="Sample Lab Logo" className="navbar-logo" />
          <a href="https://samplelab.vercel.app/" className="title-link"> {/* Replace Link with an <a> tag */}
            <h1 className="navbar-title">Sample Lab</h1>
          </a>
        </div>
        <a
          href="https://sample-library-xi.vercel.app/"
          // target="_blank"
          rel="noopener noreferrer"
          className="navbar-link"
        >
          Sample Library
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
