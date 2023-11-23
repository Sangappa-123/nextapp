"use client";
import React from "react";
import CommonTable from "@/components/common/CommonTable";
import { useAppSelector } from "@/hooks/reduxCustomHook";

const MessageAlertCardsComponent = () => {
  const columns = ["Date", "Claim Details", "Message"];
  // const tableData = [
  //   {
  //     Date: "",
  //     "Claim Details": "No Message Found",
  //     Message: "",
  //   },
  // ];
  const messages = useAppSelector((state) => state.alert.messages);
  const tableData = messages.map((message) => ({
    Date: message.createDate,
    Message: (
      <>
        {message.notificationParams.message1}
        <br />
        {message.messageTemplate}
      </>
    ),
    "Claim Details": (
      <>
        {message.insuredDetails.firstName} {message.insuredDetails.lastName}
        <br />
        {message.notificationParams.claimNumber}
      </>
    ),
  }));
  return <CommonTable columns={columns} data={tableData} />;
};

export default MessageAlertCardsComponent;
