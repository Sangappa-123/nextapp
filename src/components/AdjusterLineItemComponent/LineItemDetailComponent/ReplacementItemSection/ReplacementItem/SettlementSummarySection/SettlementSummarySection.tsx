import React from "react";
import settlementSummarySectionStyle from "./settlementSummarySection.module.scss";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";
import { useAppSelector } from "@/hooks/reduxCustomHook";
import selectItemStatus from "@/reducers/LineItemDetail/Selectors/selectItemStatus";
// import selectSelectedSubCategory from "@/reducers/LineItemDetail/Selectors/selectSelectedSubCategory";
import selectLineItem from "@/reducers/LineItemDetail/Selectors/selectLineItem";

// interface rcvWithSplCaseType {
//   depriciationRateStr: string;
// }

function SettlementSummarySection() {
  const status = useAppSelector(selectItemStatus);
  // const subcategory = useAppSelector(selectSelectedSubCategory);
  const lineItem = useAppSelector(selectLineItem);

  // console.log("ppppppppppppp>>>>>>>>>>>>", lineItem);
  // const CalculateRCVWithSplCase = useMemo<rcvWithSplCaseType>(() => {
  //   let depriciationRateStr = subcategory ? subcategory?.annualDepreciation + "%" : "0 %";
  //   if (subcategory?.specialCase) {
  //     if (subcategory.depreciation) {
  //       depriciationRateStr = `${subcategory.firstYearDepreciation}%,
  //         ${subcategory.correspondYearDepreciation}% year on, ${subcategory.maxDepreciation}% max`;
  //     } else if (subcategory.flatDepreciation && subcategory.flatDepreciation > 0) {
  //       depriciationRateStr = `${subcategory?.flatDepreciation}% flat`;
  //     } else {
  //       depriciationRateStr += `, ${subcategory?.maxDepreciation}% max`;
  //     }
  //   } else {
  //     depriciationRateStr += ", " + subcategory?.maxDepreciation + "% max";
  //   }
  //   return { depriciationRateStr };
  // }, [subcategory]);

  const CalculatedValue = ({
    label,
    value,
    id,
  }: {
    label: string;
    value: string;
    id: string;
  }) => (
    <div>
      <label htmlFor={id}>{label}</label>
      <div id={id}>{value}</div>
    </div>
  );

  return (
    <div className={settlementSummarySectionStyle.root}>
      <GenericComponentHeading
        title="Settlement Summary"
        customTitleClassname={settlementSummarySectionStyle.heading}
      />
      <div className={settlementSummarySectionStyle.content}>
        <div className={settlementSummarySectionStyle.contentColumn}>
          <CalculatedValue
            id="status"
            label="Item Status"
            value={status?.status?.toUpperCase()}
          />
          <CalculatedValue
            id="totalReplaceCost"
            label="Total Replacement Cost"
            // value={`$${calculatedTax.rcvTotal}`}
            value={lineItem.rcvTotal == null ? 0 : lineItem.rcvTotal}
          />
          <CalculatedValue
            id="totalCostVal"
            label="Total Cash Value"
            value={lineItem?.acv == null ? 0 : lineItem.acv}
          />
        </div>
        <div className={settlementSummarySectionStyle.contentColumn}>
          <CalculatedValue
            id="annualDepreciation"
            label="Annual Depreciation"
            value={lineItem.depriciationRateStr}
          />
          <CalculatedValue
            id="itemLimit"
            label="Item Limit"
            value={
              lineItem.individualLimitAmount == null ? 0 : lineItem.individualLimitAmount
            }
          />
        </div>
        <div className={settlementSummarySectionStyle.contentColumn}>
          <CalculatedValue
            id="total$Depreciation"
            label="Total $ Depreciation"
            value={lineItem.depreciationAmount == null ? 0 : lineItem.depreciationAmount}
          />
          <CalculatedValue
            id="itemOverage"
            label="Item Overage"
            value={lineItem.itemOverage == null ? 0 : lineItem.itemOverage}
          />
        </div>
      </div>

      <div className={settlementSummarySectionStyle.paymentHistory}>
        <label htmlFor="paymentHistory">Payment History</label>
        <div id="paymentHistory"></div>
      </div>
    </div>
  );
}

export default SettlementSummarySection;
