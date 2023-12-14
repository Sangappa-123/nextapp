import GenericButton from "@/components/common/GenericButton";
import React, { useState } from "react";
import webComparablesStyle from "../webComparables.module.scss";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "@/store/store";

const PriceLimitComparable: React.FC<connectorType> = (props) => {
  const { priceFrom, priceTo } = props;
  const [pFrom, setPFrom] = useState(priceFrom);
  const [pTo, setPTo] = useState(priceTo);

  const handlePriceFromChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setPFrom(e.target.value);
  };

  const handlePriceToChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setPTo(e.target.value);
  };

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
            value={pFrom}
            onChange={handlePriceFromChange}
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
            value={pTo}
            onChange={handlePriceToChange}
          />
        </div>
      </div>
      <GenericButton label="Go" size="medium" />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  priceFrom: state.lineItemDetail.webSearch.priceFrom,
  priceTo: state.lineItemDetail.webSearch.priceTo,
});

const connector = connect(mapStateToProps, null);
type connectorType = ConnectedProps<typeof connector>;
export default connector(PriceLimitComparable);
