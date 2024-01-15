import React from "react";

import ReceiptsMapperComponent from "@/components/ReceiptsMapperComponent";

async function ReceiptMapperContainer({ claimId }: { claimId: string }) {
  return (
    <div>
      <ReceiptsMapperComponent claimId={claimId} />
    </div>
  );
}

export default ReceiptMapperContainer;
