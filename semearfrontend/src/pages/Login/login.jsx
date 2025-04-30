import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./styles.css";
import imagemCrianca from "../../assets/loginfundo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const Login = () => { 
  const navigate = useNavigate(); 

  const [login, setLogin] = useState("");  
  const [senha, setSenha] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [modoRecuperarSenha, setModoRecuperarSenha] = useState(false);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("Por favor, complete o CAPTCHA!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5189/api/Auth/login", {
        login: login,
        senha: senha,
        captchaToken: captchaValue,
      });

      console.log("Token recebido:", response.data.token);
      localStorage.setItem("token", response.data.token);

      navigate("/publicacao"); 

    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Falha ao fazer login. Verifique seus dados.");
    }
  };

  const handleSubmitRecuperar = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5238/api/forgot-password", {
        email: login, 
      });

      if (response.data.sucesso) {
        alert("Email enviado! Verifique sua caixa de entrada.");
        setModoRecuperarSenha(false);
      } else {
        alert("Não encontramos este email. Verifique e tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao solicitar recuperação:", error);
      alert("Erro ao tentar recuperar senha. Tente novamente.");
    }
  };

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
            <span>Semeando o</span><br /> <span className="azull">Futuro</span>
          </h1>

          {modoRecuperarSenha ? (
            <form onSubmit={handleSubmitRecuperar}>
              <label>Login (Email)</label>
              <input 
                type="text" 
                value={login} 
                onChange={(e) => setLogin(e.target.value)} 
                required 
              />

              <button type="submit" className="login-buttonn">Recuperar Senha</button>

              <p className="register-text">
                Lembrou sua senha? <a href="#" onClick={() => setModoRecuperarSenha(false)}>Voltar para Login</a>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>Login</label>
              <input 
                type="text" 
                value={login} 
                onChange={(e) => setLogin(e.target.value)} 
                required 
              />

              <label>Senha</label>
              <input 
                type="password" 
                value={senha} 
                onChange={(e) => setSenha(e.target.value)} 
                required 
              />

              <div className="options">
                <label><input type="checkbox" /> Lembrar de mim</label>
                <a href="#" onClick={() => setModoRecuperarSenha(true)}>Esqueceu a senha?</a>
              </div>

              <div className="captcha-container">
                <ReCAPTCHA
                  sitekey="6Ld7viUrAAAAADaqvNmFbmk2414HsQo753cx73bU" 
                  onChange={handleCaptchaChange}
                />
              </div>

              <button type="submit" className="login-buttonn">Login</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

