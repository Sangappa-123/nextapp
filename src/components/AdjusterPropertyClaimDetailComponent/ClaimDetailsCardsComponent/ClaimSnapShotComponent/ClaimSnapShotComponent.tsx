"use client";
import Cards from "@/components/common/Cards";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";
import claimSnapShotStyle from "./claim-snap-shot.module.scss";
import { useState } from "react";
import RightActionsComponent from "./RightActionsButton";
import ClaimInfoComponent from "./ClaimInfoComponent";
import UpdateClaimInfoForm from "./UpdateClaimInfoForm";
import { claimDetailsTranslateType } from "@/translations/claimDetailsTranslate/en";
import useTranslation from "@/hooks/useTranslation";
import { RootState } from "@/store/store";
import { ConnectedProps, connect } from "react-redux";

const ClaimSnapShotComponent: React.FC<connectorType> = (props) => {
  const { claimSnapShotData } = props;
  // console.log("props", claimSnapShotData);
  const [showForm, setShowForm] = useState(false);
  const { translate }: { translate: claimDetailsTranslateType | undefined } =
    useTranslation("claimDetailsTranslate");

  return (
    <>
      <Cards className={claimSnapShotStyle.snapShotcardContainer}>
        <GenericComponentHeading title={translate?.claimSnapshot?.claimSnapshotHeading}>
          <RightActionsComponent setShowForm={setShowForm} />
        </GenericComponentHeading>
        <div className={claimSnapShotStyle.contentContainer}>
          {!showForm && (
            <>
              <ClaimInfoComponent claimSnapShotData={claimSnapShotData} />
            </>
          )}
          {showForm && (
            <UpdateClaimInfoForm
              claimSnapShotData={claimSnapShotData}
              translate={translate}
            />
          )}
          <div className={claimSnapShotStyle.contentCardsContainer}>
            <div className="mt-2">
              <Cards className={claimSnapShotStyle.snapShotContentCard}>
                <div className={claimSnapShotStyle.cardItemContainer}>
                  <div className={claimSnapShotStyle.itemTitle}>
                    {translate?.claimSnapshot?.items}
                  </div>
                  <div>
                    <span className={claimSnapShotStyle.numericContent}>
                      {claimSnapShotData?.itemsClaimed}
                    </span>
                    <span className={claimSnapShotStyle.textContent}>
                      {translate?.claimSnapshot?.claimed}
                    </span>
                  </div>
                  <div>
                    <span className={claimSnapShotStyle.numericContent}>
                      {claimSnapShotData?.itemsProcessed}
                    </span>
                    <span className={claimSnapShotStyle.textContent}>
                      {translate?.claimSnapshot?.processed}
                    </span>
                  </div>
                </div>
              </Cards>
            </div>
            <div className="mt-2">
              <Cards className={claimSnapShotStyle.snapShotContentCard}>
                <div className={claimSnapShotStyle.cardItemContainer}>
                  <div className={claimSnapShotStyle.itemTitle}>
                    {translate?.claimSnapshot?.exposure}
                  </div>
                  <div>
                    <span className={claimSnapShotStyle.numericContent}>$0.00</span>
                    <span className={claimSnapShotStyle.textContent}>
                      {translate?.claimSnapshot?.repl}
                    </span>
                  </div>
                  <div>
                    <span className={claimSnapShotStyle.numericContent}>$0.00</span>
                    <span className={claimSnapShotStyle.textContent}>
                      {translate?.claimSnapshot?.cash}
                    </span>
                  </div>
                </div>
              </Cards>
            </div>
            <div className="mt-2">
              <Cards className={claimSnapShotStyle.snapShotContentCard}>
                <div className={claimSnapShotStyle.cardItemContainer}>
                  <div className={claimSnapShotStyle.itemTitle}>
                    {translate?.claimSnapshot?.paid}
                  </div>
                  <div>
                    <span className={claimSnapShotStyle.numericContent}>$0.00</span>
                    <span className={claimSnapShotStyle.textContent}>
                      {translate?.claimSnapshot?.paidCash}
                    </span>
                  </div>
                  <div>
                    <span className={claimSnapShotStyle.numericContent}>$0.00</span>
                    <span className={claimSnapShotStyle.textContent}>
                      {translate?.claimSnapshot?.holdover}
                    </span>
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

const mapStateToProps = (state: RootState) => ({
  claimSnapShotData: state?.claimDetail?.contents,
});

const connector = connect(mapStateToProps, null);
type connectorType = ConnectedProps<typeof connector>;
export default connector(ClaimSnapShotComponent);
