import Cards from "@/components/common/Cards";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";
import claimSnapShotStyle from "./claim-snap-shot.module.scss";

const ClaimSnapShotComponent: React.FC = () => {
  return (
    <>
      <Cards className={claimSnapShotStyle.snapShotcardContainer}>
        <GenericComponentHeading title="Claim snapshot" />
        <div className={claimSnapShotStyle.contentContainer}>
          <div
            className={`col-md-12 col-sm-12 col-12 ${claimSnapShotStyle.fieldRowContainer}`}
          >
            <label className={`col-md-3 col-sm-3 col-6 ${claimSnapShotStyle.fieldLabel}`}>
              Claim #
            </label>
            <div className="col-md-3 col-sm-3 col-6">adjustereStatusWork</div>
            <label className={`col-md-3 col-sm-3 col-6 ${claimSnapShotStyle.fieldLabel}`}>
              Status
            </label>
            <div className="col-md-3 col-sm-3 col-6">Work In Progress</div>
          </div>
          <div
            className={`col-md-12 col-sm-12 col-12 ${claimSnapShotStyle.fieldRowContainer}`}
          >
            <label className={`col-md-3 col-sm-3 col-6 ${claimSnapShotStyle.fieldLabel}`}>
              Created Date
            </label>
            <div className="col-md-3 col-sm-3 col-6">Dec 8, 2023 7:53 PM</div>
            <label className={`col-md-3 col-sm-3 col-6 ${claimSnapShotStyle.fieldLabel}`}>
              Elapsed Time
            </label>
            <div className="col-md-3 col-sm-3 col-6">2 d 19 h 9 m</div>
          </div>
          <div
            className={`col-md-12 col-sm-12 col-12 ${claimSnapShotStyle.fieldRowContainer}`}
          >
            <label className={`col-md-3 col-sm-3 col-6 ${claimSnapShotStyle.fieldLabel}`}>
              Loss Type
            </label>
            <div className="col-md-3 col-sm-3 col-6">Not Specified</div>
            <label
              className={`col-md-3 col-sm-3 col-6 ps-1 ${claimSnapShotStyle.fieldLabel}`}
            >
              Claim Deductible
            </label>
            <div className="col-md-3 col-sm-3 col-6">$11.00</div>
          </div>
          <div
            className={`col-md-12 col-sm-12 col-12 ${claimSnapShotStyle.fieldRowContainer}`}
          >
            <label className={`col-md-3 col-sm-3 col-6 ${claimSnapShotStyle.fieldLabel}`}>
              Tax %
            </label>
            <div className="col-md-3 col-sm-3 col-6">11</div>
            <label className={`col-md-3 col-sm-3 col-6 ${claimSnapShotStyle.fieldLabel}`}>
              Content Limits
            </label>
            <div className="col-md-3 col-sm-3 col-6">$11.00</div>
          </div>
          <div
            className={`col-md-12 col-sm-12 col-12 ${claimSnapShotStyle.fieldRowContainer}`}
          >
            <label className={`col-md-3 col-sm-3 col-6 ${claimSnapShotStyle.fieldLabel}`}>
              Min. $ Item to Price
            </label>
            <div className="col-md-3 col-sm-3 col-6">$1.00</div>
          </div>
          <div className={claimSnapShotStyle.contentCardsContainer}>
            <div className="mt-2">
              <Cards className={claimSnapShotStyle.snapShotContentCard}>
                <div className={claimSnapShotStyle.cardItemContainer}>
                  <div className={claimSnapShotStyle.itemTitle}>Items</div>
                  <div>
                    <span className={claimSnapShotStyle.numericContent}>100</span>
                    <span className={claimSnapShotStyle.textContent}>claimed</span>
                  </div>
                  <div>
                    <span className={claimSnapShotStyle.numericContent}>0</span>
                    <span className={claimSnapShotStyle.textContent}>processed</span>
                  </div>
                </div>
              </Cards>
            </div>
            <div className="mt-2">
              <Cards className={claimSnapShotStyle.snapShotContentCard}>
                <div className={claimSnapShotStyle.cardItemContainer}>
                  <div className={claimSnapShotStyle.itemTitle}>Exposure</div>
                  <div>
                    <span className={claimSnapShotStyle.numericContent}>$0.00</span>
                    <span className={claimSnapShotStyle.textContent}>Repl</span>
                  </div>
                  <div>
                    <span className={claimSnapShotStyle.numericContent}>$0.00</span>
                    <span className={claimSnapShotStyle.textContent}>Cash</span>
                  </div>
                </div>
              </Cards>
            </div>
            <div className="mt-2">
              <Cards className={claimSnapShotStyle.snapShotContentCard}>
                <div className={claimSnapShotStyle.cardItemContainer}>
                  <div className={claimSnapShotStyle.itemTitle}>Paid</div>
                  <div>
                    <span className={claimSnapShotStyle.numericContent}>$0.00</span>
                    <span className={claimSnapShotStyle.textContent}>Cash</span>
                  </div>
                  <div>
                    <span className={claimSnapShotStyle.numericContent}>$0.00</span>
                    <span className={claimSnapShotStyle.textContent}>Holdover</span>
                  </div>
                </div>
              </Cards>
            </div>
          </div>
        </div>
      </Cards>
    </>
  );
};
export default ClaimSnapShotComponent;
