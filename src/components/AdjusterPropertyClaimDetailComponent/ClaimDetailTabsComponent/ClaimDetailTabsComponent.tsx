import ClaimParticipants from "@/components/ClaimParticipants/ClaimParticipants";
import ActivityLog from "@/components/ActivityLog/ActivityLog";
import TabsButtonComponent from "@/components/common/TabsButtonComponent";
import PolicyAndCoverageDetails from "@/components/PolicyAndCoverageDeatils/PolicyAndCoverageDetails";
import ClaimDetailContentTopButtonsComponent from "../ClaimDetailContentTopButtonsComponent";
import ContentsEvaluationContentTopButtonsComponent from "../ContentsEvaluationContentTopButtonsComponent/ContentsEvaluationContentTopButtonsComponent";
import VendorAssignments from "@/components/VendorAssignments/index";
import { claimDetailsTabTranslateType } from "@/translations/claimDetailsTabTranslate/en";
import useTranslation from "@/hooks/useTranslation";
import Documents from "@/components/Documents/Documents";

type propTypes = {
  claimId: string;
};

const ClaimDetailTabsComponent: React.FC<propTypes> = (props: propTypes) => {
  const { translate }: { translate: claimDetailsTabTranslateType | undefined } =
    useTranslation("claimDetailsTabTranslate");

  const tabsArray = [
    {
      name: translate?.tabsComponent?.claimDetail,
      content: <ClaimDetailContentTopButtonsComponent claimId={props.claimId} />,
    },
    {
      name: translate?.tabsComponent?.contentsEvaluation,
      content: <ContentsEvaluationContentTopButtonsComponent />,
    },
    {
      name: translate?.tabsComponent?.vendorAssignments,
      content: <VendorAssignments />,
    },
    {
      name: translate?.tabsComponent?.documents,
      content: <Documents />,
    },
    {
      name: translate?.tabsComponent?.claimParticipants,
      content: <ClaimParticipants claimId={props.claimId} />,
    },
    {
      name: translate?.tabsComponent?.activityLog,
      content: <ActivityLog />,
    },
    {
      name: translate?.tabsComponent?.policyCoverageDetails,
      content: <PolicyAndCoverageDetails />,
    },
  ];

  return <TabsButtonComponent tabData={tabsArray} />;
};
export default ClaimDetailTabsComponent;
