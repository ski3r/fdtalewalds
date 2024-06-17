import React from 'react';
import './styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h1>ALEWALDS</h1>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li>Produktinformation</li>
          <li>Lagersaldoexport</li>
          <li>Prisexport</li>
          <li>Webbinformation</li>
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