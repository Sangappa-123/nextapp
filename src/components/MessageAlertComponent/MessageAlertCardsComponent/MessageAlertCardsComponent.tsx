import React from "react";
import CommonTable from "@/components/common/CommonTable";

const MessageAlertCardsComponent = () => {
  const columns = ["Date", "Claim Details", "Message"];
  const tableData = [
    {
      Date: "",
      "Claim Details": "No Message Found",
      Message: "",
    },
  ];
  return (
    <div>
      <CommonTable columns={columns} data={tableData} />
    </div>
  );
};

export default MessageAlertCardsComponent;
