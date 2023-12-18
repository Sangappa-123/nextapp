import AdjusterPropertyClaimDetailComponent from "@/components/AdjusterPropertyClaimDetailComponent";
import { claimContentList } from "@/services/ClaimContentListService";
import { serviceRequestList } from "@/services/ClaimServiceRequestListService";
interface propsTypes {
  claimId: string;
}
const AdjusterPropertyClaimDetailContainer: React.FC<propsTypes> = async ({
  claimId,
}) => {
  const payload = {
    claimId: claimId,
  };
  const claimContentListRes: any = await claimContentList(payload);
  const serviceRequestListRes: any = await serviceRequestList(payload);
  return (
    <>
      <AdjusterPropertyClaimDetailComponent
        claimId={claimId}
        claimContentListRes={claimContentListRes}
        serviceRequestListRes={serviceRequestListRes}
      />
    </>
  );
};
export default AdjusterPropertyClaimDetailContainer;
