import React from "react";
import GenericComponentHeading from "../GenericComponentHeading";
import Cards from "../Cards";
import PendingStyles from "./PendingVendorCards.module.scss";

const PendingVendorCards: React.FC = () => {
  return (
    <div>
      <GenericComponentHeading title="Pending Vendor Invoices(34)" />
      <Cards className={PendingStyles.cardsStylAdjustPending}></Cards>
    </div>
  );
};

export default PendingVendorCards;
