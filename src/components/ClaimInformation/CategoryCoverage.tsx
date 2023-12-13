import React, { useState } from "react";
import GenericInput from "../common/GenericInput/index";
import clsx from "clsx";
import ClaimInformationStyle from "./claimInformation.module.scss";
// import SearchBoxAssignItems from "./SearchBoxAssignItems";
import { IoMdCloseCircle } from "react-icons/io";

function CategoryCoverage(props: any) {
  const [coverageValue, setCoverageValue] = useState(
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(props.data.coverageLimit) ?? 0.0
  );
  const [individualLimitValue, setindividualLimitValue] = useState(
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(props.data.individualItemLimit) ?? 0.0
  );

  const checkData = (e: any) => {
    console.log("target", e.target.value);
    setCoverageValue(
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(e.target.value)
    );
  };

  const checkIndividualData = (e: any) => {
    setindividualLimitValue(
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(e.target.value)
    );
  };

  return (
    <div className={clsx("row", ClaimInformationStyle.categoryName)}>
      <button className={clsx("ml-8", ClaimInformationStyle.value)}>
        {props.data.categoryName}
      </button>
      <div className={clsx("col-lg-2 ml-12", ClaimInformationStyle.aggregateStyle)}>
        <GenericInput
          type="text"
          value={coverageValue ?? 0}
          inputFieldClassname={ClaimInformationStyle.aggregateStyle}
          onClick={
            () => setCoverageValue(props.data.coverageLimit)
            // if(props.data.coverageLimit === null)
            // setCoverageValue("000")
          }
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setCoverageValue(e.target.value)
          }
          onBlur={(e: any) => checkData(e)}

          //   {...register("aggregateCoverage")}
        />
      </div>
      <div className={clsx("col-lg-2", ClaimInformationStyle.itemLimitSTyle)}>
        <GenericInput
          type="text"
          //   {...register("indivudualItemLimit")}
          value={individualLimitValue ?? 0}
          inputFieldClassname={ClaimInformationStyle.itemLimitSTyle}
          onClick={() => setindividualLimitValue(props.data.individualItemLimit)}
          onChange={(e: { target: { value: any } }) =>
            setindividualLimitValue(e.target.value)
          }
          onBlur={(e: any) => checkIndividualData(e)}
        />
      </div>

      <button
        type="button"
        className={clsx(ClaimInformationStyle.deleteButton)}
        onClick={() => props.handleDelete(props.data.categoryId)}
      >
        <IoMdCloseCircle className={ClaimInformationStyle.closeCircle} />
      </button>
    </div>
  );
}

export default CategoryCoverage;
