"use client";
import ClmainInfoStyle from "./ClaimInfo.module.scss";
import { claimDetailsTranslateType } from "@/translations/claimDetailsTranslate/en";
import useTranslation from "@/hooks/useTranslation";
import { convertToCurrentTimezone } from "@/utils/helper";

interface calimInfoType {
  claimSnapShotData: any;
}

const ClaimInfoCompoonent: React.FC<calimInfoType> = ({ claimSnapShotData }) => {
  const { translate }: { translate: claimDetailsTranslateType | undefined } =
    useTranslation("claimDetailsTranslate");
  const dateFormate = "MMM DD, YYYY h:mm A";
  return (
    <>
      <div className={`col-md-12 col-sm-12 col-12 ${ClmainInfoStyle.fieldRowContainer}`}>
        <fieldset
          className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldSetContainer}`}
        >
          <legend className={ClmainInfoStyle.fieldSetLabel}>
            {translate?.claimSnapshot?.claim}
          </legend>
          <div className={ClmainInfoStyle.fieldValue}>
            {claimSnapShotData?.claimNumber}
          </div>
        </fieldset>
        <fieldset
          className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldSetContainer}`}
        >
          <legend className={ClmainInfoStyle.fieldSetLabel}>
            {translate?.claimSnapshot?.status}
          </legend>
          <div className={ClmainInfoStyle.fieldValue}>
            {claimSnapShotData?.claimStatus?.status}
          </div>
        </fieldset>
        <fieldset
          className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldSetContainer}`}
        >
          <legend className={ClmainInfoStyle.fieldSetLabel}>
            {translate?.claimSnapshot?.tax}
          </legend>
          <div className={ClmainInfoStyle.fieldValue}>{claimSnapShotData?.taxRate}</div>
        </fieldset>
      </div>
      <div className={`col-md-12 col-sm-12 col-12 ${ClmainInfoStyle.fieldRowContainer}`}>
        <fieldset
          className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldSetContainer}`}
        >
          <legend className={ClmainInfoStyle.fieldSetLabel}>
            {translate?.claimSnapshot?.elapsedTime}
          </legend>
          <div className={ClmainInfoStyle.fieldValue}>{claimSnapShotData?.claimTime}</div>
        </fieldset>
        <fieldset
          className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldSetContainer}`}
        >
          <legend className={ClmainInfoStyle.fieldSetLabel}>
            {translate?.claimSnapshot?.contentLimits}
          </legend>
          <div className={ClmainInfoStyle.fieldValue}>
            ${claimSnapShotData?.policyLimit}
          </div>
        </fieldset>
        <fieldset
          className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldSetContainer}`}
        >
          <legend className={ClmainInfoStyle.fieldSetLabel}>
            {translate?.claimSnapshot?.claimDeductible}
          </legend>
          <div className={ClmainInfoStyle.fieldValue}>
            ${claimSnapShotData?.deductible}
          </div>
        </fieldset>
      </div>
      <div className={`col-md-12 col-sm-12 col-12 ${ClmainInfoStyle.fieldRowContainer}`}>
        <fieldset
          className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldSetContainer}`}
        >
          <legend className={ClmainInfoStyle.fieldSetLabel}>
            {translate?.claimSnapshot?.createdDate}
          </legend>
          <div className={ClmainInfoStyle.fieldValue}>
            {convertToCurrentTimezone(claimSnapShotData?.createdDate, dateFormate)}
          </div>
        </fieldset>
        <fieldset
          className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldSetContainer}`}
        >
          <legend className={ClmainInfoStyle.fieldSetLabel}>
            {translate?.claimSnapshot?.minItemToPrice}
          </legend>
          <div className={ClmainInfoStyle.fieldValue}>
            ${claimSnapShotData?.minimumThreshold}
          </div>
        </fieldset>
        <fieldset
          className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldSetContainer}`}
        >
          <legend className={ClmainInfoStyle.fieldSetLabel}>
            {translate?.claimSnapshot?.lossType}
          </legend>
          <div className={ClmainInfoStyle.fieldValue}>
            {claimSnapShotData?.damageType}
          </div>
        </fieldset>
      </div>
    </>
  );
};
export default ClaimInfoCompoonent;
