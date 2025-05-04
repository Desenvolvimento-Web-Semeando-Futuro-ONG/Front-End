import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import logoSemear from "../../assets/logo.semear.png";
import { FaImage } from "react-icons/fa";

function Publicacao() {
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [imagemCapa, setImagemCapa] = useState(null);
  const [arquivoImagem, setArquivoImagem] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();

  const horaAtual = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagemCapa(URL.createObjectURL(file));
      setArquivoImagem(file);
    }
  };

  const publicarConfirmado = async () => {
    const formData = new FormData();
    formData.append("Nome", titulo);
    formData.append("Descricao", texto);
    formData.append("DataEvento", new Date().toISOString());
    if (arquivoImagem) {
      formData.append("Imagem", arquivoImagem);
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5189/api/Evento", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("Evento publicado com sucesso!");
        navigate("/");
      } else {
        alert("Erro ao publicar evento.");
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Erro na conexão com o servidor.");
    }
  };

  return (
    <div className="tela-publicacao">
      <header className="publicacao-header">
        <div className="logo-titulo">
          <img src={logoSemear} alt="Logo" className="logo-img" />
          <div>
            <strong>Semeando o Futuro</strong>
            <p className="atualizacao">Horário:{horaAtual}</p>
          </div>
        </div>
        <div className="botoes-header">
          <button className="btn-fechar">Fechar e Salvar</button>
          <button className="btn-publicar" onClick={() => setMostrarModal(true)}>
            Publicar
          </button>
        </div>
      </header>

      <main className="editor">
        <input
          className="titulo-input"
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <div className="upload-box">
          {imagemCapa ? (
            <label className="capa-preview-container">
              <img src={imagemCapa} alt="Capa" className="capa-preview" />
              <div className="capa-overlay">
                <FaImage
                  style={{
                    fontSize: "24px",
                    color: "#fff",
                    marginRight: "8px",
                  }}
                />
                <span>Trocar foto</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </label>
          ) : (
            <label className="upload-placeholder">
              <FaImage
                style={{ fontSize: "20px", color: "#888", marginRight: "4px" }}
              />
              <span>Upload Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </label>
          )}
        </div>

        <div
          className="editor-area"
          contentEditable
          placeholder="Escreva uma história..."
          onInput={(e) => setTexto(e.currentTarget.innerText)}
          suppressContentEditableWarning={true}
        />
      </main>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Tem certeza que deseja publicar esse texto na landing page?</p>
            <div className="modal-buttons">
              <button onClick={publicarConfirmado}>Sim</button>
              <button onClick={() => setMostrarModal(false)}>Não</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Publicacao;
