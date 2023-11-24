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
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2 ml-8 text-right")}>
          <label className={ClaimPolicyInformation.label}>Email</label>
        </div>
        <div className={clsx("col-lg-3 col-md-4 col-sm-12 mt-2")}>
          <GenericInput
            placeholder="E-mail"
            // className={ClaimPolicyInformation.email}
            {...register("email")}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2 text-right")}>
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
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2 text-right")}>
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
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimPolicyInformation.label}>Mobile Number</label>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12">
          <GenericInput
            placeholder="XXX-XXX-XXXX"
            // className={ClaimPolicyInformation.mobile}
            {...register("mobilenumber")}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimPolicyInformation.label}>Secondary Phone Number</label>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12">
          <GenericInput
            placeholder="XXX-XXX-XXXX"
            // className={ClaimPolicyInformation.secondaryPhoneNumber}
            {...register("phonenumber")}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-start">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimPolicyInformation.label}>Address</label>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12">
          <GenericInput
            placeholder="Street Address 1"
            formControlClassname="mb-3"
            {...register("address")}
          />
          <GenericInput
            placeholder="Street Address 2"
            formControlClassname="mb-3"
            {...register("address")}
          />
          <GenericInput
            placeholder="City / Town"
            formControlClassname="mb-3"
            {...register("address")}
          />
        </div>
      </div>
      <div className="row align-items-center">
        <div className={clsx("col-lg-3 col-md-2 col-sm-12 d-flex")}>
          <div className="col-12 row align-items-center">
            <label className={clsx("col-8 text-right", ClaimPolicyInformation.label)}>
              <span style={{ color: "red" }}>*</span> State
            </label>
            <SelectCheckBox options={options} className="col-4" />
          </div>
        </div>
        <div
          className={clsx(
            "col-lg-2 col-md-2 col-sm-12 d-flex align-items-center justify-content-between"
          )}
        >
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
