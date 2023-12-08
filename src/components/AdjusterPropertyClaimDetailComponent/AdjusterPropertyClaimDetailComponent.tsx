import ContentListComponent from "./ContentListComponent/ContentListComponent";
import ServiceRequestsComponent from "./ServiceRequestsComponent/ServiceRequestsComponent";
import { cookies } from "next/headers";
import { claimContentList } from "@/services/ClaimContentListService";
import { serviceRequestList } from "@/services/ClaimServiceRequestListService";
import CustomLoader from "../common/CustomLoader/index";

async function AdjusterPropertyClaimDetailComponent() {
  const cookieStore = cookies();
  let token = "";
  let claimId = "";
  if (cookieStore.has("accessToken")) {
    token = cookieStore.get("accessToken")?.value ?? "";
    claimId = cookieStore.get("claimId")?.value ?? "";
  }
  const payload = {
    claimId: claimId,
  };
  const claimContentListRes: any = await claimContentList(payload, token);
  const serviceRequestListRes: any = await serviceRequestList(payload, token);

  console.log("serviceRequestListRes", serviceRequestListRes);

  if (
    claimContentListRes?.result?.status === 200 &&
    serviceRequestListRes?.result?.status === 200
  ) {
    return (
      <div className="row">
        <div className="col-lg-12 col-md-12 col-12">
          <ServiceRequestsComponent serviceRequestListRes={serviceRequestListRes} />
        </div>
        <div className="col-lg-12 col-md-12 col-12">
          <ContentListComponent claimContentListRes={claimContentListRes} />
        </div>
      </div>
    );
  }
  return <CustomLoader />;
}
export default AdjusterPropertyClaimDetailComponent;
