import TabsButtonComponent from "@/components/common/TabsButtonComponent";
import ClaimDetailContentTopButtonsComponent from "../ClaimDetailContentTopButtonsComponent";

type propTypes = {
  serviceRequestListRes: any;
  claimContentListRes: any;
};

const ClaimDetailTabsComponent: React.FC<propTypes> = (props: propTypes) => {
  const tabsArray = [
    {
      name: "Claim Detail",
      content: (
        <ClaimDetailContentTopButtonsComponent
          serviceRequestListRes={props.serviceRequestListRes}
          claimContentListRes={props.claimContentListRes}
        />
      ),
      // content: <DashboardNotification data={data} />,
      // className: TabsStyle.tab1,
    },
    {
      name: "Vendor Assignments",
      content: "",
    },
    {
      name: "Documents",
      content: "",
    },
    {
      name: "Claim Participants",
      content: "",
    },
    {
      name: "Activity Log",
      content: "",
    },
    {
      name: "Policy and Coverage Details",
      content: "",
    },
  ];

  return <TabsButtonComponent tabData={tabsArray} />;
};
export default ClaimDetailTabsComponent;
