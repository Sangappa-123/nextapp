import Cards from "@/components/common/Cards";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";
import claimSnapShotStyle from "./claim-snap-shot.module.scss";

const ClaimSnapShotComponent: React.FC = () => {
  return (
    <>
      <Cards className={claimSnapShotStyle.snapShotcardContainer}>
        <GenericComponentHeading title="Claim snapshot" />
        <div className={claimSnapShotStyle.contentCardsContainer}>
          <div className="mt-2">
            <Cards className={claimSnapShotStyle.snapShotContentCard}>
              <div className={claimSnapShotStyle.cardItemContainer}>
                <div>Items</div>
                <div>100 claimed</div>
                <div>0 processed</div>
              </div>
            </Cards>
          </div>
          <div className="mt-2">
            <Cards className={claimSnapShotStyle.snapShotContentCard}>
              <div className={claimSnapShotStyle.cardItemContainer}>
                <div>Exposure</div>
                <div>$0.00 Repl</div>
                <div>$0.00 Cash</div>
              </div>
            </Cards>
          </div>
          <div className="mt-2">
            <Cards className={claimSnapShotStyle.snapShotContentCard}>
              <div className={claimSnapShotStyle.cardItemContainer}>
                <div>Paid</div>
                <div>$0.00 Cash</div>
                <div>$0.00 Holdover</div>
              </div>
            </Cards>
          </div>
        </div>
      </Cards>
    </>
  );
};
export default ClaimSnapShotComponent;
