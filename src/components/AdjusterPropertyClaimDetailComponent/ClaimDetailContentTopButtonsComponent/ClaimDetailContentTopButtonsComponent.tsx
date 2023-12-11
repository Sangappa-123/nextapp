import GenericButton from "@/components/common/GenericButton";
import topButtonStyle from "./top-button.module.scss";
import ClaimDetailsCardsComponent from "../ClaimDetailsCardsComponent";
import ServiceRequestsComponent from "../ServiceRequestsComponent";
import ContentListComponent from "../ContentListComponent";

type propTypes = {
  serviceRequestListRes: any;
  claimContentListRes: any;
};

const ClaimDetailContentTopButtonsComponent: React.FC<propTypes> = (props: propTypes) => {
  const buttonsArray = [
    {
      label: "Calculate Settlement",
      clickHandler: "",
    },
    {
      label: "Re-Calculate Depreciation",
      clickHandler: "",
    },
    {
      label: "Re-Assign Claim",
      clickHandler: "",
    },
    {
      label: "Supervisor Review",
      clickHandler: "",
    },
    {
      label: "Close Claim",
      clickHandler: "",
    },
    {
      label: "Delete Claim",
      clickHandler: "",
    },
  ];
  const buttons = buttonsArray.map((buttonObj, i) => {
    return (
      <div key={i}>
        <GenericButton label={buttonObj.label} size="small" />
      </div>
    );
  });

  return (
    <div>
      <div className={topButtonStyle.buttonRowContainer}>{buttons}</div>
      <div className="row">
        <ClaimDetailsCardsComponent />
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-12">
          <ServiceRequestsComponent serviceRequestListRes={props.serviceRequestListRes} />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-12">
          <ContentListComponent claimContentListRes={props.claimContentListRes} />
        </div>
      </div>
    </div>
  );
};
export default ClaimDetailContentTopButtonsComponent;
