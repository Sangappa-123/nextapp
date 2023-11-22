"use client";
import React, { useState } from "react";
import TabsButtonStyle from "./TabsButtonComponent.module.scss";
import clsx from "clsx";

type Tab = {
  name: string;
  content: React.ReactNode;
  className?: string;
};

type TabsProps = {
  tabData: Tab[];
  showBorders?: boolean;
  data: object;
  dataType: string | undefined;
};

const TabsButtonComponent = ({
  tabData,
  showBorders = true, // data,
} // dataType,
: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  // useEffect(() => {
  //   if (dataType === "notification") {
  //     console.log("notification:::::::::", data);
  //   }
  // }, []);

  return (
    <div className={TabsButtonStyle.tabWidth}>
      <div className="col-md-12 col-sm-12 col-xs-12">
        <div
          className={clsx(
            TabsButtonStyle.tabList,
            { [TabsButtonStyle.withBorders]: showBorders },
            { [TabsButtonStyle.withoutBorders]: !showBorders }
          )}
        >
          {tabData.map((tab, index) => (
            <div
              key={index}
              className={clsx(
                TabsButtonStyle.tab,
                { [TabsButtonStyle.active]: activeTab === index },
                tab.className
              )}
              onClick={() => handleTabClick(index)}
            >
              {tab.name}
            </div>
          ))}
        </div>
        <div className={TabsButtonStyle.tabContent}>{tabData[activeTab].content}</div>
      </div>
    </div>
  );
};

export default TabsButtonComponent;
