import React from "react";
import Cards from "../common/Cards";
import ViewAllButtonPending from "./ViewAllButtonPending";
import PendingStyle from "./pendingComponenet.module.scss";

const PendingComponent: React.FC = () => {
  return (
    <div>
      <Cards className={PendingStyle.cardsStylAdjustCalims}>
        <div className=" row mt-2">
          <h6>Pay Artigem Contents $60.00 for claim #flow16112023 (Smith, Gracie)</h6>
        </div>
      </Cards>
      <ViewAllButtonPending />
    </div>
  );
};

export default PendingComponent;
