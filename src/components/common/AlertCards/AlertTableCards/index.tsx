import React from "react";
import CommonTable from "@/components/common/CommonTable";
import TableCardsStyle from "./AlertTableCards.module.scss";

type propsType<T> = {
  tableData: T[];
  columns: string[];
};

const AlertTableCards = <T extends object>({ columns, tableData }: propsType<T>) => {
  return (
    <div className={TableCardsStyle.container}>
      <CommonTable columns={columns} data={tableData} />
    </div>
  );
};

export default AlertTableCards;
