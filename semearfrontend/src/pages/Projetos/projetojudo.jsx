import React from "react";
import Navbar from "../../components/Menu/Navbar";
import judofoto1 from "../../assets/judo.png";
import judofoto2 from "../../assets/criança.foto.png";
import "./styles.css";

const ProjetoJudo = () => (
  <>
    <Navbar />
    <div className="projeto-judo">
      <div className="banner">
        <div className="banner-content">
          <h1>Projeto Judô para as Crianças</h1>
          <h2>Transformando vidas com esporte e inclusão</h2>
        </div>
      </div>

      <div className="projeto-conteudo">
        <p>
          O projeto <strong>Judô para as Crianças</strong> nasceu em 2018 com o
          sonho de levar disciplina, respeito e espírito de equipe para meninos
          e meninas de comunidades vulneráveis. Desde então, já beneficiamos
          mais de 200 crianças, oferecendo aulas semanais gratuitas com
          professores voluntários certificados.
          <br />
          <br />
          Além de dominar técnicas de queda e projeção, nossos pequenos atletas
          aprendem valores como autocontrole, perseverança e solidariedade —
          habilidades que carregam para a vida. Famílias relatam melhora no
          rendimento escolar, autoestima elevada e novos laços de amizade
          criados no tatame.
        </p>

          <p>
            Os campeonatos são também uma oportunidade para a comunidade se
            reunir, celebrar o esforço coletivo e reconhecer o empenho de cada
            criança. Além disso, essas experiências abrem portas para que alguns
            de nossos atletas, ao longo do tempo, se destaquem em competições
            estaduais e nacionais, ampliando ainda mais as oportunidades que o
            judô pode oferecer.
          </p>

        <div className="projeto-imagens">
          <img src={judofoto1} alt="Crianças no tatame" />
          <img src={judofoto2} alt="Professor ensinando judô" />
        </div>

        <div className="projeto-timeline">
          <h3>História</h3>
          <p>
            Desde a criação em 2018, o projeto{" "}
            <strong>Judô para as Crianças</strong> não apenas tem se dedicado ao
            ensino do judô, mas também à realização de campeonatos internos e
            externos. Esses campeonatos são uma excelente oportunidade para as
            crianças aplicarem o que aprenderam nas aulas e vivenciarem a
            competitividade de forma saudável.
          </p>

          <p>
            Os campeonatos são realizados ao longo do ano, com pelo menos duas
            competições principais: a <strong>Copa Comunitária de Judô</strong>,
            que reúne crianças de várias comunidades locais, e o{" "}
            <strong>Campeonato Regional de Judô Infantil</strong>, onde nossos
            pequenos atletas competem com outras escolas e projetos de judô da
            região. Essas competições promovem o espírito de equipe, o respeito
            pelos adversários e o desenvolvimento da autoconfiança das crianças.
          </p>
        </div>
        <p>
          As aulas acontecem todos os finais de semana no centro comunitário.
          Contamos com professores voluntários que acompanham o desenvolvimento
          das crianças, garantindo um ambiente seguro e acolhedor. As aulas
          acontecem todos os finais de semana no centro comunitário. Contamos
          com professores voluntários que acompanham o desenvolvimento das
          crianças, garantindo um ambiente seguro e acolhedor.
        </p>

        <div className="projeto-imagens">
          <img src={judofoto1} alt="Crianças no tatame" />
          <img src={judofoto2} alt="Professor ensinando judô" />
        </div>
        <div className="projeto-timeline">
          <h3>Evento Campeonatos</h3>
          <p>
            Desde a criação em 2018, o projeto{" "}
            <strong>Judô para as Crianças</strong> não apenas tem se dedicado ao
            ensino do judô, mas também à realização de campeonatos internos e
            externos. Esses campeonatos são uma excelente oportunidade para as
            crianças aplicarem o que aprenderam nas aulas e vivenciarem a
            competitividade de forma saudável.
          </p>

          <p>
            Os campeonatos são realizados ao longo do ano, com pelo menos duas
            competições principais: a <strong>Copa Comunitária de Judô</strong>,
            que reúne crianças de várias comunidades locais, e o{" "}
            <strong>Campeonato Regional de Judô Infantil</strong>, onde nossos
            pequenos atletas competem com outras escolas e projetos de judô da
            região. Essas competições promovem o espírito de equipe, o respeito
            pelos adversários e o desenvolvimento da autoconfiança das crianças.
          </p>
        </div>
        <div className="projeto-call">
          <h3>Quer fazer parte disso?</h3>
          <p>
            Se você quer ser voluntário ou inscrever uma criança, clique abaixo
            e participe desse movimento!
          </p>
          <button
            onClick={() => (window.location.href = "/formulario-candidatura")}
          >
            Quero me tornar voluntário(a)!
          </button>
        </div>
      </div>
    </div>
  </>
);

export default ProjetoJudo;
