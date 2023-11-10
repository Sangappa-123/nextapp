import TabsButtonComponent from "@/components/common/TabsButtonComponent";
import AlertComponent1 from "@/components/AlertComponent1";
import TabsStyle from "./TabsButton.module.scss";

const tabData = [
  { name: "Tab 1", content: <AlertComponent1 />, className: TabsStyle.tab1 },
  { name: "Tab 2", content: "ddddd", className: TabsStyle.tab2 },
  { name: "Tab 2", content: "ddddd", className: TabsStyle.tab2 },
  { name: "Tab 2", content: "ddddd", className: TabsStyle.tab2 },
];

const TabsButton = () => {
  return (
    <div>
      <TabsButtonComponent tabData={tabData} showBorders={false} />
    </div>
  );
};

export default TabsButton;
