import CustomLoader from "../common/CustomLoader/index";
import GenericBreadcrumb from "../common/GenericBreadcrumb";
import claimDetailStyle from "./adjuster-property-claim-detail.module.scss";
import GenericComponentHeading from "../common/GenericComponentHeading";
import ClaimDetailTabsComponent from "./ClaimDetailTabsComponent";

type propsTypes = {
  claimId: string;
  claimContentListRes: any;
  serviceRequestListRes: any;
};

const AdjusterPropertyClaimDetailComponent: React.FC<propsTypes> = ({
  claimId,
  claimContentListRes,
  serviceRequestListRes,
}) => {
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

  if (claimContentListRes?.status === 200 && serviceRequestListRes?.status === 200) {
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
            claimId={claimId}
          />
        </div>
      </div>
    );
  }
  return <CustomLoader />;
};
export default AdjusterPropertyClaimDetailComponent;
