import React from "react";
import Navbar from "../../components/Menu/Navbar";
import recreativo1 from "../../assets/recreativo1.png";
import recreativo2 from "../../assets/recreativo2.png";
import recreativo3 from "../../assets/recreativo3.png";
import recreativo4 from "../../assets/recreativo4.png";
import "./styles.css";

const ProjetoRecreativas = () => (
  <>
    <Navbar />
    <div className="projeto-recreativas">
      <div className="banner">
        <div className="banner-content">
          <h1>Recreação que acolhe</h1>
          <h2>Atividades que despertam alegria, fortalecem vínculos e semeiam bem-estar</h2>
        </div>
      </div>

      <div className="projeto-conteudo">
        <p>
        Na <strong>Semeando O Futuro</strong>, acreditamos que o direito ao lazer, à convivência e à 
        expressão não tem idade. As atividades recreativas desenvolvidas pela ONG são 
        voltadas a todos que fazem parte da nossa comunidade: crianças, adolescentes, 
        adultos e idosos. Em cada encontro, buscamos criar um espaço de bem-estar, 
        alegria e partilha, onde as pessoas possam se reconectar com sua própria 
        história, com o outro e com a vida em sua forma mais leve e significativa.
          <br />
          <br />
          As ações incluem jogos, dinâmicas em grupo, oficinas artísticas, atividades 
          culturais, rodas de conversa e momentos de celebração, sempre adaptados às 
          diferentes faixas etárias e interesses. Esses encontros são planejados com 
          intencionalidade educativa e afetiva, promovendo o desenvolvimento de 
          habilidades socioemocionais, o fortalecimento dos vínculos comunitários e 
          o sentimento de pertencimento. Independentemente da idade, o brincar, o criar 
          e o conviver são caminhos potentes de inclusão, escuta e valorização da 
          trajetória de cada indivíduo.
        </p>

        <div className="projeto-imagens">
          <img src={recreativo1} alt="Crianças no tatame" />
          <img src={recreativo2} alt="Criancas fazendo ovos da pascoa" />
        </div>

        <div className="projeto-timeline">
          <h3>Convivência</h3>
          <p>
          É nos sorrisos compartilhados, nos gestos espontâneos e nas pequenas conquistas 
          do dia a dia que vemos o impacto transformador das atividades recreativas. Um adulto 
          redescobrindo o prazer de pintar, uma idosa participando de uma roda de dança, 
          um grupo intergeracional se unindo em uma gincana: tudo isso revela a força do 
          encontro como ferramenta de cuidado e transformação social.
          </p>
          <p>
          As experiências proporcionadas por essas ações fortalecem os laços entre os 
          participantes e despertam um olhar mais sensível para si e para o coletivo. 
          Ao promover espaços em que diferentes gerações podem aprender juntas, rir, 
          criar e se emocionar, a <strong>Semeando o Futuro</strong> reafirma sua missão de cultivar uma 
          comunidade mais humana, afetuosa e integrada.
          </p>
          <p>
          Aqui, cada momento de lazer é também um gesto de inclusão e dignidade. <strong>Ao semear 
          alegria, respeito e convivência, estamos, juntos, cultivando o futuro que sonhamos.</strong>
          </p>
        </div>

        <div className="projeto-imagens">
          <img src={recreativo3} alt="Mulher ensinando auto-maquiagem" />
          <img src={recreativo4} alt="Criancas vendo o show do palhaco" />
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

export default ProjetoRecreativas;
