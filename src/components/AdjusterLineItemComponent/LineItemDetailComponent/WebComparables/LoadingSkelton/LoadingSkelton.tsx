import React from "react";
import loadingSkeltonStyle from "./loadingSkelton.module.scss";
import clsx from "clsx";
import Image from "next/image";
import loadingImg from "@/assets/images/dummyimage.png";

function LoadingSkelton() {
  const CardLoading = (
    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 d-flex">
      <div
        className={clsx(
          "col-md-2 col-sm-2 col-lg-2 m-0 me-1",
          loadingSkeltonStyle.loading,
          loadingSkeltonStyle.card__title
        )}
      ></div>
      <div
        className={clsx(
          "col-md-4 col-lg-4 col-sm-4 col-xs-12 m-0 me-4",
          loadingSkeltonStyle.loading,
          loadingSkeltonStyle.card__title
        )}
      ></div>
      <div
        className={clsx(
          "col-md-6 col-lg-6 col-sm-6 col-xs-12 m-0 me-0",
          loadingSkeltonStyle.loading,
          loadingSkeltonStyle.card__title
        )}
        style={{ backgroundColor: "#d7e5f1" }}
      ></div>
    </div>
  );

  return (
    <div className={clsx(loadingSkeltonStyle.root, "row")}>
      <div
        className={clsx(
          "col-md-4 col-lg-2 col-sm-3 me-3",
          loadingSkeltonStyle.card__image,
          loadingSkeltonStyle.loading
        )}
      >
        <Image src={loadingImg} className="ImageComparable" alt="image" fill={true} />
      </div>
      <div className="col-md-8 col-lg-10 col-sm-9 d-flex flex-column justify-content-between">
        {CardLoading}
        {CardLoading}
        {CardLoading}
      </div>
    </div>
  );
}

export default LoadingSkelton;
