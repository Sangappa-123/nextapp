import UrgentClaimTableComponent from "@/components/UrgentClaimTableComponent";
import { unknownObjectType } from "@/constants/customTypes";
import { fetchUrgentClaimList } from "@/services/ClaimService";
import React from "react";

async function UrgentClaimContainer() {
  let initData: unknownObjectType | null = null;
  try {
    const res = await fetchUrgentClaimList({
      userId: "14",
    });
    initData = res;
  } catch (error) {
    initData = null;
  }
  return <UrgentClaimTableComponent initData={initData} />;
}

export default UrgentClaimContainer;
