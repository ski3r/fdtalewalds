import React from 'react';
import Table from './Table';
import BranchTable from './BranchTable';
import './styles/Dashboard.css';

const Dashboard = ({ items, organizedResults }) => {
  return (
    <div className="dashboard-content">
      <h2>Dashboard</h2>
      {items.length > 0 ? (
        <Table items={items} />
      ) : (
        <div>No items found</div>
      )}
      {Object.keys(organizedResults).length > 0 && (
        Object.keys(organizedResults).map((branch, index) => (
          <div key={index}>
            <h2>{branch}</h2>
            <BranchTable organizedResults={organizedResults[branch]} />
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
