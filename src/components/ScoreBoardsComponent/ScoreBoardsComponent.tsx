import TabsButtonComponent from "@/components/common/TabsButtonComponent";
import { sampleNewClaims } from "@/services/sampleNotifications";
import TabsStyle from "./ScoreBoardsComponent.module.scss";
import ThisMonthScoreBoard from "./ThisMonthScoreBoard";
import ThisYearScoreBoard from "./ThisYearScoreBoard";
import { sampleNewClaimsThisQuater } from "@/services/sampleNotifications";
import { sampleNewClaimsThisYear } from "@/services/sampleNotifications";
import ThisQuaterScoreBoard from "./ThisQuaterScoreBoard";

const tabData = [
  {
    name: "This Month",
    content: (
      <ThisMonthScoreBoard
        newClaims={sampleNewClaims.data.newClaims}
        closedClaims={sampleNewClaims.data.closedClaims}
        avgClosingClaim={sampleNewClaims.data.avgClosingClaim}
      />
    ),
    className: TabsStyle.tab1,
  },
  {
    name: "This Quater(Oct-Dec)",
    content: (
      <ThisQuaterScoreBoard
        newClaims={sampleNewClaimsThisQuater.data.newClaims}
        closedClaims={sampleNewClaimsThisQuater.data.closedClaims}
        avgClosingClaim={sampleNewClaimsThisQuater.data.avgClosingClaim}
      />
    ),
    className: TabsStyle.tab2,
  },
  {
    name: "This Year(2023)",
    content: (
      <ThisYearScoreBoard
        newClaims={sampleNewClaimsThisYear.data.newClaims}
        closedClaims={sampleNewClaimsThisYear.data.closedClaims}
        avgClosingClaim={sampleNewClaimsThisYear.data.avgClosingClaim}
      />
    ),
    className: TabsStyle.tab2,
  },
];

const ScoreBoardsComponent = () => {
  return (
    <div>
      <TabsButtonComponent tabData={tabData} showBorders={true} />
    </div>
  );
};

export default ScoreBoardsComponent;
