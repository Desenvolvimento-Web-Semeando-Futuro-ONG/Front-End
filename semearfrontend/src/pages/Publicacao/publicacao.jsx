import React, { useState } from 'react';
import './styles.css';
import logoSemear from "../../assets/logo.semear.png";

function Publicacao() {
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [imagemCapa, setImagemCapa] = useState(null);

  const horaAtual = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagemCapa(URL.createObjectURL(file));
    }
  };

  return (
    <div className="tela-publicacao">
      <header className="publicacao-header">
        <div className="logo-titulo">
          <img src={logoSemear} alt="Logo" className="logo-img" />
          <div>
            <strong>Semeando o Futuro</strong>
            <p className="atualizacao">Última atualização {horaAtual}</p>
          </div>
        </div>
        <div className="botoes-header">
          <button className="btn-fechar">Fechar e Salvar</button>
          <button className="btn-publicar">Publicar</button>
        </div>
      </header>

      <main className="editor">
        <input
          className="titulo-input"
          type="text"
          placeholder="Title..."
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <div className="upload-box">
          {imagemCapa ? (
            <img src={imagemCapa} alt="Capa" className="capa-preview" />
          ) : (
            <label className="upload-placeholder">
              <span role="img" aria-label="Upload">🖼️</span> Upload Photo
              <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
            </label>
          )}
        </div>

        <textarea
          className="texto-area"
          placeholder="Tell your story..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
      </main>
    </div>
  );
}

export default Publicacao;
