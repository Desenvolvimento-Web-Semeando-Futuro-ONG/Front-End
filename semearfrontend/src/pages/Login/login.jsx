import React from "react";
import "./styles.css";
import imagemCrianca from "../../assets/loginfundo.png"; 
// import logoSemear from "../../assets/logo.semear.png";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-left">
        <img src={imagemCrianca} alt="Criança feliz" className="imagem-fundo" />
        <div className="texto-overlay">
          <h2>Junte-se a nós<br /> <strong>e faça a diferença</strong></h2>
          <p>Junte-se a nós, e nos ajude a continuar com esse projeto impactante</p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-box">
          <h3>Bem-vindo à</h3>
          <h1 className="titulo-logo">
            <span>Semeando o</span><br /> <span className="azul">Futuro 🌱</span>
          </h1>

          <form>
            <label>Email</label>
            <input type="email" placeholder="example@gmail.com" />

            <label>Senha</label>
            <input type="password" placeholder="********" />

            <div className="options">
              <label><input type="checkbox" /> Lembrar de mim</label>
              <a href="#">Esqueceu a senha?</a>
            </div>

            <button type="submit" className="login-buttonn">Login</button>
          </form>

          <p className="register-text">
            Não tem uma conta? <a href="#">Registrar</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
