import AdjusterPropertyClaimDetailContainer from "@/container/AdjusterPropertyClaimDetailContainer";
import { Suspense } from "react";
import Loading from "../../../loading";

export default function Page({ params }: { params: { claimId: string } }) {
  return (
    <Suspense fallback={<Loading />}>
      <AdjusterPropertyClaimDetailContainer claimId={params.claimId} />
    </Suspense>
  );
}
