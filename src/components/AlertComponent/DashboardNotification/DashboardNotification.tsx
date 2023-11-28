"use client";
import React from "react";
import { useAppSelector } from "@/hooks/reduxCustomHook";
import CustomLoader from "@/components/common/CustomLoader";
import useDashboardAlert from "@/hooks/useDashboardAlert";
import AlertTableCards from "@/components/common/AlertCards/AlertTableCards";
import alertComponentStyle from "../alertComponent.module.scss";

function DashboardNotification({ data }) {
  const { loaded } = useDashboardAlert(data);
  const columns = ["Date", "Claim Details", "Message"];
  const notifications = useAppSelector((state) => state.alert.notifications);

  const tableData = notifications.map((notification) => ({
    Date: notification?.createDate,
    Message: (
      <>
        {notification?.notificationParams?.message1}
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
  }));

  if (!loaded) {
    return (
      <div className={alertComponentStyle.container}>
        <CustomLoader loaderType="spinner2" />
      </div>
    );
  }
  return (
    <div className={alertComponentStyle.container}>
      <AlertTableCards columns={columns} tableData={tableData} />
    </div>
  );
}

export default DashboardNotification;
