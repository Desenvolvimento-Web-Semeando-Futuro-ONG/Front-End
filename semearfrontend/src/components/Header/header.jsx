import React, { useState } from "react";
import "./styles.css";
import logo from "../../assets/logo.semear.png";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [novoProjeto, setNovoProjeto] = useState("");
  const [projetos, setProjetos] = useState([]);
  const [ativo, setAtivo] = useState(true);

  const toggleModal = () => setShowModal(!showModal);

  const handleCadastrar = () => {
    if (novoProjeto.trim()) {
      const novo = {
        id: Date.now(),
        nome: novoProjeto,
        status: ativo ? "Ativo" : "Inativo"
      };
      setProjetos([...projetos, novo]);
      setNovoProjeto("");
      setAtivo(true);
    }
  };

  const handleExcluir = (id) => {
    const atualizados = projetos.filter((p) => p.id !== id);
    setProjetos(atualizados);
  };

  return (
    <>
      <header className="header-container">
        <div className="header-left">
          <img src={logo} alt="Logo" className="header-logo" />
          <h1 className="header-title">Semeando o Futuro</h1>
        </div>

        <div className="header-right">
          <button className="header-btn" onClick={toggleModal}>Projetos</button>
          <button className="header-btn">Eventos</button>
        </div>
      </header>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Projetos</h2>

            <div className="modal-form">
              <input
                type="text"
                placeholder="Nome do Projeto"
                value={novoProjeto}
                onChange={(e) => setNovoProjeto(e.target.value)}
              />
              <button
                className={`status-btn ${ativo ? "ativo" : "inativo"}`}
                onClick={() => setAtivo(!ativo)}
              >
                {ativo ? "Ativo" : "Inativo"}
              </button>
              <button className="cadastrar-btn" onClick={handleCadastrar}>
                Cadastrar
              </button>
            </div>

            <ul className="projetos-lista">
              {projetos.map((projeto) => (
                <li key={projeto.id}>
                  <span>{projeto.nome} - {projeto.status}</span>
                  <button
                    className="excluir-btn"
                    onClick={() => handleExcluir(projeto.id)}
                  >
                    Excluir
                  </button>
                </li>
              ))}
            </ul>

            <button className="fechar-btn" onClick={toggleModal}>Fechar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
