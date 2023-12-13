import GenericButton from "@/components/common/GenericButton";
import React from "react";
import webComparablesStyle from "../webComparables.module.scss";

function PriceLimitComparable() {
  return (
    <div className={webComparablesStyle.limitSearchSection}>
      <div className={webComparablesStyle.inputSection}>
        <div className={webComparablesStyle.formGroup}>
          <label className={webComparablesStyle.priceRangeLabel} htmlFor="priceFrom">
            $
          </label>
          <input
            autoComplete="off"
            className="hideInputArrow"
            type="number"
            placeholder="Price From"
            id="priceFrom"
          />
        </div>
        <div>To</div>
        <div className={webComparablesStyle.formGroup}>
          <label className={webComparablesStyle.priceRangeLabel} htmlFor="priceTo">
            $
          </label>
          <input
            autoComplete="off"
            className="hideInputArrow"
            id="priceTo"
            type="number"
            placeholder="Price To"
          />
        </div>
      </div>
      <GenericButton label="Go" size="medium" />
    </div>
  );
}

export default PriceLimitComparable;
