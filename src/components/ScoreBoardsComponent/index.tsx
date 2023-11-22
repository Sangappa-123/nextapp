import React from "react";
import Cards from "../common/Cards";
import ScoreCardsStyle from "./ScoreBoardsComponent.module.scss";

const ScoreBoardsComponent = () => {
  return (
    <div className="row">
      <div className="col-md-4 col-sm-4 col-xs-4">
        <Cards className={ScoreCardsStyle.scoreWidth}>
          <p>16</p>
          <h6>New claims</h6>
        </Cards>
      </div>
      <div className="col-md-4 col-sm-4 col-xs-4">
        <Cards className={ScoreCardsStyle.scoreWidth}>
          <p>0</p>
          <h6>Closed claims</h6>
        </Cards>
      </div>
      <div className="col-md-4 col-sm-4 col-xs-4">
        <Cards className={ScoreCardsStyle.scoreWidth}>
          <p>0</p>
          <h6>Avg. Closing Time</h6>
        </Cards>
      </div>
    </div>
  );
};

export default ScoreBoardsComponent;
