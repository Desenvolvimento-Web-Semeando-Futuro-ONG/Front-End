import React from "react";
import { FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";  
import "./styles.css";

const Home = () => {
  return (
    <div className="home-container">
      <header className="navbar">
        <h1 className="logo">ECO<span>decor</span></h1>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Sobre</a></li>
            <li><a href="#">Categorias</a></li>
            <li><a href="#">Contato</a></li>
          </ul>
        </nav>
        <div className="nav-icons">
          <input type="text" placeholder="Buscar produtos..." className="search-box" />
          <FaShoppingCart className="icon" />
          <FaHeart className="icon" />
        </div>
      </header>

      <section className="hero">
  <div className="hero-text">
    <h2>Descontos imperdíveis</h2>
    <h3>Em todos os produtos</h3>
    <p>Renove sua casa com nossos itens exclusivos de decoração. Economize até 70% e aproveite cupons especiais!</p>
    <button className="cta-button">Compre Agora</button>
  </div>
</section>

    </div>
  );
};

export default Home;
