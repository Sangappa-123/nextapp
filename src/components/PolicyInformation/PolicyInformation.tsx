"use client";

import React from "react";
import ClaimPolicyInformation from "./policyInformation.module.scss";
import GenericInput from "../common/GenericInput/index";
import clsx from "clsx";
import SelectCheckBox from "../common/selectCheckBox/SelectCheckBox";

function ClaimpolicyInformation({ register, error }) {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <div>
      {/* <form className="col-lg-4 col-md-6 col-12 d-flex flex-column"> */}
      <div className="row mt-3">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2 ml-8")}>
          <label className={ClaimPolicyInformation.labelEmail}>Email</label>
        </div>
        <div className={clsx("col-lg-3 col-md-4 col-sm-12 mt-2")}>
          <GenericInput
            placeholder="E-mail"
            // className={ClaimPolicyInformation.email}
            {...register("email")}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2")}>
          <label className={ClaimPolicyInformation.label}>
            <span style={{ color: "red" }}>*</span> First Name
          </label>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-12">
          <GenericInput
            placeholder="First Name"
            showError={error["firstname"]}
            errorMsg={error?.firstname?.message}
            // className={ClaimPolicyInformation.firstName}
            {...register("firstname")}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2")}>
          <label className={ClaimPolicyInformation.label}>
            {" "}
            <span style={{ color: "red" }}>*</span> Last Name
          </label>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12">
          <GenericInput
            placeholder="Last Name"
            showError={error["lastname"]}
            errorMsg={error?.lastname?.message}
            // className={ClaimPolicyInformation.lastName}
            {...register("lastname")}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2")}>
          <label className={ClaimPolicyInformation.labelMobile}>Mobile Number</label>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12">
          <GenericInput
            placeholder="XXX-XXX-XXXX"
            // className={ClaimPolicyInformation.mobile}
            {...register("mobilenumber")}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2")}>
          <label className={ClaimPolicyInformation.labelSecondaryPhone}>
            Secondary Phone Number
          </label>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12">
          <GenericInput
            placeholder="XXX-XXX-XXXX"
            // className={ClaimPolicyInformation.secondaryPhoneNumber}
            {...register("phonenumber")}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2")}>
          <label className={ClaimPolicyInformation.labelAddress}>Address</label>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12">
          <GenericInput
            placeholder="Street Address 1"
            // className={ClaimPolicyInformation.address}
            {...register("address")}
          />
          <GenericInput
            placeholder="Street Address 2"
            // className={ClaimPolicyInformation.addressOne}
            {...register("address")}
          />
          <GenericInput
            placeholder="City / Town"
            // className={ClaimPolicyInformation.addressSecond}
            {...register("address")}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className={clsx("col-lg-4 col-md-2 col-sm-12 mt-4 d-flex")}>
          <div className="row">
            <label className="col-lg-8">
              <span style={{ color: "red" }}>*</span> State
            </label>
            <SelectCheckBox options={options} />
          </div>
        </div>
        <div className={clsx("col-lg-4 col-md-2 col-sm-12 mt-4 d-flex")}>
          <label>
            <span style={{ color: "red" }}>*</span> Zip Code
          </label>
          <GenericInput
            placeholder="Zip Code"
            {...register("zipcode")}
            showError={error["zipcode"]}
            errorMsg={error?.zipcode?.message}
          />{" "}
        </div>
      </div>
    </div>
  );
}

export default ClaimpolicyInformation;
