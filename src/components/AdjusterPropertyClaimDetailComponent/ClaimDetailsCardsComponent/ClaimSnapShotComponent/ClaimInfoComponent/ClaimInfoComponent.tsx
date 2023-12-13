import ClmainInfoStyle from "./ClaimInfo.module.scss";

const ClaimInfoCompoonent: React.FC = () => {
  return (
    <>
      <div className={`col-md-12 col-sm-12 col-12 ${ClmainInfoStyle.fieldRowContainer}`}>
        <label className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldLabel}`}>
          Claim #
        </label>
        <div className="col-md-3 col-sm-3 col-6">FLOW4122023</div>
        <label className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldLabel}`}>
          Status
        </label>
        <div className="col-md-3 col-sm-3 col-6">Work In Progress</div>
      </div>
      <div className={`col-md-12 col-sm-12 col-12 ${ClmainInfoStyle.fieldRowContainer}`}>
        <label className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldLabel}`}>
          Created Date
        </label>
        <div className="col-md-3 col-sm-3 col-6">Dec 8, 2023 7:53 PM</div>
        <label className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldLabel}`}>
          Elapsed Time
        </label>
        <div className="col-md-3 col-sm-3 col-6">2 d 19 h 9 m</div>
      </div>
      <div className={`col-md-12 col-sm-12 col-12 ${ClmainInfoStyle.fieldRowContainer}`}>
        <label className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldLabel}`}>
          Loss Type
        </label>
        <div className="col-md-3 col-sm-3 col-6">Not Specified</div>
        <label className={`col-md-3 col-sm-3 col-6 ps-1 ${ClmainInfoStyle.fieldLabel}`}>
          Claim Deductible
        </label>
        <div className="col-md-3 col-sm-3 col-6">$11.00</div>
      </div>
      <div className={`col-md-12 col-sm-12 col-12 ${ClmainInfoStyle.fieldRowContainer}`}>
        <label className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldLabel}`}>
          Tax %
        </label>
        <div className="col-md-3 col-sm-3 col-6">11</div>
        <label className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldLabel}`}>
          Content Limits
        </label>
        <div className="col-md-3 col-sm-3 col-6">$11.00</div>
      </div>
      <div className={`col-md-12 col-sm-12 col-12 ${ClmainInfoStyle.fieldRowContainer}`}>
        <label className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldLabel}`}>
          Min. $ Item to Price
        </label>
        <div className="col-md-3 col-sm-3 col-6">$1.00</div>
      </div>
    </>
  );
};
export default ClaimInfoCompoonent;
