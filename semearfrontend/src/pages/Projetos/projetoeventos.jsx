import React, { useState } from "react";
import Navbar from "../../components/Menu/Navbar";
import evento1 from "../../assets/evento1.jpeg";
import evento2 from "../../assets/evento2.jpeg";
import evento3 from "../../assets/evento3.jpeg";
import evento4 from "../../assets/evento4.jpeg";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import FormsVoluntarios from "../../components/FormsVoluntario/Voluntario";
import "./styles.css";

const Eventos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <div className="projeto-judo">
        <div className="banner">
          <div className="banner-content">
            <h1>Eventos</h1>
            <h2>Celebrando com propósito, unindo com afeto</h2>
          </div>
        </div>

        <div className="projeto-conteudo">
          <p>
            A <strong>ONG Semeando o Futuro</strong> realiza eventos em datas comemorativas ao longo do ano com o objetivo de fortalecer os laços com a comunidade, celebrar conquistas e promover momentos de alegria, cultura e integração.
          </p>

          <p>
            Nossas comemorações incluem festas temáticas, atividades culturais, ações solidárias e encontros especiais que mobilizam voluntários, beneficiários, famílias e parceiros. Tudo é planejado com carinho e atenção aos detalhes, criando experiências únicas para todos os envolvidos.
          </p>

          <div className="projeto-imagens">
            <img src={evento1} alt="Crianças celebrando festa junina" />
            <img src={evento2} alt="Voluntários organizando ação solidária" />
          </div>

          <p>
            Os eventos também são espaços de partilha, escuta e troca de saberes — momentos em que histórias se cruzam, talentos são descobertos e novas amizades florescem. É nesse espírito de comunhão que construímos, a cada encontro, uma rede de apoio mais forte e afetiva.
          </p>

          <div className="projeto-timeline">
            <h3>Vivências que conectam</h3>
            <p>
              É nos abraços trocados, nas danças em grupo, nos olhos brilhando durante uma apresentação ou em uma simples partilha de bolo que percebemos o verdadeiro sentido dos eventos: criar laços.
            </p>
            <p>
              Cada vivência é uma oportunidade de celebrar a vida, semear esperança e inspirar a solidariedade. Seja em um Natal comunitário ou em um evento no Dia das Crianças, todos saem transformados — com o coração mais cheio e a vontade de continuar plantando o bem.
            </p>
          </div>

          <div className="projeto-imagens">
            <img src={evento3} alt="Apresentação cultural com idosos" />
            <img src={evento4} alt="Grupo celebrando o aniversário da ONG" />
          </div>

          <p>
            Os eventos da <strong>Semeando o Futuro</strong> são mais do que comemorações — são expressões de cuidado, empatia e união. A cada celebração, cultivamos vínculos que fortalecem nossa missão de transformar realidades com amor e propósito.
          </p>

          <div className="projeto-call">
            <h3>Quer participar dos nossos eventos?</h3>
            <p>
              Seja voluntário nas nossas comemorações e ajude a espalhar alegria e acolhimento por onde passamos. Clique abaixo e venha fazer parte dessas vivências inesquecíveis!
            </p>
            <button onClick={() => setIsModalOpen(true)}>
              Quero me tornar voluntário(a)!
            </button>
          </div>

          {isModalOpen && (
            <FormsVoluntarios onClose={() => setIsModalOpen(false)} />
          )}
        </div>
      </div>

      <footer className="site-footer">
        <div className="footer-content">
          <p>© 2025 Semeando o Futuro. Todos os direitos reservados.</p>
          <div className="social-icons">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a href="mailto:contato@seudominio.com" aria-label="E-mail">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Eventos;
