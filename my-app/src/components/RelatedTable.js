import React from 'react';
import './styles/RelatedTable.css';

const RelatedTable = ({ stocks }) => {
  const branches = [...new Set(stocks.map(stock => stock.branchName))];

  const getRows = (branchName) => {
    const branchStocks = stocks.filter(stock => stock.branchName === branchName);
    const extraField8Values = [...new Set(branchStocks.map(stock => stock.extraField8))];
    const extraField9Values = [...new Set(branchStocks.map(stock => stock.extraField9))];

    return extraField8Values.map(field8 => {
      const row = { field8 };
      extraField9Values.forEach(field9 => {
        const stock = branchStocks.find(stock => stock.extraField8 === field8 && stock.extraField9 === field9);
        row[field9] = stock ? stock.quantity : 'N/A';
      });
      return row;
    });
  };

  return (
    <div className="related-tables">
      {branches.map(branch => (
        <div key={branch} className="branch-table">
          <h3>{branch}</h3>
          <table>
            <thead>
              <tr>
                <th>Extra Field 8</th>
                {[...new Set(stocks.map(stock => stock.extraField9))].map(field9 => (
                  <th key={field9}>{field9}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {getRows(branch).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{row.field8}</td>
                  {[...new Set(stocks.map(stock => stock.extraField9))].map(field9 => (
                    <td key={field9}>{row[field9]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default RelatedTable;
