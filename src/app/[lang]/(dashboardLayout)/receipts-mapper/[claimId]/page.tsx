import React from "react";
import ReceiptMapperContainer from "@/container/ReceiptMapperContainer";

function ReceiptMapper({ params }: { params: {  claimId: string } }) {
  const {  claimId } = params;
  return <ReceiptMapperContainer claimId={claimId} />;
  
}

export default ReceiptMapper;
