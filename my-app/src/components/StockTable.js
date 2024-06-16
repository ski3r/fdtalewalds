import React from 'react';
import './styles/StockTable.css';

const StockTable = ({ stockData }) => {
  return (
    <table className="stock-table">
      <thead>
        <tr>
          <th>Item Number</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {stockData.map((stock, index) => (
          <tr key={index}>
            <td>{stock.itemNumber}</td>
            <td>{stock.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StockTable;
