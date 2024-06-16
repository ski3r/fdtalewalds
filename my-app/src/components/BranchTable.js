import React from 'react';
import './styles/BranchTable.css';

const BranchTable = ({ organizedResults }) => {
  const rowKeys = Object.keys(organizedResults);
  const colKeys = Array.from(new Set(rowKeys.flatMap(rowKey => Object.keys(organizedResults[rowKey]))));

  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          {colKeys.map((colKey, index) => (
            <th key={index}>{colKey}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowKeys.map((rowKey, rowIndex) => (
          <tr key={rowIndex}>
            <td>{rowKey}</td>
            {colKeys.map((colKey, colIndex) => (
              <td key={colIndex}>
                {organizedResults[rowKey][colKey] || 'N/A'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BranchTable;
