import React from "react";

type GridComponentProps = {
  data: any[];
  columns: string[];
};

const GridComponent: React.FC<GridComponentProps> = ({ data, columns }) => {
  if (data.length === 0) {
    return <div>No data available to display.</div>;
  }

  return (
    <table className="data-grid">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column}>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GridComponent;
