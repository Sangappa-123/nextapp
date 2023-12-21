"use client";
import CustomLoader from "../common/CustomLoader/index";
import GenericBreadcrumb from "../common/GenericBreadcrumb";
import claimDetailStyle from "./adjuster-property-claim-detail.module.scss";
import GenericComponentHeading from "../common/GenericComponentHeading";
import ClaimDetailTabsComponent from "./ClaimDetailTabsComponent";
import { useAppDispatch } from "@/hooks/reduxCustomHook";
import {
  addCategories,
  addMessageList,
  addPendingTasks,
  addSubcategories,
} from "@/reducers/ClaimDetail/ClaimDetailSlice";
// import PageTitleSectionComponent from "./PageTitleSectionComponent";
// import useScroll from "@/hooks/useScrollHook";

type propsTypes = {
  claimId: string;
  claimContentListRes: any;
  serviceRequestListRes: any;
  categoryListRes: any;
  subcategoryListRes: any;
  pendingTaskListRes: any;
  claimDetailMessageListRes: any;
};

const AdjusterPropertyClaimDetailComponent: React.FC<propsTypes> = ({
  claimId,
  claimContentListRes,
  serviceRequestListRes,
  categoryListRes,
  subcategoryListRes,
  pendingTaskListRes,
  claimDetailMessageListRes,
}) => {
  const dispatch = useAppDispatch();
  // const scroll = useScroll();
  // console.log("scroll", scroll);

  dispatch(addCategories(categoryListRes?.data));
  dispatch(addSubcategories(subcategoryListRes?.data));
  dispatch(addPendingTasks(pendingTaskListRes?.data));
  dispatch(addMessageList(claimDetailMessageListRes?.data?.messages));

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
        <div className={claimDetailStyle.stickyContainer}>
          {/* <PageTitleSectionComponent /> */}
          <GenericBreadcrumb dataList={pathList} />
          {/* <div className={claimDetailStyle.headingContainer}> */}
          <GenericComponentHeading
            customHeadingClassname={claimDetailStyle.headingContainer}
            customTitleClassname={claimDetailStyle.headingTxt}
            title="Claim# 055CLM5122023Avi - Kumar, Avinash"
          />
          {/* </div> */}
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
