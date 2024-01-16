import React, { useMemo } from "react";
import settlementSummarySectionStyle from "./settlementSummarySection.module.scss";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";
import { calculatedTaxType } from "../ReplacementItem";
import { useAppSelector } from "@/hooks/reduxCustomHook";
import selectItemStatus from "@/reducers/LineItemDetail/Selectors/selectItemStatus";
import selectSelectedSubCategory from "@/reducers/LineItemDetail/Selectors/selectSelectedSubCategory";

interface rcvWithSplCaseType {
  depriciationRateStr: string;
}

function SettlementSummarySection({
  calculatedTax,
}: {
  calculatedTax: calculatedTaxType;
}) {
  const status = useAppSelector(selectItemStatus);
  const subcategory = useAppSelector(selectSelectedSubCategory);

  const CalculateRCVWithSplCase = useMemo<rcvWithSplCaseType>(() => {
    let depriciationRateStr = subcategory ? subcategory?.annualDepreciation + "%" : "0 %";
    if (subcategory?.specialCase) {
      if (subcategory.depreciation) {
        depriciationRateStr = `${subcategory.firstYearDepreciation}%, 
          ${subcategory.correspondYearDepreciation}% year on, ${subcategory.maxDepreciation}% max`;
      } else if (subcategory.flatDepreciation && subcategory.flatDepreciation > 0) {
        depriciationRateStr = `${subcategory?.flatDepreciation}% flat`;
      } else {
        depriciationRateStr += `, ${subcategory.maxDepreciation}% max`;
      }
    }
    return { depriciationRateStr };
  }, [subcategory]);

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
            value={`$${calculatedTax.rcvTotal}`}
          />
          <CalculatedValue id="totalCostVal" label="Total Cash Value" value="$33.49" />
        </div>
        <div className={settlementSummarySectionStyle.contentColumn}>
          <CalculatedValue
            id="annualDepreciation"
            label="Annual Depreciation"
            value={CalculateRCVWithSplCase.depriciationRateStr}
          />
          <CalculatedValue id="itemLimit" label="Item Limit" value="$0.00" />
        </div>
        <div className={settlementSummarySectionStyle.contentColumn}>
          <CalculatedValue
            id="total$Depreciation"
            label="Total $ Depreciation"
            value="$0.00"
          />
          <CalculatedValue id="itemOverage" label="Item Overage" value="$0.00" />
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
