import GenericComponentHeading from "@/components/common/GenericComponentHeading/index";
import React from "react";
import Link from "next/link";
import CoverageSummaryTable from "./CoverageSummaryTable/CoverageSummaryTable";
import CoverageSummaryListStyle from "./CoverageSummaryList.module.scss";
import { exportCoverageSummaryToPDF } from "../DetailedInventoryList/DetailedInventoryFucn";
import { addNotification } from "@/reducers/Notification/NotificationSlice";
import { useAppDispatch } from "@/hooks/reduxCustomHook";

function CoverageSummaryList() {
  const dispatch = useAppDispatch();
  const claimNumber = sessionStorage.getItem("claimNumber") || "";

  return (
    <div className={CoverageSummaryListStyle.tabContent}>
      <div
        onClick={async () => {
          const status = await exportCoverageSummaryToPDF(claimNumber);
          if (status === "success") {
            dispatch(
              addNotification({
                message: "Successfully download the PDF!",
                id: "good",
                status: "success",
              })
            );
          } else if (status === "error") {
            dispatch(
              addNotification({
                message: "Failed download the PDF!. Please try again..",
                id: "good",
                status: "error",
              })
            );
          }
        }}
        className={CoverageSummaryListStyle.link}
      >
        <Link href="#">Export to PDF</Link>
      </div>
      <div>
        <div className={CoverageSummaryListStyle.CoverageSummaryTableScrollContainer}>
          <div
            className={`${CoverageSummaryListStyle.coverageSummaryListHeaderContainer} mt-4`}
          >
            <GenericComponentHeading
              title="Coverage Summary"
              customHeadingClassname={CoverageSummaryListStyle.coverageSummaryListHeader}
            />
          </div>
          <CoverageSummaryTable />
        </div>
      </div>
    </div>
  );
}

export default CoverageSummaryList;
