import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import logoSemear from '../../assets/logo.semear.png' 

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo">
        <img src={logoSemear} alt="Logo ONG" />
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/projetos">Projetos</Link></li>
          <li><Link to="/eventos">Eventos</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
          <li><Link to="/doacoes">Doações</Link></li>
          <li><Link to="/contato">Contato</Link></li>
        </ul>
      </nav>
      <div className="login-icon">
        <Link to="/login">
          <button className="login-button">
            <FaUserCircle size={20} /> Login
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
