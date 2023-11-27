import React from "react";
import Cards from "@/components/common/Cards";
import ScoreCardsStyle from "./scoreCard.module.scss";
import CustomLoader from "@/components/common/CustomLoader";

interface ScoreCardProps {
  newClaims: number;
  closedClaims: number;
  avgClosingClaim: string;
  isLoading: boolean;
}

const ScoreCardComponent: React.FC<ScoreCardProps> = ({
  newClaims,
  closedClaims,
  avgClosingClaim,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className={ScoreCardsStyle.loaderContainer}>
        <CustomLoader loaderType="spinner2" />
      </div>
    );
  }
  return (
    <div className="row p-3">
      <div className="col-md-4 col-sm-4 col-xs-4">
        <Cards className={ScoreCardsStyle.scoreWidthMonth}>
          <div className={ScoreCardsStyle.alignText}>
            <p>{newClaims}</p>
            <div className="mt-2">
              <h6>New claims</h6>
            </div>
          </div>
        </Cards>
      </div>
      <div className="col-md-4 col-sm-4 col-xs-4">
        <Cards className={ScoreCardsStyle.scoreWidthMonth}>
          <p>{closedClaims}</p>
          <div className="mt-2">
            <h6>Closed claims</h6>
          </div>
        </Cards>
      </div>
      <div className="col-md-4 col-sm-4 col-xs-4">
        <Cards className={ScoreCardsStyle.scoreWidthMonth}>
          <p>{avgClosingClaim}</p>
          <div className="mt-2">
            <h6>Avg. Closing Time</h6>
          </div>
        </Cards>
      </div>
    </div>
  );
};

export default ScoreCardComponent;
