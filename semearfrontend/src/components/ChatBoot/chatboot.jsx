import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import botIcon from "../../assets/chatboot.png";

const fluxo = {
  inicio: {
    mensagem: "Olá! Somos a ONG Semeando o Futuro. Como podemos te ajudar?",
    opcoes: [
      { texto: "Voluntariado", next: "voluntariado" },
      { texto: "Doações", next: "doacoes" },
      { texto: "Projetos", next: "projetos" },
      { texto: "Contato", next: "contato" },
    ],
  },
  voluntariado: {
    mensagem: "O que você gostaria de saber sobre voluntariado?",
    opcoes: [
      { texto: "Como me inscrever", next: "voluntariado_inscricao" },
      { texto: "Quais os requisitos", next: "voluntariado_requisitos" },
      { texto: "Voltar ao menu principal", next: "inicio" },
    ],
  },
  voluntariado_inscricao: {
    mensagem: "Você pode se inscrever acessando a seção 'Seja um Voluntário'. Preencha todos os dados e escolha o projeto que melhor gosta, e aguarde nosso contato!",
    opcoes: [
      { texto: "Voltar ao menu principal", next: "inicio" },
      { texto: "Encerrar", next: "fim" },
    ],
  },
  voluntariado_requisitos: {
    mensagem: "Você pode visualizar os requisitos acessando a seção 'Seja um Voluntário' Você precisa apenas preencher os dados e selecionar o projeto desejado.",
    opcoes: [
      { texto: "Voltar ao menu principal", next: "inicio" },
      { texto: "Encerrar", next: "fim" },
    ],
  },
  doacoes: {
    mensagem: "O que você gostaria de saber sobre doações?",
    opcoes: [
      { texto: "Como doar?", next: "como_doar" },
      { texto: "Como saber para onde o meu dinheiro será destinado?", next: "destino_doacao" },
      { texto: "Voltar ao menu principal", next: "inicio" },
    ],
  },
  como_doar: {
    mensagem: "Você pode realizar a sua doação acessando a seção 'Doações' e contribuir com o projeto.",
    opcoes: [
      { texto: "Voltar ao menu principal", next: "inicio" },
      { texto: "Encerrar", next: "fim" },
    ],
  },
  destino_doacao: {
    mensagem: "Sua doação irá para melhora os projetos existentes e para ajudar crianças e idosos na comunidade'.",
    opcoes: [
      { texto: "Voltar ao menu principal", next: "inicio" },
      { texto: "Encerrar", next: "fim" },
    ],
  },
  projetos: {
    mensagem: "Selecione o projeto da ONG que você gostaria de conhecer.",
    opcoes: [
      { texto: "Organizaçaõ de eventos", next: "projeto_judo" },
      { texto: "Boa Idade", next: "projeto_costura" },
      { texto: "Atividades Recreativas", next: "atividade_recreativa" },
      { texto: "Voltar ao menu principal", next: "inicio" },
    ],
  },
  projeto_judo: {
    mensagem: "Oferecemos eventos para comunidade como o dia das Mães, dias das Crianças, você pode visualizar mais sobre, na seção Projetos da nossa landingpage",
    opcoes: [
      { texto: "Voltar ao menu principal", next: "inicio" },
      { texto: "Encerrar", next: "fim" },
    ],
  },
  projeto_costura: {
    mensagem: "Oferecemos aulas de costura, artesanato, crochê para os idosos da comunidade. Gostaria de saber mais ? você pode visualizar na seção Projetos da nossa landingpage.",
    opcoes: [
      { texto: "Voltar ao menu principal", next: "inicio" },
      { texto: "Encerrar", next: "fim" },
    ],
  },
  atividade_recreativa: {
    mensagem: "Oferecemos atividades recreativas para crianças e idosos. Entre em contato ou se voluntarie!",
    opcoes: [
      { texto: "Voltar ao menu principal", next: "inicio" },
      { texto: "Encerrar", next: "fim" },
    ],
  },
  contato: {
    mensagem: "Você pode entrar em contato conosco pelo WhatsApp ou e-mail. Estamos aqui para ajudar!",
    opcoes: [
      { texto: "Voltar ao menu principal", next: "inicio" },
      { texto: "Encerrar", next: "fim" },
    ],
  },
  fim: {
    mensagem: "Obrigado por conversar com a gente!",
    opcoes: [],
  },
};

const Chatbot = () => {
  const [aberto, setAberto] = useState(false);
  const [etapaAtual, setEtapaAtual] = useState("inicio");
  const [historico, setHistorico] = useState([]);
  const ref = useRef(null);
  const etapa = fluxo[etapaAtual];

  const toggleChat = () => setAberto(!aberto);

  const handleOpcao = (next, texto) => {
    if (next === "fim") {
      setHistorico([
        { tipo: "usuario", mensagem: texto },
        { tipo: "chatbot", mensagem: fluxo[next].mensagem },
      ]);
      setTimeout(() => {
        setEtapaAtual("inicio");
        setHistorico([{ tipo: "chatbot", mensagem: fluxo.inicio.mensagem }]);
      }, 2000);
    } else {
      setHistorico((prev) => [
        ...prev,
        { tipo: "usuario", mensagem: texto },
        { tipo: "chatbot", mensagem: fluxo[next].mensagem },
      ]);
      setEtapaAtual(next);
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [historico]);

  useEffect(() => {
    setHistorico([{ tipo: "chatbot", mensagem: fluxo.inicio.mensagem }]);
  }, []);

  return (
    <div className="chatbot-wrapper">
      {aberto && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <span>Assistente ONG</span>
            <button onClick={toggleChat}>×</button>
          </div>
          <div className="chatbot-body" ref={ref}>
            {historico.map((msg, i) => (
              <div key={i} className={`chatbot-message ${msg.tipo}`}>
                <img src={botIcon} alt="avatar" />
                <div className="bubble">{msg.mensagem}</div>
              </div>
            ))}
          </div>
          <div className="chatbot-options">
            {etapa.opcoes.map((opcao, i) => (
              <button key={i} onClick={() => handleOpcao(opcao.next, opcao.texto)}>
                {opcao.texto}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="chatbot-float">
        {!aberto && <div className="chatbot-bubble">Posso te ajudar?</div>}
        <button className="chatbot-toggle" onClick={toggleChat}>
          <img src={botIcon} alt="Abrir chat" />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
