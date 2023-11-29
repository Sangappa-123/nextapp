"use client";
import React from "react";
import { useAppSelector } from "@/hooks/reduxCustomHook";
import AlertTableCards from "@/components/common/AlertCards/AlertTableCards";
import alertComponentStyle from "../alertComponent.module.scss";

const MessageAlertCardsComponent = () => {
  const columns = ["Date", "Claim Details", "Message", "action"];
  const messages = useAppSelector((state) => state.alert.messages);
  const tableData = messages.map((message) => ({
    Date: message?.createDate,
    "Claim Details": (
      <>
        #{message?.notificationParams?.claimNumber}
        <br />
        {message?.insuredDetails?.firstName + ", " + message?.insuredDetails?.lastName}
      </>
    ),
    Message: (
      <>
        <b>
          New Message by {message?.sender?.lastName + ", " + message?.sender?.firstName}
        </b>
        <br />
        {message?.notificationParams?.message1 &&
          message?.notificationParams?.message1?.slice(0, 49) +
            (message?.notificationParams?.message1?.length > 50 ? "..." : "")}
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
