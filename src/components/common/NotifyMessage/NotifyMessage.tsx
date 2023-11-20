"use client";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./notifyMessgaeStyle.modules.scss";
import { useAppSelector } from "@/hooks/reduxCustomHook";

function NotifyMessage() {
  const notifySelector = useAppSelector((state) => state.notify);
  useEffect(() => {
    for (const notify of notifySelector) {
      // toast[notify?.status ?? "success"]
      toast[notify?.status ?? "success"](notify?.message, {
        toastId: notify?.id,
        position: notify.position ?? toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        className: notify.status ?? "success",
      });
    }
  }, [notifySelector]);
  return <ToastContainer />;
}
export default NotifyMessage;
