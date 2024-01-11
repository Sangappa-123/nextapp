import ClaimParticipants from "@/components/ClaimParticipants/ClaimParticipants";
import ActivityLog from "@/components/ActivityLog/ActivityLog";
import TabsButtonComponent from "@/components/common/TabsButtonComponent";
import PoicyAndCoverageDetails from "@/components/PolicyAndCoverageDeatils/PoicyAndCoverageDetails";
import Documents from "@/components/Documents/Documents";
import ClaimDetailContentTopButtonsComponent from "../ClaimDetailContentTopButtonsComponent";
import ContentsEvaluationContentTopButtonsComponent from "../ContentsEvaluationContentTopButtonsComponent/ContentsEvaluationContentTopButtonsComponent";

type propTypes = {
  serviceRequestListRes: any;
  claimContentListRes: any;
  claimId: string;
};

const ClaimDetailTabsComponent: React.FC<propTypes> = (props: propTypes) => {
  const tabsArray = [
    {
      name: "Claim Detail",
      content: (
        <ClaimDetailContentTopButtonsComponent
          serviceRequestListRes={props.serviceRequestListRes}
          claimContentListRes={props.claimContentListRes}
          claimId={props.claimId}
        />
      ),
      // content: <DashboardNotification data={data} />,
      // className: TabsStyle.tab1,
    },
    {
      name: "Contents Evaluation",
      content: <ContentsEvaluationContentTopButtonsComponent />,
    },
    {
      name: "Vendor Assignments",
      content: "",
    },
    {
      name: "Documents",
      content: <Documents />,
    },
    {
      name: "Claim Participants",
      content: <ClaimParticipants claimId={props.claimId} />,
    },
    {
      name: "Activity Log",
      content: <ActivityLog />,
    },
    {
      name: "Policy and Coverage Details",
      content: <PoicyAndCoverageDetails />,
    },
  ];

  return <TabsButtonComponent tabData={tabsArray} />;
};
export default ClaimDetailTabsComponent;
