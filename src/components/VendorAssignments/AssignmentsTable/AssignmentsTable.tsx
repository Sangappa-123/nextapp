import React from "react";
import AssignmentsTableCss from "./AssignmentsTable.module.scss";
import clsx from "clsx";
import NoRecordComponent from "@/components/common/NoRecordComponent/index";

interface CommonTableProps {
  columns: string[];
  data: { [key: string]: any }[];
}

const AssignmentsTable: React.FC<CommonTableProps> = ({ columns, data }) => {
  return (
    <table className={AssignmentsTableCss.tableStyle}>
      <thead className={AssignmentsTableCss.theadtyle}>
        <tr className={AssignmentsTableCss.trStyle}>
          {columns.map((column, index) => (
            <th
              key={index}
              className={clsx(AssignmentsTableCss.thStyle, {
                [AssignmentsTableCss.actionHeadingCol]: !column,
              })}
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={AssignmentsTableCss.tBodyStyle}>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={clsx(AssignmentsTableCss.trStyle, {
                [AssignmentsTableCss.readMsg]: row?.isRead,
              })}
              onMouseOver={(e) => {
                e.currentTarget
                  .querySelector("[data-key='action']")
                  ?.classList?.add(AssignmentsTableCss.show);
              }}
              onMouseLeave={(e) => {
                e.currentTarget
                  .querySelector("[data-key='action']")
                  ?.classList?.remove(AssignmentsTableCss.show);
              }}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className={clsx(AssignmentsTableCss.tdStyle)}>
                  {column ? (
                    row[column]
                  ) : (
                    <span data-key="action" className={AssignmentsTableCss.actionIcon}>
                      {row[column]}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length + 1}>
              <NoRecordComponent message={"No Data found"} />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AssignmentsTable;
