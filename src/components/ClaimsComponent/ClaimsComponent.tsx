import React from "react";
import Cards from "../common/Cards";
import ClaimsStyle from "./ClaimsComponent.module.scss";
import ClaimsAllViewButton from "./ClaimsAllViewButton";

const ClaimsComponent: React.FC = () => {
  return (
    <div>
      <Cards className={ClaimsStyle.cardsStylAdjustCalims}>
        <div className="row mt-2">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <h5>EVLINS19THMAY...</h5>
            <div className="mt-2">
              <h6>Howell,Melisa</h6>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 mt-2 mt-md-0">
            <h5>
              <span className={ClaimsStyle.dueStyle}>187</span> days
            </h5>
            <div className="mt-2">
              <h6>Over Due</h6>
            </div>
          </div>
          <div className="col-lg-2 col-md-12 col-sm-12 mt-2 mt-lg-0">
            <span className={ClaimsStyle.dueStyle}>
              <h5>1099</h5>
            </span>
            <div className="mt-2">
              <h6>items</h6>
            </div>
          </div>
        </div>
      </Cards>
      <ClaimsAllViewButton />
    </div>
  );
};

export default ClaimsComponent;
