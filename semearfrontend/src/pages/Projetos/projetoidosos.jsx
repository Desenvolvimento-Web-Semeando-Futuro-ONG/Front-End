import React from "react";
import Navbar from "../../components/Menu/Navbar";
import boaidade1 from "../../assets/boaidade1.png"
import boaidade2 from "../../assets/boaidade2.png"
import boaidade3 from "../../assets/boaidade3.png"
import boaidade4 from "../../assets/boaidade4.png"
import "./styles.css";

const ProjetoIdosos = () => (
  <>
    <Navbar />
    <div className="projeto-idosos">
      <div className="banner">
        <div className="banner-content">
          <h1>Projeto Grupo da Boa Idade</h1>
          <h2>Criatividade, convivência e aprendizado para uma vida com mais significado</h2>
        </div>
      </div>

      <div className="projeto-conteudo">
        <p>
          O projeto <strong>Grupo da Boa Idade</strong> é realizado todas as quartas-feiras, às 14h30, 
          com o objetivo de promover convivência, aprendizado e autoestima entre as idosas que fazem 
          parte da ONG Semeando um Futuro. A iniciativa oferece oficinas práticas de costura e artesanato, 
          criando um espaço acolhedor onde elas podem aprender novas habilidades e compartilhar experiências de vida.
          <br />
          <br />
          Durante as atividades, as participantes confeccionam caixas organizadoras, peças decorativas para o lar, 
          panos de prato, bolsas e muitos outros itens criativos e úteis. Esses momentos são mais do que oficinas
           manuais — são oportunidades de expressão pessoal, troca de saberes e fortalecimento de vínculos entre 
           as mulheres da comunidade.
        </p>
          <p>
          O <strong>Grupo da Boa Idade</strong> tem se mostrado uma fonte de alegria, pertencimento e empoderamento para suas 
          integrantes. Por meio do trabalho artesanal, muitas redescobrem talentos, desenvolvem autonomia e 
          contribuem ativamente para a ONG. O projeto reforça que o envelhecimento pode, e deve, ser vivido 
          com dignidade, aprendizado contínuo e laços afetivos fortalecidos.
          </p>

        <div className="projeto-imagens">
          <img src={boaidade1} alt="Idosa mostrando desenho" />
          <img src={boaidade2} alt="Grupo Boa Idade confeccionando coelhos da páscoa" />
        </div>

        <div className="projeto-timeline">
          <h3>Momentos</h3>
          <p>
            As oficinas do <strong>Grupo da Boa Idade</strong> são organizadas 
            com carinho para oferecer um espaço de aprendizado, acolhimento e convivência entre 
            mulheres da comunidade. Embora o projeto tenha surgido com foco nas idosas da ONG, hoje 
            ele também conta com a participação de mulheres de diferentes faixas etárias, promovendo 
            o diálogo entre gerações e o fortalecimento dos laços comunitários. Os encontros acontecem 
            semanalmente, com atividades que envolvem <strong>costura, bordado, pintura e a produção de diversos 
            itens artesanais e decorativos</strong>.
          </p>

          <p>
          Além de estimular a criatividade e a autoestima, o projeto tem como objetivo valorizar a 
          história de vida de cada participante e criar um ambiente de apoio mútuo. Durante as oficinas, 
          é comum que as mulheres compartilhem suas experiências, aprendam umas com as outras e se 
          envolvam ativamente na criação de peças únicas e cheias de significado. Para enriquecer 
          ainda mais os encontros, a ONG também busca voluntários com experiência em artesanato e 
          trabalhos manuais, que contribuem com seu conhecimento e ajudam a orientar as participantes 
          nas confecções.
          </p>
        </div>
        <p>
        O impacto dessas oficinas vai além da produção artesanal: elas fortalecem o senso de pertencimento, 
        promovem bem-estar emocional e ampliam as oportunidades de expressão e autonomia. Muitas participantes 
        relatam melhorias na autoestima, na qualidade de vida e no relacionamento com outras pessoas. 
        Ao unir mulheres, histórias e talentos em um mesmo espaço, o Grupo da Boa Idade se consolida 
        como um projeto transformador, que valoriza cada etapa da vida com respeito, dignidade e afeto.
        </p>

        <div className="projeto-imagens">
          <img src={boaidade3} alt="Grupo da boa idade no dia das mulheres" />
          <img src={boaidade4} alt="Grupo da boa idade na aula de culinária" />
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

export default ProjetoIdosos;
