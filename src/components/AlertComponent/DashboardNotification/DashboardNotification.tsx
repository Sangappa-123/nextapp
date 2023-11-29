"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxCustomHook";
import CustomLoader from "@/components/common/CustomLoader";
import useDashboardAlert from "@/hooks/useDashboardAlert";
import AlertTableCards from "@/components/common/AlertCards/AlertTableCards";
import alertComponentStyle from "../alertComponent.module.scss";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmModal from "@/components/common/ConfirmModal";
import { removeAlertNotification } from "@/reducers/DashboardAlert/DashboardAlertSlice";
import { addNotification } from "@/reducers/Notification/NotificationSlice";
import { deleteNotification } from "@/services/ClaimService";

function DashboardNotification({ data }) {
  const dispatch = useAppDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { loaded } = useDashboardAlert(data);
  const columns = ["Date", "Claim Details", "Message", ""];
  const notifications = useAppSelector((state) => state.alert.notifications);
  const tableData = notifications.map((notification) => ({
    Date: notification?.createDate,
    Message: (
      <>
        <b>{notification?.notificationParams?.message1}</b>
        <br />
        {notification?.message}
      </>
    ),
    "Claim Details": (
      <>
        {notification?.insuredDetails?.firstName} {notification?.insuredDetails?.lastName}
        <br />
        {notification?.notificationParams?.claimNumber}
      </>
    ),
    "": (
      <div className={alertComponentStyle.deleteIconDiv}>
        <RiDeleteBin6Line
          onClick={() => {
            setShowConfirmation(true);
            setSelectedItem(notification?.id);
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
        dispatch(removeAlertNotification({ id: selectedItem, data }));
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

  if (!loaded) {
    return (
      <div className={alertComponentStyle.container}>
        <CustomLoader loaderType="spinner2" />
      </div>
    );
  }
  return (
    <div className={alertComponentStyle.container}>
      <ConfirmModal
        showConfirmation={showConfirmation}
        closeHandler={handleClose}
        submitHandler={handleDelete}
      />

      <AlertTableCards
        showConfirmation={showConfirmation}
        columns={columns}
        tableData={tableData}
      />
    </div>
  );
}

export default DashboardNotification;
