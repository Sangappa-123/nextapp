import GenericComponentHeading from "@/components/common/GenericComponentHeading/index";
import React from "react";
import Link from "../../../../../node_modules/next/link";
import CoverageSummaryTable from "./CoverageSummaryTable/CoverageSummaryTable";
import CoverageSummaryListStyle from "./CoverageSummaryList.module.scss";
import { exportCoverageSummaryToPDF } from "../DetailedInventoryList/DetailedInventoryFucn";

function CoverageSummaryList() {
  const claimNumber = sessionStorage.getItem("claimNumber") || "";

  return (
    <div className={CoverageSummaryListStyle.tabContent}>
      <div
        onClick={() => exportCoverageSummaryToPDF(claimNumber)}
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
