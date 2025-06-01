import React, { useState } from "react";
import Navbar from "../../components/Menu/Navbar";
import judofoto1 from "../../assets/idosafoto.png";
import judofoto2 from "../../assets/idosos.png";
import judofoto3 from "../../assets/momentoidosos.jpeg";
import judofoto4 from "../../assets/atividadeidoso.jpeg";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaEnvelope } from "react-icons/fa";



import FormsVoluntarios from "../../components/FormsVoluntario/Voluntario";
import "./styles.css";

const ProjetoJudo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <div className="projeto-judo">
        <div className="banner">
          <div className="banner-content">
            <h1>Grupo Boa Idade</h1>
            <h2>Convivência, aprendizado e autoestima na melhor idade</h2>
          </div>
        </div>

        <div className="projeto-conteudo">
          <p>
            O <strong>Grupo Boa Idade</strong> é realizado toda quarta-feira às 14h30 com o objetivo de promover convivência, aprendizado e autoestima para pessoas da terceira idade. O grupo é um espaço de acolhimento, onde cada participante é incentivada a compartilhar experiências, desenvolver habilidades e criar novas memórias em um ambiente seguro, leve e afetuoso.
          </p>

          <p>
            Durante as atividades, as participantes confeccionam caixas organizadoras, peças decorativas para o lar, panos de prato, bolsas e muitos outros itens criativos e úteis. Cada oficina é cuidadosamente planejada para estimular a coordenação motora, fortalecer o senso de utilidade e proporcionar prazer por meio da arte e do artesanato.
          </p>

          <div className="projeto-imagens">
            <img src={judofoto1} alt="Participantes exibindo artesanato" />
            <img src={judofoto2} alt="Trabalho manual em andamento" />
          </div>

          <p>
            O trabalho artesanal se transforma em algo muito maior: é também uma terapia, um momento de escuta e troca entre as participantes. As aulas se tornam encontros que unem aprendizado com afeto, promovendo não apenas habilidades manuais, mas também bem-estar emocional e social.
          </p>

          <div className="projeto-timeline">
            <h3>Histórias que inspiram</h3>
            <p>
              Em meio às atividades, surgem histórias de vida — algumas divertidas, outras emocionantes, todas cheias de significado. Há quem compartilhe memórias de infância no interior, quem lembre dos primeiros bordados ensinados por uma avó, ou ainda quem revele como o grupo ajudou a superar momentos difíceis.
            </p>
            <p>
              Cada encontro se torna um capítulo de uma história coletiva, onde o afeto, a escuta e a empatia são protagonistas. É nesse ambiente que vínculos são criados e fortalecidos, revelando o verdadeiro valor da convivência entre gerações e o poder do pertencimento.
            </p>
          </div>

          <div className="projeto-imagens">
            <img src={judofoto3} alt="Exposição dos trabalhos manuais" />
            <img src={judofoto4} alt="Participantes em roda de conversa" />
          </div>

          <p>
            O impacto dessas oficinas vai além da produção artesanal. Ao participar do grupo, muitas idosas relatam melhorias no humor, na autoestima e no sentimento de pertencimento. A troca de experiências, o cuidado coletivo e o apoio mútuo fazem do Grupo Boa Idade um verdadeiro espaço de transformação pessoal e social.
          </p>

          <p>
            A cada quarta-feira, o grupo se reencontra com sorrisos, abraços e novos aprendizados, mostrando que nunca é tarde para criar, viver novas histórias e fortalecer laços. O <strong>Grupo Boa Idade</strong> é, acima de tudo, um espaço onde a vida continua sendo celebrada em sua melhor fase.
          </p>

          <div className="projeto-call">
            <h3>Quer fazer parte disso?</h3>
            <p>
              Se você deseja ser voluntário ou contribuir com o Grupo Boa Idade, clique abaixo e junte-se a essa rede de afeto e transformação!
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

export default ProjetoJudo;
