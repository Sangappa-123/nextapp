import React from "react";
import Cards from "../common/Cards";
import ScoreCardsStyle from "./ScoreBoardsComponent.module.scss";

interface ScoreBoardsProps {
  newClaims: number;
  closedClaims: number;
  avgClosingClaim: string;
}

const ScoreBoardsComponent: React.FC<ScoreBoardsProps> = ({
  newClaims,
  closedClaims,
  avgClosingClaim,
}) => {
  return (
    <div className="row">
      <div className="col-md-4 col-sm-4 col-xs-4">
        <Cards className={ScoreCardsStyle.scoreWidth}>
          <p>{newClaims}</p>
          <h6>New claims</h6>
        </Cards>
      </div>
      <div className="col-md-4 col-sm-4 col-xs-4">
        <Cards className={ScoreCardsStyle.scoreWidth}>
          <p>{closedClaims}</p>
          <h6>Closed claims</h6>
        </Cards>
      </div>
      <div className="col-md-4 col-sm-4 col-xs-4">
        <Cards className={ScoreCardsStyle.scoreWidth}>
          <p>{avgClosingClaim}</p>
          <h6>Avg. Closing Time</h6>
        </Cards>
      </div>
    </div>
  );
};

export default ScoreBoardsComponent;
