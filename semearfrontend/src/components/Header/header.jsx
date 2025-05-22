
import React, { useState, useEffect } from "react";
import "./styles.css";
import logo from "../../assets/logo.semear.png";
import { FaEllipsisV, FaTimes, FaArrowLeft } from "react-icons/fa";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCadastro, setShowCadastro] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [projetos, setProjetos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [projetoToToggle, setProjetoToToggle] = useState(null);
  const [actionType, setActionType] = useState("");

  const [novoProjeto, setNovoProjeto] = useState({
    nome: "",
    descricao: "",
    dataInicio: "",
    dataFim: ""
  });

  useEffect(() => {
    if (showModal) {
      fetchProjetos();
    }
  }, [showModal]);

  const fetchProjetos = async () => {
    try {
      const response = await fetch("http://localhost:5189/api/Projeto");
      if (response.ok) {
        const data = await response.json();
        setProjetos(data);
      } else {
        console.error("Erro ao buscar projetos");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setShowCadastro(false);
    setSearchTerm("");
  };

  const toggleCadastro = () => {
    setShowCadastro(!showCadastro);
    setNovoProjeto({
      nome: "",
      descricao: "",
      dataInicio: "",
      dataFim: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoProjeto({
      ...novoProjeto,
      [name]: value
    });
  };

  const handleCadastrar = async () => {
  try {
    const token = localStorage.getItem('token'); 
    
    const response = await fetch("http://localhost:5189/api/Projeto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify(novoProjeto),
    });

    if (response.ok) {
      fetchProjetos();
      toggleCadastro();
    } else {
      console.error("Erro ao cadastrar projeto");
      const errorData = await response.json();
      console.error("Detalhes do erro:", errorData);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
};

  const handleToggleStatus = (projeto, action) => {
    setProjetoToToggle(projeto);
    setActionType(action);
    setShowConfirmModal(true);
  };

  const confirmToggleStatus = async () => {
    try {
      const url = `http://localhost:5189/api/Projeto/${actionType.toLowerCase()}/${projetoToToggle.id}`;
      const response = await fetch(url, {
        method: "PUT",
      });

      if (response.ok) {
        fetchProjetos();
        setShowConfirmModal(false);
      } else {
        console.error(`Erro ao ${actionType} projeto`);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const filteredProjetos = projetos.filter(projeto =>
    projeto.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="projetos-modal-overlay">
          <div className="projetos-modal-container">
            <button className="modal-fechar" onClick={toggleModal}>
              <FaTimes />
            </button>
            
            {showCadastro ? (
              <div className="projetos-modal-conteudo">
                <div className="modal-header">
                  <button className="voltar-btn" onClick={toggleCadastro}>
                    <FaArrowLeft />
                  </button>
                  <h2 className="modal-titulo">Cadastrar Novo Projeto</h2>
                </div>
                
                <div className="projeto-form">
                  <div className="form-group">
                    <label>Nome do Projeto</label>
                    <input
                      type="text"
                      name="nome"
                      placeholder="Digite o nome do projeto"
                      value={novoProjeto.nome}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Descrição</label>
                    <textarea
                      name="descricao"
                      placeholder="Descreva o projeto"
                      value={novoProjeto.descricao}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Data de Início</label>
                      <input
                        type="date"
                        name="dataInicio"
                        value={novoProjeto.dataInicio}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Data de Término</label>
                      <input
                        type="date"
                        name="dataFim"
                        value={novoProjeto.dataFim}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="form-buttons">
                    <button className="cancelar-btn" onClick={toggleCadastro}>
                      Voltar
                    </button>
                    <button className="confirmar-btn" onClick={handleCadastrar}>
                      Cadastrar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="projetos-modal-conteudo">
                <h2 className="modal-titulo">Lista de Projetos</h2>
                
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Pesquisar projeto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="cadastrar-btn" onClick={toggleCadastro}>
                    Cadastrar
                  </button>
                </div>
                
                <ul className="projetos-lista">
                  {filteredProjetos.length > 0 ? (
                    filteredProjetos.map((projeto) => (
                      <li key={projeto.id}>
                        <div className="projeto-info">
                          <span className="projeto-nome">{projeto.nome}</span>
                          <span className={`projeto-status ${projeto.ativo ? "ativo" : "inativo"}`}>
                            {projeto.ativo ? "Ativo" : "Inativo"}
                          </span>
                        </div>
                        <div className="projeto-actions">
                          <div className="dropdown">
                            <button className="dropdown-toggle">
                              <FaEllipsisV />
                            </button>
                            <div className="dropdown-menu">
                              <button onClick={() => handleToggleStatus(projeto, projeto.ativo ? "Desativar" : "Ativar")}>
                                {projeto.ativo ? "Desativar" : "Ativar"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <div className="lista-vazia">
                      Nenhum projeto encontrado
                    </div>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal">
            <h3>Tem certeza que deseja {actionType.toLowerCase()} este projeto?</h3>
            <p>{projetoToToggle?.nome}</p>
            <div className="confirm-modal-buttons">
              <button className="cancelar-btn" onClick={() => setShowConfirmModal(false)}>
                Cancelar
              </button>
              <button className="confirmar-btn" onClick={confirmToggleStatus}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
