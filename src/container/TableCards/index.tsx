import React from "react";
import CommonTable from "@/components/common/CommonTable";

const TableCards: React.FC = () => {
  const columns = ["Date", "Claim Details", "Message"];
  const data = [
    { Date: "2023-11-10", "Claim Details": "Avinash KUmar", Message: "Message 1" },
    { Date: "2023-11-11", "Claim Details": "John Doe", Message: "Message 2" },
    { Date: "2023-11-11", "Claim Details": "John Doe", Message: "Message 2" },
    { Date: "2023-11-11", "Claim Details": "John Doe", Message: "Message 2" },
    { Date: "2023-11-11", "Claim Details": "John Doe", Message: "Message 2" },
    { Date: "2023-11-11", "Claim Details": "John Doe", Message: "Message 2" },
    { Date: "2023-11-11", "Claim Details": "John Doe", Message: "Message 2" },
    { Date: "2023-11-11", "Claim Details": "John Doe", Message: "Message 2" },
    { Date: "2023-11-11", "Claim Details": "John Doe", Message: "Message 2" },
  ];

  return (
    <div>
      <CommonTable columns={columns} data={data} />
    </div>
  );
};

export default TableCards;
