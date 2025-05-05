import React from "react";
import { FaBell, FaQuestionCircle, FaUser } from "react-icons/fa";
import "./header.css";

const Header = () => {
  return (
    <header className="header-container">
      <h1 className="header-title">Semeando o Futuro</h1>
      <div className="header-icons">
        <FaBell className="header-icon" />
        <FaQuestionCircle className="header-icon" />
        <FaUser className="header-icon" />
      </div>
    </header>
  );
};

export default Header;
