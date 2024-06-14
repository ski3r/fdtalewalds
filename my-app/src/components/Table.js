import React from 'react';
import './styles/Table.css';

const Table = ({ items }) => {
  // Extrahera unika fältnamn från extraFields
  const extraFieldNames = new Set();
  items.forEach(item => {
    if (item.extraFields) {
      item.extraFields.forEach(field => {
        extraFieldNames.add(field.extraFieldId);
      });
    }
  });

  // Skapa en lista över alla kolumnrubriker
  const headers = items.length > 0 ? Object.keys(items[0]) : [];
  const allHeaders = [...headers, ...Array.from(extraFieldNames)];

  return (
    <table className="table">
      <thead>
        <tr>
          {allHeaders.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            {headers.map((header, idx) => (
              <td key={idx}>
                {item[header] != null ? item[header].toString() : 'N/A'}
              </td>
            ))}
            {Array.from(extraFieldNames).map((fieldId, idx) => {
              const extraField = item.extraFields.find(field => field.extraFieldId === fieldId);
              return (
                <td key={idx}>
                  {extraField ? extraField.value : 'N/A'}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
