import AdjusterPropertyClaimDetailComponent from "@/components/AdjusterPropertyClaimDetailComponent";

function AdjusterPropertyClaimDetailContainer({ claimId }: { claimId: string }) {
  return (
    <>
      <AdjusterPropertyClaimDetailComponent claimId={claimId} />
    </>
  );
}
export default AdjusterPropertyClaimDetailContainer;
