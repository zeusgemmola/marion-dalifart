import React from "react";
import { useNavigate } from "react-router-dom";
import "./AppBar.css";
import logo from "./AppBar.logo.png";

const AppBar = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/");
  };

  return (
    <nav className="AppBar">
      <img
        className="AppBar-logo"
        src={logo}
        aria-label="convertor"
        alt="convertor"
        onClick={goBack}
      />
    </nav>
  );
};

export default AppBar;
