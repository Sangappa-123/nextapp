import AdjusterPropertyClaimDetailComponent from "@/components/AdjusterPropertyClaimDetailComponent";
import { PAGINATION_LIMIT_10 } from "@/constants/constants";
import {
  getCategories,
  getClaimDetailMessageList,
  getPendingTaskList,
  getSubCategories,
} from "@/services/AdjusterPropertyClaimDetailService";
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
  const categoryListRes: any = await getCategories();
  const subcategoryListRes: any = await getSubCategories();
  const pendingTaskListRes: any = await getPendingTaskList(payload);
  const claimDetailMessageListRes: any = await getClaimDetailMessageList({
    pageNo: 1,
    recordPerPage: PAGINATION_LIMIT_10,
    claimId,
  });

  console.log("claimDetailMessageListRes", claimDetailMessageListRes);

  return (
    <>
      <AdjusterPropertyClaimDetailComponent
        claimId={claimId}
        claimContentListRes={claimContentListRes}
        serviceRequestListRes={serviceRequestListRes}
        categoryListRes={categoryListRes}
        subcategoryListRes={subcategoryListRes}
        pendingTaskListRes={pendingTaskListRes}
        claimDetailMessageListRes={claimDetailMessageListRes}
      />
    </>
  );
};
export default AdjusterPropertyClaimDetailContainer;
