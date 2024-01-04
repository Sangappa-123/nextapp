import GenericComponentHeading from "@/components/common/GenericComponentHeading/index";
import React from "react";
import Link from "../../../../../node_modules/next/link";
import CoverageSummaryTable from "./CoverageSummaryTable/CoverageSummaryTable";
import CoverageSummaryListStyle from "./CoverageSummaryList.module.scss";
import { exportCoverageSummaryToPDF } from "../DetailedInventoryList/DetailedInventoryFucn";
import { toast } from "react-toastify";

function CoverageSummaryList() {
  const claimNumber = sessionStorage.getItem("claimNumber") || "";

  return (
    <div className={CoverageSummaryListStyle.tabContent}>
      <div
        onClick={async () => {
          const status = await exportCoverageSummaryToPDF(claimNumber);
          if (status === "success") {
            toast.success("Successfully download the PDF!");
          } else if (status === "error") {
            toast.error("Failed download the PDF!");
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
