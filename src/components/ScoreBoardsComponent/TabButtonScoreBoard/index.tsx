import TabsButtonComponent from "@/components/common/TabsButtonComponent";
import ScoreBoardsComponent from "..";
import { sampleNewClaims } from "@/services/sampleNotifications";
import TabsStyle from "./TabButtonScoreBoard.module.scss";

const tabData = [
  {
    name: "This Month",
    content: (
      <ScoreBoardsComponent
        newClaims={sampleNewClaims.data.newClaims}
        closedClaims={sampleNewClaims.data.closedClaims}
        avgClosingClaim={sampleNewClaims.data.avgClosingClaim}
      />
    ),
    className: TabsStyle.tab1,
  },
  {
    name: "This Quater(Oct-Dec)",
    content: "sssss",
    // <ScoreBoardsComponent
    // />,
    className: TabsStyle.tab2,
  },
  { name: "This Year", content: "ddddd", className: TabsStyle.tab2 },
];

const TabsButtonScoreBoard = () => {
  return (
    <div>
      <TabsButtonComponent tabData={tabData} showBorders={true} data={{}} />
    </div>
  );
};

export default TabsButtonScoreBoard;
