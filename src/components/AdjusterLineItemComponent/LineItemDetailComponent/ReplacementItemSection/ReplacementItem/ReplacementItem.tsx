import { unknownObjectType } from "@/constants/customTypes";
import Image from "next/image";
import React from "react";
import replacementItemStyle from "./replacementItemStyle.module.scss";
import GenericInput from "@/components/common/GenericInput";
import clsx from "clsx";
import SettlementSummarySection from "./SettlementSummarySection";

interface replaceItemInterface {
  itemDetail: unknownObjectType;
}

function ReplacementItem(props: replaceItemInterface) {
  const { itemDetail } = props;
  console.log("---------", itemDetail);
  return (
    <div className={replacementItemStyle.root}>
      <div className={replacementItemStyle.descriptionDiv}>
        <div className={replacementItemStyle.imageDiv}>
          <Image
            unoptimized={true}
            src={itemDetail?.imageURL}
            alt="products"
            fill={true}
            sizes="100%"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className={replacementItemStyle.formGroup}>
          <div className={replacementItemStyle.formControl}>
            <label htmlFor="desc">Description</label>
            <textarea
              className={replacementItemStyle.descField}
              rows={5}
              id="desc"
              value={itemDetail?.description}
              cols={20}
              placeholder="Description"
            />
          </div>
          <div className={replacementItemStyle.formControl}>
            <label htmlFor="source">Source</label>
            <GenericInput id="source" value={itemDetail?.buyURL} placeholder="Source" />
          </div>
        </div>
      </div>
      <div className={replacementItemStyle.replaceDetailDiv}>
        <div
          className={clsx(
            replacementItemStyle.formGroup,
            replacementItemStyle.replaceDetailFields
          )}
        >
          <div className={replacementItemStyle.formControl}>
            <label htmlFor="unitCost">Unit Cost</label>
            <GenericInput id="unitCost" value={14.95} placeholder="Unit Cost" />
          </div>
          <div className={replacementItemStyle.formControl}>
            <label htmlFor="qty">Replacement Quantity</label>
            <GenericInput id="qty" value={2} placeholder="Replacement Quantity" />
          </div>
          <div className={replacementItemStyle.formControl}>
            <label htmlFor="tax">Taxes(12%)</label>
            <div id="tax">$0.00</div>
          </div>
        </div>
        <div>
          <div className={replacementItemStyle.formControl}>
            <label htmlFor="totalReplaceCost">Total Replacement Cost</label>
            <div id="totalReplaceCost">$0.00</div>
          </div>
        </div>
      </div>
      <SettlementSummarySection />
    </div>
  );
}

export default ReplacementItem;
