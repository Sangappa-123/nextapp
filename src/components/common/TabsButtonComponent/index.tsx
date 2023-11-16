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
};

const TabsButtonComponent = ({ tabData, showBorders = true }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className={TabsButtonStyle.tabWidth}>
      <div
        className={clsx({
          "col-md-12": true,
          "col-sm-12": true,
          "col-xs-12": true,
        })}
      >
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
