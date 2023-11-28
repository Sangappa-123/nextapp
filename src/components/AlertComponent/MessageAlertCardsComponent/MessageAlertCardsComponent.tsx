"use client";
import React from "react";
import { useAppSelector } from "@/hooks/reduxCustomHook";
import AlertTableCards from "@/components/common/AlertCards/AlertTableCards";
import alertComponentStyle from "../alertComponent.module.scss";

const MessageAlertCardsComponent = () => {
  const columns = ["Date", "Claim Details", "Message"];
  const messages = useAppSelector((state) => state.alert.messages);
  const tableData = messages.map((message) => ({
    Date: message?.createDate,
    Message: (
      <>
        {message?.notificationParams?.message1}
        <br />
        {message?.messageTemplate}
      </>
    ),
    "Claim Details": (
      <>
        {message?.insuredDetails?.firstName} {message?.insuredDetails?.lastName}
        <br />
        {message?.notificationParams?.claimNumber}
      </>
    ),
  }));
  return (
    <div className={alertComponentStyle.container}>
      <AlertTableCards tableData={tableData} columns={columns} />
    </div>
  );
};

export default MessageAlertCardsComponent;
