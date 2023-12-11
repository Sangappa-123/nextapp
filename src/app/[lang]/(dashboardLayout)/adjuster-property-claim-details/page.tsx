import AdjusterPropertyClaimDetailContainer from "@/container/AdjusterPropertyClaimDetailContainer";
import { Suspense } from "react";
import Loading from "../../loading";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <AdjusterPropertyClaimDetailContainer />
    </Suspense>
  );
}
