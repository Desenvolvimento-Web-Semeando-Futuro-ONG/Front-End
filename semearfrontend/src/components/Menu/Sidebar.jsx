import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiSettings, FiLogOut, FiMenu } from 'react-icons/fi';
import './styles.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Home', icon: <FiHome />, path: '/home' },
    { name: 'Voluntários', icon: <FiUsers />, path: '/voluntarios' },
  ];

  const bottomItems = [
    { name: 'Configurações', icon: <FiSettings />, path: '/settings' },
    { name: 'Sair', icon: <FiLogOut />, path: '/logout' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button className="hamburger-button" onClick={() => setIsOpen(!isOpen)}>
          <FiMenu />
        </button>
      </div>

      <div className="sidebar-content">
        <div className="menu-items">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`icon-button ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => handleNavigate(item.path)}
            >
              <div className={`icon-circle ${location.pathname === item.path ? 'selected' : ''}`}>
                {item.icon}
              </div>
              {isOpen && <span>{item.name}</span>}
            </button>
          ))}
        </div>

        <div className="sidebar-bottom">
          {isOpen && <span className="config-title">CONFIGURAÇÃO</span>}
          {bottomItems.map((item) => (
            <button
              key={item.name}
              className={`icon-button ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => handleNavigate(item.path)}
            >
              <div className={`icon-circle ${location.pathname === item.path ? 'selected' : ''}`}>
                {item.icon}
              </div>
              {isOpen && (
                <span className={item.name === 'Sair' ? 'logout-text' : ''}>{item.name}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
