"use client";
import TabsButtonComponent from "@/components/common/TabsButtonComponent";
import cvStyle from "./content-evaluation.module.scss";
import CoverageSummaryList from "./CoverageSummaryList/CoverageSummaryList";
import DetailedInventoryList from "./DetailedInventoryList/DetailedInventoryList";
import PolicyholderPayouts from "./PolicyholderPayouts/PolicyholderPayouts";

const ContentsEvaluationContentTopButtonsComponent: React.FC<propTypes> = () => {
  const tabsArray = [
    {
      name: "Detailed Inventory",
      content: <DetailedInventoryList />,
    },
    {
      name: "Coverage Summary",
      content: <CoverageSummaryList />,
    },
    {
      name: "Policyholder Payouts",
      content: <PolicyholderPayouts />,
    },
  ];

  return (
    <div className={cvStyle.TabContainer}>
      <TabsButtonComponent tabData={tabsArray} />
    </div>
  );
};

export default ContentsEvaluationContentTopButtonsComponent;
