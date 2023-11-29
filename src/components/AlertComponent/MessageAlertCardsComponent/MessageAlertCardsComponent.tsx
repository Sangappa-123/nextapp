"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxCustomHook";
import AlertTableCards from "@/components/common/AlertCards/AlertTableCards";
import alertComponentStyle from "../alertComponent.module.scss";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmModal from "@/components/common/ConfirmModal";
import { deleteNotification } from "@/services/ClaimService";
import { removeAlertMessage } from "@/reducers/DashboardAlert/DashboardAlertSlice";
import { addNotification } from "@/reducers/Notification/NotificationSlice";

const MessageAlertCardsComponent = () => {
  const dispatch = useAppDispatch();
  const columns = ["Date", "Claim Details", "Message", ""];
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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
    "": (
      <div className={alertComponentStyle.deleteIconDiv}>
        <RiDeleteBin6Line
          onClick={() => {
            setShowConfirmation(true);
            setSelectedItem(message?.id);
          }}
          size="18"
          className={alertComponentStyle.deleteIcon}
        />
      </div>
    ),
  }));

  const handleClose = () => {
    setSelectedItem(null);
    setShowConfirmation(false);
  };

  const handleDelete = () => {
    deleteNotification({ id: selectedItem, page: 1 })
      .then((res) => {
        const { data } = res;
        dispatch(removeAlertMessage({ id: selectedItem, data }));
        dispatch(
          addNotification({
            message: data?.message ?? "Notification Deleted.",
            id: selectedItem,
          })
        );
      })
      .catch((err) => {
        console.log("Delete notification error:", err);
        dispatch(
          addNotification({
            message: "Something went wrong.",
            id: selectedItem,
            status: "error",
          })
        );
      })
      .finally(() => {
        handleClose();
      });
  };

  return (
    <div className={alertComponentStyle.container}>
      <ConfirmModal
        showConfirmation={showConfirmation}
        closeHandler={handleClose}
        submitHandler={handleDelete}
      />
      <AlertTableCards
        showConfirmation={showConfirmation}
        tableData={tableData}
        columns={columns}
      />
    </div>
  );
};

export default MessageAlertCardsComponent;
