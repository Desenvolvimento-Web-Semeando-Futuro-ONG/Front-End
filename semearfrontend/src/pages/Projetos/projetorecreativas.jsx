import React, { useState } from "react";
import Navbar from "../../components/Menu/Navbar";
import recreativa1 from "../../assets/recreativa.png";
import recreativa2 from "../../assets/cozinhacriancas.png";
import recreativa3 from "../../assets/fotorecreativa.jpeg";
import recreativa4 from "../../assets/fotorecreativa2.jpeg";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import FormsVoluntarios from "../../components/FormsVoluntario/Voluntario";
import "./styles.css";

const AtividadeRecreativa = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <div className="projeto-judo">
        <div className="banner">
          <div className="banner-content">
            <h1>Atividades Recreativas</h1>
            <h2>Lazer, expressão e alegria em cada movimento</h2>
          </div>
        </div>

        <div className="projeto-conteudo">
          <p>
            Na <strong>Semeando o Futuro</strong>, acreditamos que o direito ao lazer, à convivência e à expressão não tem idade. As atividades recreativas promovem momentos de leveza, criatividade e integração para todas as idades, oferecendo um espaço seguro e acolhedor onde os participantes podem se divertir, se expressar e redescobrir habilidades esquecidas ou adormecidas.
          </p>

          <p>
            Nossas oficinas envolvem pintura, dança, jogos colaborativos, expressão corporal, brincadeiras adaptadas, dinâmicas de grupo e muito mais. Cada encontro é uma oportunidade de fortalecer vínculos, estimular o corpo e a mente, e celebrar a vida com espontaneidade e entusiasmo.
          </p>

          <div className="projeto-imagens">
            <img src={recreativa1} alt="Participantes dançando em roda" />
            <img src={recreativa2} alt="Oficina de pintura criativa" />
          </div>

          <p>
            As atividades recreativas também são planejadas para incluir pessoas com diferentes habilidades, respeitando os limites individuais e promovendo a inclusão. Seja através de um jogo em grupo ou de um momento de arte, todos encontram sua forma única de participar e se expressar.
          </p>

          <div className="projeto-timeline">
            <h3>Convivência que transforma</h3>
            <p>
              É nos sorrisos compartilhados, nos gestos espontâneos e nas pequenas conquistas do dia a dia que vemos o impacto transformador das atividades recreativas. Um adulto redescobrindo o prazer de pintar, uma idosa participando animadamente de uma roda de dança, ou uma simples gargalhada coletiva após uma dinâmica divertida — tudo isso revela o poder da convivência com propósito.
            </p>
            <p>
              Esses momentos criam memórias afetivas, fortalecem laços e constroem um sentimento coletivo de pertencimento. Ao estimular a convivência, proporcionamos experiências que vão além do entretenimento: geramos saúde emocional, valorização da autoestima e inclusão social real.
            </p>
          </div>

          <div className="projeto-imagens">
            <img src={recreativa3} alt="Momento de descontração com jogos" />
            <img src={recreativa4} alt="Grupo celebrando atividade recreativa" />
          </div>

          <p>
            As oficinas recreativas da <strong>Semeando o Futuro</strong> são mais do que eventos pontuais — são oportunidades de semear alegria, estimular talentos, renovar energias e reafirmar que o brincar e o conviver são essenciais em todas as fases da vida. A cada atividade, cultivamos laços que inspiram cuidado, respeito e amor ao próximo.
          </p>

          <div className="projeto-call">
            <h3>Quer fazer parte disso?</h3>
            <p>
              Se você deseja ser voluntário ou colaborar com as atividades recreativas, clique abaixo e contribua com essa rede de afeto e alegria!
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

export default AtividadeRecreativa;
