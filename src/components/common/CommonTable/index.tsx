import React from "react";
import CommonTableStyle from "./CommonTable.module.scss";
import clsx from "clsx";

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
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr key={rowIndex} className={CommonTableStyle.trStyle}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className={CommonTableStyle.tdStyle}>
                  {row[column]}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={columns.length + 1}
              className={clsx(CommonTableStyle.tdStyle, CommonTableStyle["no-data"])}
            >
              No new messages available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CommonTable;
