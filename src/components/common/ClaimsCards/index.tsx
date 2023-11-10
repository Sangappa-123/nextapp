import React from "react";
import GenericComponentHeading from "../GenericComponentHeading";
import ClaimsStyles from "./ClaimsCards.module.scss";
import Cards from "../Cards";

const ClaimsCards: React.FC = () => {
  return (
    <div>
      <GenericComponentHeading title="Claims Needing Attention(155)" />
      <Cards className={ClaimsStyles.cardsStylAdjustCalims}>{/* <p>5</p> */}</Cards>
    </div>
  );
};

export default ClaimsCards;
