"use client";
import React from "react";
import { useAppSelector } from "@/hooks/reduxCustomHook";
import CustomLoader from "@/components/common/CustomLoader";
import useDashboardAlert from "@/hooks/useDashboardAlert";
import AlertTableCards from "@/components/common/AlertCards/AlertTableCards";

function DashboardNotification({ data }) {
  const { loaded } = useDashboardAlert(data);
  const columns = ["Date", "Claim Details", "Message"];
  const notifications = useAppSelector((state) => state.alert.notifications);

  const tableData = notifications.map((notification) => ({
    Date: notification.createDate,
    Message: (
      <>
        {notification.notificationParams.message1}
        <br />
        {notification.messageTemplate}
      </>
    ),
    "Claim Details": (
      <>
        {notification.insuredDetails.firstName} {notification.insuredDetails.lastName}
        <br />
        {notification.notificationParams.claimNumber}
      </>
    ),
  }));

  if (!loaded) {
    return <CustomLoader loaderType="spinner2" />;
  }
  return <AlertTableCards columns={columns} tableData={tableData} />;
}

export default DashboardNotification;
