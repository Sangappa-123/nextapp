import React from "react";
import GenericComponentHeading from "../../common/GenericComponentHeading";
import ClaimsComponent from "@/components/ClaimsComponent";
import { cookies } from "next/headers";
import { getImmediateClaims } from "@/services/AdjusterDashboardService";

const ClaimsCards: React.FC = async () => {
  const cookieStore = cookies();
  let userId;
  let resp;
  if (cookieStore.has("userId")) {
    userId = cookieStore.get("userId")?.value ?? "";
  }
  try {
    resp = await getImmediateClaims(userId);
    console.log("resp", resp);
  } catch (error) {
    console.log("getImmediateClaims API error::", error);
  }
  const respData = resp?.data;
  if (resp?.status === 200) {
    return (
      <>
        <GenericComponentHeading
          title={`Claims Needing Attention (${respData.totalClaims})`}
        />
        <ClaimsComponent claim={respData?.claims[0]} />
      </>
    );
  }
};

export default ClaimsCards;
