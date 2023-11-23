import React from "react";
import GenericComponentHeading from "../GenericComponentHeading";
import PendingComponent from "@/components/PendingComponent";

const PendingVendorCards: React.FC = () => {
  return (
    <>
      <GenericComponentHeading title="Pending Vendor Invoices(34)" />
      <PendingComponent />
    </>
  );
};

export default PendingVendorCards;
