"use client";
import TabsButtonComponent from "@/components/common/TabsButtonComponent";
import cvStyle from "./content-evaluation.module.scss";
// import { ConnectedProps, connect } from "react-redux";
// import { RootState } from "@/store/store";
import CoverageSummaryList from "./CoverageSummaryList/CoverageSummaryList";
import DetailedInventoryList from "./DetailedInventoryList/DetailedInventoryList";
import PolicyholderPayouts from "./PolicyholderPayouts/PolicyholderPayouts";
// import { useEffect } from "react";

const ContentsEvaluationContentTopButtonsComponent: React.FC<propTypes> = () => {
  // const claimNumber = sessionStorage.getItem("claimNumber") || "";

  // useEffect(() => {
  //   fetchCoverageSummaryAction({
  //     claimNum: claimNumber,
  //   })
  // }, [])

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

// const mapStateToProps = (state: RootState) => ({
// });

// const mapDispatchToProps = {
//   fetchCoverageSummaryAction
// };

// const connector = connect(mapStateToProps, mapDispatchToProps);
// type connectorType = ConnectedProps<typeof connector>;

// export default connector(ContentsEvaluationContentTopButtonsComponent);
export default ContentsEvaluationContentTopButtonsComponent;
