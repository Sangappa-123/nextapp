import PendingInvoicesComponent from "@/components/PendingInvoicesComponentV2";
import { unknownObjectType } from "@/constants/customTypes";
import { fetchPendingInvoice } from "@/services/ClaimService";
import React from "react";

async function PendingInvoicesContainer() {
  let initData: unknownObjectType | null = null;
  try {
    const res = await fetchPendingInvoice({
      userId: "14",
    });
    initData = res;
  } catch (error) {
    initData = null;
  }
  return <PendingInvoicesComponent initData={initData} />;
}

export default PendingInvoicesContainer;
