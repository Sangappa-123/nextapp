import React from "react";
import { useAppSelector } from "@/hooks/reduxCustomHook";
import LineItemDetailComponentForm from "./LineItemDetailComponent";

function LineItemDetailComponent() {
  const lineItem = useAppSelector((state) => state?.lineItemDetail?.lineItem);
  if (!lineItem) {
    return null;
  }
  return <LineItemDetailComponentForm />;
}

export default LineItemDetailComponent;
