import React, { useEffect, useState } from "react";
import {
  FaMedal,
  FaUserShield,
  FaDumbbell,
  FaUserCircle,
  FaWhatsapp,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import criancaFoto from "../../assets/criança.foto.png";
import logoSemear from "../../assets/logo.semear.png";
import fotoequipe from "../../assets/fotoequipe.png";
import CountUp from "react-countup";
import { FaUsers, FaTrophy, FaRunning } from "react-icons/fa";
import { FaFistRaised, FaBlind, FaHeart } from 'react-icons/fa';
import Testemunhos from '../Testemunhos/testemunhos';




const Home = () => {
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5189/api/Evento")
      .then((res) => res.json())
      .then((data) => setEventos(data))
      .catch((err) => console.error("Erro ao buscar eventos:", err));
  }, []);

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">
          <img src={logoSemear} alt="Logo ONG" />
        </div>
        <nav>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Projetos</a>
            </li>
            <li>
              <a href="#">Eventos</a>
            </li>
            <li>
              <a href="#">Sobre</a>
            </li>
            <li>
              <a href="#">Doações</a>
            </li>
            <li>
              <a href="#">Contato</a>
            </li>
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

      <section className="hero-section">
        <div className="hero-content">
          <span className="subtitle">ONG - Semeando o Futuro</span>
          <h1>
            No coração das crianças e <span className="highlight">jovens</span>,
            transformando vidas!
          </h1>
          <button className="cta-button">Saiba mais</button>
        </div>
      </section>

      <section className="sport-section">
      <div className="sport-image">
  <img src={criancaFoto} alt="Criança no campeonato" />
  <div className="badge">
    <span className="badge-number">40+</span>
    <span className="badge-text">Crianças em<br />Campeonatos</span>
  </div>
</div>

        <div className="sport-text">
          <h2>
            Deixando nossas crianças felizes
            <br />
            através do esporte
          </h2>

          <p>
            O esporte é mais do que competição é disciplina, superação <br />e
            esperança. Para crianças e jovens, ele abre portas, ensina valores e
            <br /> cria oportunidades que vão além das quadras e campos.
          </p>
          <p>
            <br />
            Cada treino é um passo rumo a um futuro melhor, <br /> longe da
            vulnerabilidade e mais perto dos sonhos.
          </p>
          <div className="impact-section">
            <div className="timeline-line"></div>
            <div className="impact-item">
              <div className="icon-box">
              <FaUsers />
              </div>
              <div className="impact-content">
                <h3>Esporte é inclusão</h3>
                <p>Mantemos crianças e jovens longe da vulnerabilidade</p>
              </div>
            </div>
            <div className="impact-item">
              <div className="icon-box">
              <FaTrophy />
              </div>
              <div className="impact-content">
                <h3>Uma chance muda tudo</h3>
                <p>
                  Crianças e jovens encontram novos caminhos através do jogo.
                </p>
              </div>
            </div>
            <div className="impact-item">
              <div className="icon-box">
              <FaRunning />
              </div>
              <div className="impact-content">
                <h3>Sonhos em movimento</h3>
                <p>Com seu apoio, levamos nossos atletas mais longe!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sobre-section">
        <div className="sobre-content">
          <div className="sobre-texto">
            <h2>
              <span className="destaque">S</span>emeando o Futuro
            </h2>
            <p>
              <strong>Fundada em 2021, a ONG Semeando o Futuro</strong><br /> nasceu
              do desejo de transformar vidas e criar oportunidades<br /> para
              mulheres, crianças e idosos na comunidade da Lagoa do Araçá.
            </p>
            <p className="mensagem">
              Mais do que um espaço de apoio, a Semeando o Futuro é um farol de
              esperança,{" "}<br />
              <span className="destaque-verde">
              provando que, com união e solidariedade, é possível transformar
                a realidade e <br />construir um amanhã melhor para todos.
              </span>
            </p>
          </div>
          <div className="sobre-foto">
            <img src={fotoequipe} alt="Equipe ONG" />
          </div>
        </div>
      </section>

      {/* <section className="eventos-section">
        <h2 className="eventos-titulo">Eventos Recentes</h2>
        <div className="eventos-grid">
          {eventos.map((evento) => (
            <div
              key={evento.id}
              className="card-evento"
              onClick={() => navigate(`/evento/${evento.id}`)}
            >
              <img
                src={evento.imagemUrl}
                alt={evento.nome}
                className="card-img"
              />
              <h3 className="card-titulo">{evento.nome}</h3>
            </div>
          ))}
        </div>
      </section> */}

<section className="numeros-section">
  <div className="numeros-grid colado">
    <div className="numero-item verde">
      <FaFistRaised size={40} className="icone-numero" />
      <h3>
        <CountUp
          end={100}
          duration={2}
          prefix="+"
          enableScrollSpy
          scrollSpyDelay={200}
        />
      </h3>
      <p>Crianças no Judô</p>
    </div>

    <div className="numero-item laranja">
      <FaBlind size={40} className="icone-numero" />
      <h3>
        <CountUp
          end={60}
          duration={2}
          prefix="+"
          enableScrollSpy
          scrollSpyDelay={200}
        />
      </h3>
      <p>Idosos Acolhidos</p>
    </div>

    <div className="numero-item azul">
      <FaHeart size={40} className="icone-numero" />
      <h3>
        <CountUp
          end={50}
          duration={2}
          prefix="+"
          enableScrollSpy
          scrollSpyDelay={200}
        />
      </h3>
      <p>Voluntário em Atividades</p>
    </div>
  </div>
  <Testemunhos />
</section>

      <a
        href="https://wa.me/5581988430469?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20a%20ONG%20Semeando%20o%20Futuro."
        className="whatsapp-icon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={38} color="#25D366" />
      </a>
    </div>
  );
};

export default Home;
