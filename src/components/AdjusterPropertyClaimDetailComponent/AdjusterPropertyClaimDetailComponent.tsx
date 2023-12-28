"use client";
import CustomLoader from "../common/CustomLoader/index";
import GenericBreadcrumb from "../common/GenericBreadcrumb";
import claimDetailStyle from "./adjuster-property-claim-detail.module.scss";
import GenericComponentHeading from "../common/GenericComponentHeading";
import ClaimDetailTabsComponent from "./ClaimDetailTabsComponent";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxCustomHook";
import {
  addCategories,
  addMessageList,
  addPendingTasks,
  addSubcategories,
  addCondition,
  addRetailer,
  addParticipants,
  addContents,
  addPolicyInfo,
  addCompanyDetails,
} from "@/reducers/ClaimDetail/ClaimDetailSlice";
import { useEffect } from "react";
import selectCompanyId from "@/reducers/Session/Selectors/selectCompanyId";
import { getCompanyDetails } from "@/services/AdjusterPropertyClaimDetailService";
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
  claimContitionRes: any;
  claimRetailerRes: any;
  claimParticipantsRes: any;
  claimContentsRes: any;
  policyInfoRes: any;
};

const AdjusterPropertyClaimDetailComponent: React.FC<propsTypes> = ({
  claimId,
  claimContentListRes,
  serviceRequestListRes,
  categoryListRes,
  subcategoryListRes,
  pendingTaskListRes,
  claimDetailMessageListRes,
  claimContitionRes,
  claimRetailerRes,
  claimParticipantsRes,
  claimContentsRes,
  policyInfoRes,
}) => {
  const dispatch = useAppDispatch();
  const companyId = useAppSelector(selectCompanyId);

  if (Array.isArray(categoryListRes?.data)) {
    dispatch(addCategories(categoryListRes?.data));
  }
  if (Array.isArray(subcategoryListRes?.data)) {
    dispatch(addSubcategories(subcategoryListRes?.data));
  }
  if (Array.isArray(pendingTaskListRes?.data)) {
    dispatch(addPendingTasks(pendingTaskListRes?.data));
  }
  if (Array.isArray(claimDetailMessageListRes?.data?.messages)) {
    dispatch(addMessageList(claimDetailMessageListRes?.data?.messages));
  }
  if (Array.isArray(claimParticipantsRes?.data)) {
    dispatch(addParticipants(claimParticipantsRes?.data));
  }
  if (claimContentsRes?.data) {
    dispatch(addContents(claimContentsRes?.data));
  }
  if (policyInfoRes?.data) {
    dispatch(addPolicyInfo(policyInfoRes?.data));
  }
  dispatch(addCondition(claimContitionRes?.data));
  dispatch(addRetailer(claimRetailerRes?.data));

  const pathList = [
    {
      name: "Home",
      path: "/adjuster-dashboard",
    },
    {
      name: "055CLM5122023Avi",
      path: "/adjuster-property-claim-details",
      active: true,
    },
  ];

  useEffect(() => {
    const getCompanyDetailInit = async () => {
      if (companyId) {
        const companyDetailsRes: any = await getCompanyDetails(companyId);
        if (companyDetailsRes?.data) {
          dispatch(addCompanyDetails(companyDetailsRes));
        }
      }
    };
    getCompanyDetailInit();
  }, [companyId, dispatch]);

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
