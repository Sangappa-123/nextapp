// DashboardComponent.tsx

import React from "react";
import securityLayoutStyle from "../common/Layouts/CommonSecurityLayout/commonSecurityLayout.module.scss";
import NavBarMenu from "../common/NavBarMenu";
import clsx from "clsx";
import Cards from "../common/Cards";
import CardsStyle from "./dashboard.module.scss";
import AlertCards from "../common/AlertCards";
import MyScoreBoardCards from "../common/MyScoreBoardCards";
import PendingVendorCards from "../common/PendingVendorCards";
import ClaimsCards from "../common/ClaimsCards";
import MenuBar from "@/container/MenuBar";

export default function DashboardComponent() {
  return (
    <div className={securityLayoutStyle.root}>
      <div className={securityLayoutStyle.container}>
        <div>
          <NavBarMenu />
        </div>
        <div>
          <MenuBar />
        </div>
        <div className="row">
          <div
            className={clsx({
              "col-md-6": true,
              "col-sm-12": true,
              "col-xs-12": true,
            })}
          >
            <Cards className={CardsStyle.cardsStylAdjustAlert}>
              <AlertCards />
            </Cards>
          </div>
          <div
            className={clsx({
              "col-md-6": true,
              "col-sm-12": true,
              "col-xs-12": true,
            })}
          >
            <Cards className={CardsStyle.cardsStylAdjustScore}>
              <MyScoreBoardCards />
            </Cards>
            <div className="row">
              <div
                className={clsx({
                  "col-md-6": true,
                  "col-sm-12": true,
                  "col-xs-12": true,
                })}
              >
                <Cards className={CardsStyle.cardsStylClaims}>
                  <ClaimsCards />
                </Cards>
              </div>
              <div
                className={clsx({
                  "col-md-6": true,
                  "col-sm-12": true,
                  "col-xs-12": true,
                })}
              >
                <Cards className={CardsStyle.cardsStylVendor}>
                  <PendingVendorCards />
                </Cards>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
