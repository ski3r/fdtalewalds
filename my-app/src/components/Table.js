import React from 'react';
import './styles/Table.css';

const Table = ({ items }) => {
  const getExtraFieldValue = (extraFields, fieldId) => {
    const field = extraFields.find(field => field.extraFieldId === fieldId);
    return field ? field.value : 'N/A';
  };

  return (
    <table className="table">
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
        {items.map((item, index) => (
          <tr key={index}>
            <td>{item.itemNumber}</td>
            <td>{item.name}</td>
            <td>{getExtraFieldValue(item.extraFields, 7)}</td>
            <td>{getExtraFieldValue(item.extraFields, 8)}</td>
            <td>{getExtraFieldValue(item.extraFields, 9)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
