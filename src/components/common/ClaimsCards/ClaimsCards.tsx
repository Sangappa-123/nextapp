import React from "react";
import GenericComponentHeading from "../GenericComponentHeading";
import ClaimsComponent from "@/components/ClaimsComponent";

const ClaimsCards: React.FC = () => {
  return (
    <>
      <GenericComponentHeading title="Claims Needing Attention(155)" />
      <ClaimsComponent />
    </>
  );
};

export default ClaimsCards;
