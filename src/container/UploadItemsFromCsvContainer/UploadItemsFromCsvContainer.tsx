import React from "react";
import UploadCsvContainerStyle from "./uploadItemsFromCsvContainer.module.scss";
import GenericBreadcrumb from "@/components/common/GenericBreadcrumb";
import UploadItemsFromCsvComponent from "@/components/UploadItemsFromCsvComponent";

const pathList = [
  {
    name: "Home",
    path: "/login",
  },
  {
    name: "CLM7DEC23",
    path: "/adjuster-property-claim-details",
    // active: true,
  },
  {
    name: "Upload Items",
    path: "/login",
    active: true,
  },
];

function UploadItemsFromCsvContainer() {
  return (
    <div className={UploadCsvContainerStyle.uploadContainer}>
      <GenericBreadcrumb dataList={pathList} />
      <div className="container-fluid p-0 pt-3">
        <div className="row m-0">
          <UploadItemsFromCsvComponent />
        </div>
      </div>
    </div>
  );
}

export default UploadItemsFromCsvContainer;
