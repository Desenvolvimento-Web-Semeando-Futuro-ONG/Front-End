import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logoSemear from "../../assets/logo.semear.png";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo">
        <img src={logoSemear} alt="Logo ONG" />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="#home">Home</Link>
          </li>
          <li>
            <Link to="#projetos">Projetos</Link>
          </li>
          <li>
            <Link to="#eventos">Eventos</Link>
          </li>
          <li>
            <a href="#sobre">Sobre</a>  
          </li>
          <li>
            <Link to="/doacoes">Doações</Link>
          </li>
          <li>
            <Link to="#contato">Contato</Link>
          </li>
        </ul>
      </nav>
      <div className="login-icon">
        <Link to="/login" className="login-button">
          <FaUserCircle size={20} className="login-icon-white" />
          Login
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
