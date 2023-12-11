import ClaimSnapShotComponent from "./ClaimSnapShotComponent";
import MessagesComponent from "./MessagesComponent";
import PolicyHoldersComponent from "./PolicyHoldersComponent";
import ClaimDetailsCardStyle from "./ClaimDetailsCards.module.scss";

const ClaimDetailsCardsComponent: React.FC = () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-5 col-sm-12 col-12 ps-0">
          <ClaimSnapShotComponent />
        </div>
        <div
          className={`col-md-7 col-sm-12 col-12 ${ClaimDetailsCardStyle.messageAndPolicyHolderContainer}`}
        >
          <div className="col-md-6 col-sm-6 col-12">
            <MessagesComponent />
          </div>
          <div className="col-md-6 col-sm-6 col-12">
            <PolicyHoldersComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimDetailsCardsComponent;
