import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import loadingStyle from "./customLoader.module.scss";

function CustomLoader() {
  return (
    <div className={loadingStyle.root}>
      <AiOutlineLoading3Quarters size={24} className={loadingStyle.loader} />
    </div>
  );
}

export default CustomLoader;
