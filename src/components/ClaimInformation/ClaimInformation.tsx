import React from "react";
import GenericInput from "../common/GenericInput/index";
import clsx from "clsx";
import SelectCheckBox from "../common/selectCheckBox/SelectCheckBox";
import ClaimInformationStyle from "./claimInformation.module.scss";

function ClaimInformation() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <div>
      {/* <form className="col-lg-4 col-md-6 col-12 d-flex flex-column"> */}
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>
            {" "}
            <span style={{ color: "red" }}>*</span>Claim#
          </label>
        </div>
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2")}>
          <GenericInput
            placeholder="Claim#"
            //   className={ClaimInformationStyle.claim}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>Claim Date</label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-12">
          <GenericInput
            placeholder="First Name"
            type="Date"
            // className={ClaimInformationStyle.claimDate}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>
            <span style={{ color: "red" }}>*</span> Insurance Company
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-12">
          <GenericInput
            placeholder="Insurance Company"
            // className={ClaimInformationStyle.insuranceCompany}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>
            <span style={{ color: "red" }}>*</span>Adjusters Name
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-12">
          <GenericInput
            placeholder="Adjuster's Name"
            // className={ClaimInformationStyle.mobile}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>Loss/Damage Type </label>
        </div>
        <div className={clsx("col-lg-2 col-md-2 col-sm-12")}>
          {" "}
          <SelectCheckBox options={options} className="selectOptions" />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>Claim Description</label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-12">
          <GenericInput
          //    className={ClaimInformationStyle.address}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>
            <span style={{ color: "red" }}>*</span>Claim Deductible
          </label>
        </div>
        <div className={clsx("col-lg-2 col-md-2 col-sm-12")}>
          <GenericInput
            placeholder="$999.00"
            // className={ClaimInformationStyle.addressOne}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>
            <span style={{ color: "red" }}>*</span>Min. $ Item to Price
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-12">
          <GenericInput
            placeholder="$88.00"
            //   className={ClaimInformationStyle.addressSecond}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>
            <span style={{ color: "red" }}>*</span>Tax Rate %
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-12">
          <GenericInput
            placeholder="99"
            //   className={ClaimInformationStyle.addressSecond}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>
            <span style={{ color: "red" }}>*</span>Content Limits
          </label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-12">
          <GenericInput
            placeholder="$0.00"
            //   className={ClaimInformationStyle.addressSecond}
          />
        </div>
      </div>
    </div>
  );
}

export default ClaimInformation;
