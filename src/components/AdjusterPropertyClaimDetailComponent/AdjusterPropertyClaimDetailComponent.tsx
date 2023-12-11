import { cookies } from "next/headers";
import { claimContentList } from "@/services/ClaimContentListService";
import { serviceRequestList } from "@/services/ClaimServiceRequestListService";
import CustomLoader from "../common/CustomLoader/index";
import GenericBreadcrumb from "../common/GenericBreadcrumb";
import claimDetailStyle from "./adjuster-property-claim-detail.module.scss";
import GenericComponentHeading from "../common/GenericComponentHeading";
import ClaimDetailTabsComponent from "./ClaimDetailTabsComponent";

async function AdjusterPropertyClaimDetailComponent() {
  const pathList = [
    {
      name: "Home",
      path: "/adjuster-dashboard",
      // active: true,
    },
    {
      name: "055CLM5122023Avi",
      path: "/adjuster-property-claim-details",
      active: true,
    },
  ];
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
        <GenericBreadcrumb dataList={pathList} />
        <div className={claimDetailStyle.headingContainer}>
          <GenericComponentHeading
            customHeadingClassname={claimDetailStyle.headingContainer}
            customTitleClassname={claimDetailStyle.headingTxt}
            title="Claim# 055CLM5122023Avi - Kumar, Avinash"
          />
        </div>
        <div>
          <ClaimDetailTabsComponent
            serviceRequestListRes={serviceRequestListRes}
            claimContentListRes={claimContentListRes}
          />
        </div>
      </div>
    );
  }
  return <CustomLoader />;
}
export default AdjusterPropertyClaimDetailComponent;
