"use client";
import React, { useEffect } from "react";
import PolicyholderCard from "./components/PolicyholderCard";
import Cards from "@/components/common/Cards";
import Link from "next/link";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";
import style from "./components/policyholderCard.module.scss";
import PolicyHolderTable from "./PolicyHolderTable/PolicyHolderTable";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "@/store/store";
import { fetchPolicyHolderTableAction } from "@/reducers/ContentsEvaluation/DetailedInventorySlice";
import { exportPaymentSummaryToPDF } from "../DetailedInventoryList/DetailedInventoryFucn";
import { useAppDispatch } from "@/hooks/reduxCustomHook";
import { addNotification } from "@/reducers/Notification/NotificationSlice";

type PolicyHolderPayouts = {
  policyholderPayoutsData: any;
  fetchPolicyHolderTableAction: any;
};

function reStructure(value: any) {
  if (value) return Number.parseFloat(value).toFixed(2);
  else {
    return "0.00";
  }
}

function PolicyholderPayouts(props: PolicyHolderPayouts): React.FC<connectorType> {
  const claimNumber = sessionStorage.getItem("claimNumber") || "";
  const { policyholderPayoutsData, fetchPolicyHolderTableAction } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchPolicyHolderTableAction({
      claimNumber: claimNumber,
    });
  }, [claimNumber, fetchPolicyHolderTableAction]);

  return (
    <div className="row mb-4 mt-3 p-3">
      <div
        onClick={async () => {
          const status = await exportPaymentSummaryToPDF(claimNumber);
          if (status === "success") {
            dispatch(
              addNotification({
                message: "Successfully download the PDF!",
                id: "good",
                status: "success",
              })
            );
          } else if (status === "error") {
            dispatch(
              addNotification({
                message: "Failed download the PDF!",
                id: "good",
                status: "error",
              })
            );
          }
        }}
        className={style.link}
      >
        <Link href="#">Export to PDF</Link>
      </div>
      <div className="d-flex justify-content-center">
        <PolicyholderCard
          heading="Total # of items"
          value={policyholderPayoutsData?.totalNoOfItemsClaimed}
        />
        <PolicyholderCard
          heading="Total # items paid cash for"
          value={policyholderPayoutsData?.actualCashValueSettlementDTO?.noOfItemsCashed}
        />
        <PolicyholderCard
          heading="Total # items replaced"
          value={policyholderPayoutsData?.replacementCostSettlement?.noOfItemsReplaced}
        />
        <PolicyholderCard
          heading="Total $ paid"
          value={policyholderPayoutsData?.TotalAmountPaid}
        />
      </div>
      <div className="d-flex justify-content-center">
        <div className="d-flex m-3">
          <Cards className="p-3">
            <GenericComponentHeading title="Replacement Cost Settlement"></GenericComponentHeading>
            <div className={style.label}>
              <b>#Items Replaced </b>
              <span className={style.value}>
                $
                {reStructure(
                  policyholderPayoutsData?.replacementCostSettlement?.noOfItemsReplaced
                )}
              </span>
            </div>
            <div className={style.label}>
              <b>Total Replacement Cost(Including Taxes) </b>
              <span className={style.value}>
                $
                {reStructure(
                  policyholderPayoutsData?.replacementCostSettlement
                    ?.totalReplacementCostIncludeTax
                )}
              </span>
            </div>
            <div className={style.label}>
              <b>Total Receipt Value(Including Taxes) </b>
              <span className={style.value}>
                $
                {reStructure(
                  policyholderPayoutsData?.replacementCostSettlement?.totalReceiptValue
                )}
              </span>
            </div>
            <div className={style.label}>
              <b>Total Holdover Paid (Including Taxes) </b>
              <span className={style.value}>
                $
                {reStructure(
                  policyholderPayoutsData?.replacementCostSettlement
                    ?.totalHoldoverPaidIncludeTax
                )}
              </span>
            </div>
            <div className={style.label}>
              <b>Less Policy Deductible (-) </b>
              <span className={style.value}>
                $
                {reStructure(
                  policyholderPayoutsData?.replacementCostSettlement?.lessPolicyDeductible
                )}
              </span>
            </div>
            <hr />
            <div className={style.label}>
              <b>Net Replacement Cost </b>
              <span className={style.value}>
                $
                {reStructure(
                  policyholderPayoutsData?.replacementCostSettlement?.netReplacementCost
                )}
              </span>
            </div>
          </Cards>
        </div>
        <div>
          <div className="d-flex m-3">
            <Cards className="p-3">
              <GenericComponentHeading title="Actual Cash Value Settlement"></GenericComponentHeading>
              <div className={style.label}>
                <b>#Items Cashed</b>
                <span className={style.value}>
                  $
                  {reStructure(
                    policyholderPayoutsData?.actualCashValueSettlementDTO?.noOfItemsCashed
                  )}
                </span>
              </div>
              <div className={style.label}>
                <b>Total Replacement Cost (Including Taxes) </b>
                <span className={style.value}>
                  $
                  {reStructure(
                    policyholderPayoutsData?.actualCashValueSettlementDTO
                      ?.totalReplacementCost
                  )}
                </span>
              </div>
              <div className={style.label}>
                <b>Less Depreciation Cost (-) </b>
                <span className={style.value}>
                  $
                  {reStructure(
                    policyholderPayoutsData?.actualCashValueSettlementDTO
                      ?.lessDepreciationCost
                  )}
                </span>
              </div>
              <div className={style.label}>
                <b>Less Amount Over Limit (-) </b>
                <span className={style.value}>
                  $
                  {reStructure(
                    policyholderPayoutsData?.actualCashValueSettlementDTO
                      ?.lessAmountOverLimits
                  )}
                </span>
              </div>
              <div className={style.label}>
                <b>Less Policy Deductible (-) </b>
                <span className={style.value}>
                  $
                  {reStructure(
                    policyholderPayoutsData?.actualCashValueSettlementDTO
                      ?.lessPolicyDeductible
                  )}
                </span>
              </div>
              <hr />
              <div className={style.label}>
                <b>Net Claim Cost </b>
                <span className={style.value}>
                  $
                  {reStructure(
                    policyholderPayoutsData?.actualCashValueSettlementDTO?.netClaimCost
                  )}
                </span>
              </div>
            </Cards>
          </div>
        </div>
      </div>
      <PolicyHolderTable />
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  policyholderPayoutsData: state.detailedInventorydata?.policyHolderListDataFull,
});

const mapDispatchToProps = {
  fetchPolicyHolderTableAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;

export default connector(PolicyholderPayouts);
