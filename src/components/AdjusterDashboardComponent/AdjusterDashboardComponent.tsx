import React from "react";
import clsx from "clsx";
import Cards from "../common/Cards";
import CardsStyle from "./dashboard.module.scss";
import AlertCards from "../common/AlertCards";
import MyScoreBoardCards from "../common/MyScoreBoardCards";
import PendingVendorCards from "../common/PendingVendorCards";
import ClaimsCards from "../common/ClaimsCards";

export default function DashboardComponent() {
  return (
    <div className={CardsStyle.cardddd}>
      <div className="row">
        <div
          className={clsx({
            "col-lg-6": true,
            "col-md-12": true,
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
            "col-lg-6": true,
            "col-md-12": true,
            "col-sm-12": true,
            "col-xs-12": true,
          })}
        >
          <Cards className={CardsStyle.cardsStylAdjustScore}>
            <MyScoreBoardCards />
          </Cards>
          <div className={clsx("row", CardsStyle.cardsStylClaimsRow)}>
            <div
              className={clsx({
                "col-lg-6": true,
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
                "col-lg-6": true,
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
  );
}
