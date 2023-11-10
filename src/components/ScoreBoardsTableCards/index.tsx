import React from "react";
import Cards from "../common/Cards";
import clsx from "clsx";
import ScoreCardsStyle from "./ScoreBoardsTableCards.module.scss";

const ScoreBoardsTableCards = () => {
  return (
    <div className="row">
      <div
        className={clsx({
          // [TabsButtonStyle.tabList]: true,
          "col-md-4": true,
          "col-sm-4": true,
          "col-xs-4": true,
        })}
      >
        <Cards className={ScoreCardsStyle.scoreWidth}>
          <p>16</p>
          <h6>New claims</h6>
        </Cards>
      </div>
      <div
        className={clsx({
          // [TabsButtonStyle.tabList]: true,
          "col-md-4": true,
          "col-sm-4": true,
          "col-xs-4": true,
        })}
      >
        <Cards className={ScoreCardsStyle.scoreWidth}>
          <p>0</p>
          <h6>Closed claims</h6>
        </Cards>
      </div>
      <div
        className={clsx({
          // [TabsButtonStyle.tabList]: true,
          "col-md-4": true,
          "col-sm-4": true,
          "col-xs-4": true,
        })}
      >
        <Cards className={ScoreCardsStyle.scoreWidth}>
          <p>0</p>
          <h6>Avg. Closing Time</h6>
        </Cards>
      </div>
    </div>
  );
};

export default ScoreBoardsTableCards;
