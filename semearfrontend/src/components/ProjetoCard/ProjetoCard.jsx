import React from 'react';
import './styles.css';

export default function ProjetoCard({ imagem, titulo, descricao }) {
    return (
      <div className="projeto-card">
        <img src={imagem} alt={titulo} className="projeto-imagem" />
        <div className="projeto-card-content">
          <h3 className="projeto-titulo">{titulo}</h3>
          <p className="projeto-descricao">{descricao}</p>
        </div>
      </div>
    );
  }
  
