import React, { useEffect, useState } from "react";
import {
  FaWhatsapp,
  FaUsers,
  FaTrophy,
  FaRunning,
  FaFistRaised,
  FaBlind,
  FaHeart,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import criancaFoto from "../../assets/criança.foto.png";
import fotoequipe from "../../assets/fotoequipe.png";
import judocriancas from "../../assets/judo.png";
import idosos from "../../assets/idosos.png";
import recreativa from "../../assets/recreativa.png";
import fotocard from "../../assets/fotocard.png";
import idosa from "../../assets/idosafoto.png";
import estudantes from "../../assets/estudantesfoto.png";
import criancasevento from "../../assets/criancasevento.png";
import criancascozinha from "../../assets/cozinhacriancas.png";
import CountUp from "react-countup";
import Testemunhos from "../Testemunhos/testemunhos";
import ProjetoCard from "../../components/ProjetoCard/ProjetoCard";
import Navbar from "../../components/Menu/Navbar";
import FormsVoluntario from "../../components/FormsVoluntario/Voluntario";
import { FaHandsHelping, FaBookOpen, FaBus, FaTshirt } from "react-icons/fa";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import ChatBoot from "../../components/ChatBoot/chatboot";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';


const Home = () => {
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [open, setOpen] = useState(false);

  const abrirFormulario = () => {
    setMostrarFormulario(true);
  };

  const fecharFormulario = () => {
    setMostrarFormulario(false);
  };

  useEffect(() => {
    fetch("http://localhost:5189/api/Evento")
      .then((res) => res.json())
      .then((data) => setEventos(data))
      .catch((err) => console.error("Erro ao buscar eventos:", err));
  }, []);

  return (
    <>
      <div className="home-container">
        <Navbar />
      </div>
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
            <span className="badge-text">
              Crianças em
              <br />
              Campeonatos
            </span>
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
              <strong>Fundada em 2021, a ONG Semeando o Futuro</strong>
              <br /> nasceu do desejo de transformar vidas e criar oportunidades
              <br /> para mulheres, crianças e idosos na comunidade da Lagoa do
              Araçá.
            </p>
            <p className="mensagem">
              Mais do que um espaço de apoio, a Semeando o Futuro é um farol de
              esperança, <br />
              <span className="destaque-verde">
                provando que, com união e solidariedade, é possível transformar
                a realidade e <br />
                construir um amanhã melhor para todos.
              </span>
            </p>
          </div>
          <div className="sobre-foto">
            <img src={fotoequipe} alt="Equipe ONG" />
          </div>
        </div>
      </section>
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
      <section className="projetos-section">
        <div className="projetos-header">
          <h4 className="projetos-subtitulo">
            CONHEÇA UM POUCO DOS NOSSOS PROJETOS
          </h4>
          <h2 className="projetos-titulo">Projetos na Semeando o Futuro</h2>
        </div>

        <div className="projetos-grid">
          <Link to="/projeto-judo">
            <ProjetoCard
              titulo="Judô para as Crianças"
              descricao="Aula de judô para as crianças todos os finais de semana para crianças carentes da comunidade"
              imagem={judocriancas}
            />
          </Link>

          <Link to="/projetos/recreativa">
            <ProjetoCard
              titulo="Atividades Recreativas"
              descricao="Oficinas divertidas para crianças e jovens nos finais de semana"
              imagem={recreativa}
            />
          </Link>

          <Link to="/projetos/idosos">
            <ProjetoCard
              titulo="Atividades com Idosos"
              descricao="Aulas de instrumentos e canto para jovens talentos"
              imagem={idosos}
            />
          </Link>

          <Link to="/projetos/eventos">
            <ProjetoCard
              titulo="Organização de Eventos"
              descricao="Aulas de dança para promover saúde e autoestima"
              imagem={fotocard}
            />
          </Link>
        </div>
      </section>

      <section className="eventos-section">
        <h4 className="eventos-titulo">
          Eventos especiais da ONG Semeando o Futuro
        </h4>
        <h2 className="projetos-titulo">Nossos Eventos Recentes</h2>
        <div className="eventos-grid">
          {eventos.map((evento) => (
            <div
              key={evento.id}
              className="card-evento"
              onClick={() => navigate(`/evento/${evento.id}`)}
            >
              <img
                src={
                  evento.imagemUrl
                    ? `http://localhost:5189/api/galeria/${evento.imagemUrl}`
                    : fotocard
                }
                alt={evento.nome}
                className="card-img"
                onError={(e) => {
                  e.target.src = fotocard;
                  e.target.alt = "Imagem padrão do evento";
                }}
              />
              <div className="card-content">
                <h3 className="card-titulo">{evento.nome}</h3>
                {evento.descricao && (
                  <p className="card-descricao">
                    {evento.descricao.length > 100
                      ? `${evento.descricao.substring(0, 100)}...`
                      : evento.descricao}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="banner-voluntario">
        <div className="conteudo-banner">
          <h2>Seja voluntário da nossa ONG</h2>
          <p>Clique no botão e veja quais são os projetos disponíveis!</p>
          <button className="botao-voluntario" onClick={abrirFormulario}>
            Seja Voluntário
          </button>
          {mostrarFormulario && (
            <FormsVoluntario fecharFormulario={fecharFormulario} />
          )}
        </div>
      </section>
      <section className="pessoas-section">
        <h2>
          Pessoas Que Fazem <br />A Diferença na Semeando
        </h2>

        <div className="pessoas-grid">
          <div className="pessoa-card">
            <img src={idosa} className="pessoa-img" />
            <div className="pessoa-info verde">
              <p className="texto-pessoas">
                “Momentos com idosos são realizados semanalmente com atividades
                que estimulam a convivência, autoestima e alegria de viver.”
              </p>
            </div>
          </div>

          <div className="pessoa-card">
            <img src={estudantes} className="pessoa-img" />
            <div className="pessoa-info laranja">
              <p className="texto-pessoas">
                “Estudantes universitários nos visitaram e realizaram uma
                doação, para compra de kimonos celebrando conosco o Dia das Mães
                com carinho e solidariedade.”
              </p>
            </div>
          </div>

          <div className="pessoa-card">
            <img src={criancasevento} className="pessoa-img" />
            <div className="pessoa-info verde">
              <p className="texto-pessoas">
                “Um palhaço animou as crianças ao ar livre em um momento de
                descontração e risos que ficou marcado na memória de todos, um
                momento mágico.”
              </p>
            </div>
          </div>

          <div className="pessoa-card">
            <img src={criancascozinha} className="pessoa-img" />
            <div className="pessoa-info laranja">
              <p className="texto-pessoas">
                “Crianças participaram de uma oficina na cozinha onde puderam
                preparar chocolates com apoio dos voluntários que participam
                dessas atividades.”
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="doacao-section">
        <div className="doacao-container">
          <div className="doacao-texto">
            <p className="doacao-subtitulo">
              FAÇA SUA DOAÇÃO E AJUDE NESSA CAUSA
            </p>
            <h2>
              Contribua para a nossa ONG,
              <br />
              sua doação irá ajudar a manter o projeto
            </h2>
            <p className="doacao-descricao">
              Com sua doação, você ajuda crianças e jovens a continuarem
              treinando, competindo e sonhando alto. Cada contribuição cobre
              custos com transporte, uniformes, alimentação e inscrições em
              campeonatos.
            </p>

            <div className="doacao-beneficios">
              <div className="beneficio">
                <FaHandsHelping className="icone-beneficio" />
                <span>Ações sociais</span>
              </div>
              <div className="beneficio">
                <FaBookOpen className="icone-beneficio" />
                <span>Atividades educativas</span>
              </div>
              <div className="beneficio">
                <FaBus className="icone-beneficio" />
                <span>Transporte</span>
              </div>
              <div className="beneficio">
                <FaTshirt className="icone-beneficio" />
                <span>Kimonos e uniformes</span>
              </div>
            </div>
          </div>

          <div className="doacao-imagem">
            <div className="overlay">
              <h3>
                Faça sua doação e nos ajude a<br />
                transformar vidas com
                <br />
                oportunidades e esperança!
              </h3>
              <button className="botao-doacao">Doação</button>
            </div>
          </div>
        </div>
      </section>

      <section className="contato-section">
        <p className="subtitulo">EM CONTATO COM A SEMEANDO O FUTURO</p>
        <h2 className="titulo">
          Entre em contato conosco e participe do nosso projeto
        </h2>

        <div className="contato-boxes">
          <div className="contato-item">
            <FaMapMarkerAlt className="icon" />
            <h3>Endereço</h3>
            <p>74A High Road, Wanstead, London, E11 7RJ</p>
          </div>

          <div className="contato-item">
            <FaPhoneAlt className="icon" />
            <h3>Telefone</h3>
            <p>078-4518-4100</p>
          </div>

          <div className="contato-item">
            <FaEnvelope className="icon" />
            <h3>E-mail</h3>
            <p>info@teadoftherapydirectory.com</p>
          </div>
        </div>
      </section>
      <section className="chatboot-section">
        <ChatBoot />
      </section>
      <footer className="site-footer">
      <div className="footer-content">
        <p>© 2025 Semeando o Futuro. Todos os direitos reservados.</p>
        <div className="social-icons">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a href="mailto:contato@seudominio.com" aria-label="E-mail">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
      <a
        href="https://wa.me/5581988430469?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20a%20ONG%20Semeando%20o%20Futuro."
        className="whatsapp-icon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={38} color="#25D366" />
      </a>
    </>
  );
};

export default Home;
