import React from 'react';
import './styles/DataTable.css';

const DataTable = ({ items }) => {
  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            <th>Item Number</th>
            <th>Name</th>
            <th>Extra Field 7</th>
            <th>Extra Field 8</th>
            <th>Extra Field 9</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => {
            const extraField7 = item.extraFields.find(field => field.extraFieldId === 7)?.value || 'N/A';
            const extraField8 = item.extraFields.find(field => field.extraFieldId === 8)?.value || 'N/A';
            const extraField9 = item.extraFields.find(field => field.extraFieldId === 9)?.value || 'N/A';
            return (
              <tr key={item.id}>
                <td>{item.itemNumber}</td>
                <td>{item.name}</td>
                <td>{extraField7}</td>
                <td>{extraField8}</td>
                <td>{extraField9}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
