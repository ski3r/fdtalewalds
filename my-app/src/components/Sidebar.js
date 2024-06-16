import React from 'react';
import './styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h1>Logga</h1>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li>Produktinfo</li>
          <li>Lagersaldoexport</li>
          <li>Försäljning</li>
          <li>Webbinfo</li>
        </ul>
      </div>
      <div className="sidebar-footer">
        <ul>
          <li>Inställningar</li>
          <li>Konto</li>
          <li>Hjälp</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;