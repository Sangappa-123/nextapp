import TabsButtonComponent from "@/components/common/TabsButtonComponent";
import ScoreBoardsTableCards from "@/components/ScoreBoardsTableCards";
import TabsStyle from "./TabButtonScoreBoard.module.scss";

const tabData = [
  { name: "This Month", content: <ScoreBoardsTableCards />, className: TabsStyle.tab1 },
  { name: "This Quater(Oct-Dec)", content: "ddddd", className: TabsStyle.tab2 },
  { name: "This Year", content: "ddddd", className: TabsStyle.tab2 },
];

const TabsButtonScoreBoard = () => {
  return (
    <div>
      <TabsButtonComponent tabData={tabData} showBorders={true} />
    </div>
  );
};

export default TabsButtonScoreBoard;
