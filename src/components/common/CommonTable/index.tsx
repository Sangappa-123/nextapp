import React from "react";
import CommonTableStyle from "./CommonTable.module.scss";

interface CommonTableProps {
  columns: string[];
  data: { [key: string]: any }[];
}

const CommonTable: React.FC<CommonTableProps> = ({ columns, data }) => {
  return (
    <table className={CommonTableStyle.tableStyle}>
      <thead className={CommonTableStyle.theadtyle}>
        <tr className={CommonTableStyle.trStyle}>
          {columns.map((column, index) => (
            <th key={index} className={CommonTableStyle.thStyle}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={CommonTableStyle.tBodyStyle}>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex} className={CommonTableStyle.tdStyle}>
                {row[column]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CommonTable;
