import React from "react";
import Navbar from "../../components/Menu/Navbar";
import evento1 from "../../assets/evento1.png"
import evento2 from "../../assets/evento2.png"
import evento3 from "../../assets/evento3.png"
import evento4 from "../../assets/evento4.png"

import "./styles.css";

const ProjetoEventos = () => (
  <>
    <Navbar />
    <div className="projeto-eventos">
      <div className="banner">
        <div className="banner-content">
          <h1>Eventos que conectam</h1>
          <h2>Momentos que unem pessoas e transformam vidas</h2>
        </div>
      </div>

      <div className="projeto-conteudo">
        <p>
        A ONG <strong>Semeando o Futuro</strong> realiza eventos em datas comemorativas ao 
        longo do ano com o objetivo de fortalecer os laços com a comunidade e criar momentos 
        especiais de celebração, inclusão e solidariedade. Essas ações são planejadas com 
        carinho para reunir beneficiários, voluntários, parceiros e moradores do entorno em 
        um ambiente acolhedor, alegre e participativo.
          <br />
          <br />
          Entre os eventos mais marcantes estão as comemorações de Páscoa, Festa Junina, 
          Dia das Mães, Dia das Crianças e Natal, sempre com atividades culturais, apresentações, 
          brincadeiras e partilhas. Para tornar tudo ainda mais especial, os eventos contam 
          com a contribuição de pessoas que apoiam a causa e enriquecem essas experiências com 
          gestos de carinho, atenção e cuidado. Além disso, é a própria comunidade que já faz 
          parte da ONG quem contribui ativamente na organização e execução de cada detalhe, 
          desde a decoração até o preparo das atividades.
        </p>
          <p>
          Esses encontros são oportunidades valiosas para ampliar o impacto social das ações 
          da ONG, promover o bem-estar e cultivar o sentimento de pertencimento entre todos 
          os envolvidos. Ao unir esforços entre equipe, participantes e apoiadores, a <strong>Semeando 
          o Futuro</strong> mostra que transformar vidas é um trabalho coletivo, feito com afeto, 
          dedicação e colaboração.
          </p>

        <div className="projeto-imagens">
          <img src={evento1} alt="Crianças no dia das crianças" />
          <img src={evento2} alt="Voluntarios no dia das maes" />
        </div>

        <div className="projeto-timeline">
          <h3>Vivências</h3>
          <p>
          Os eventos comemorativos da ONG <strong>Semeando o Futuro</strong> são cuidadosamente planejados 
          e contam com o envolvimento direto de beneficiários, equipe e apoiadores. A 
          preparação inclui definição de temas, organização de atividades, montagem dos 
          espaços e criação de lembranças, sempre com foco na participação ativa da comunidade. 
          Cada detalhe é pensado para criar um ambiente significativo e acolhedor para todos os presentes.
          </p>
          <p>
          Mais do que momentos festivos, esses encontros têm como propósito <strong>promover 
          inclusão social, fortalecer vínculos entre os participantes e valorizar a trajetória 
          de cada pessoa atendida pela ONG.</strong> Os resultados são visíveis: aumento da autoestima,
           maior engajamento da comunidade e memórias afetivas duradouras que reforçam o 
           sentimento de pertencimento e confiança na missão da instituição.
          </p>
        </div>
        <p>
          Ao longo dos anos, os eventos passaram a fazer parte da identidade da ONG, 
          sendo aguardados com entusiasmo por todos os envolvidos. Cada edição traz 
          aprendizados e histórias emocionantes que alimentam o compromisso com a 
          transformação social. A troca constante entre gerações, culturas e experiências 
          nesses encontros fortalece ainda mais os laços comunitários e inspira novos projetos, 
          mantendo viva a missão de <strong>semear um futuro mais justo, afetuoso e colaborativo.</strong>
          </p>

        <div className="projeto-imagens">
          <img src={evento3} alt="Mesa de natal" />
          <img src={evento4} alt="Comemoracao de aniversario" />
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

export default ProjetoEventos;
