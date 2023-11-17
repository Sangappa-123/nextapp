"use client";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./notifyMessgaeStyle.modules.scss";

// toast.configure();
function NotifyMessage() {
  const notify = () => {
    toast.success("success", {
      position: toast.POSITION.TOP_CENTER,
      className: "success",
      // style: {
      //   backgroundColor: "#bbf0c9",
      //   fontWeight: "600",
      // },
    });
  };
  const notify1 = () => {
    toast.warning("Danger", {
      position: toast.POSITION.TOP_CENTER,
      className: "warning",
      // style: {
      //   backgroundColor: "#f5e1a2",
      //   fontWeight: "600",
      // },
    });
  };
  const notify2 = () => {
    toast.error("Error", {
      position: toast.POSITION.TOP_CENTER,
      className: "danger",
      // style: {
      //   backgroundColor: "#edadab",
      //   fontWeight: "600",
      // },
    });
  };
  return (
    <div>
      <button onClick={notify}>Click Me!</button>
      <br />
      <button onClick={notify1}>warning</button>
      <br />
      <button onClick={notify2}>error</button>

      <ToastContainer />
    </div>
  );
}
export default NotifyMessage;
