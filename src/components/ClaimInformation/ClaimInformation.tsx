import React, { useState } from "react";
import { Controller } from "react-hook-form";
import GenericInput from "../common/GenericInput/index";
import clsx from "clsx";
import ClaimInformationStyle from "./claimInformation.module.scss";
import Tooltip from "../common/ToolTip/index";
import GenericSelect from "../common/GenericSelect/index";

function ClaimInformation({ register, error, control }) {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [topping, setTopping] = useState("yes");
  // const [disabled, setDisabled] = useState(false);

  const onOptionChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setTopping(e.target.value);
    console.log("topping", e.target.value);
    // if (e.target.value === "no") {
    //   setDisabled(!disabled);
    // }
  };

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
            showError={error["claim"]}
            errorMsg={error?.claim?.message}
            {...register("claim")}
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
            {...register("claimDate")}
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
            {...register("insuranceCompany")}
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
            {...register("adjusterName")}
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
          <Controller
            control={control}
            name="lossType"
            rules={{ required: true }}
            render={({ field: { ...rest } }: any) => {
              // console.log("console", { ...rest });
              return <GenericSelect options={options} {...rest} />;
            }}
          />
          {/* <Controller
            control={control}
            name={selectName}
            rules={{ required: true }}
            render={({ field: { ...rest } }: any) => (
              <GenericSelect
                labelText={selectLabel}
                placeholder={selectPlaceholder}
                options={options}
                showError={errors[selectName]}
                errorMsg={errors[selectName]?.message}
                name={selectName}
                {...rest}
              />
            )}
          /> */}
          {/* <SelectCheckBox options={options} className="selectOptions" /> */}
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>Claim Description</label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-12">
          <textarea
            {...register("claimDescription")}
            className={ClaimInformationStyle.textArea}
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
            type="number"
            inputFieldClassname="hideInputArrow"
            {...register("claimDeductible")}

            // className={ClaimInformationStyle.addressOne}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2 text-right")}>
          <div className="row d-flex">
            <label className={ClaimInformationStyle.label}>
              <span style={{ color: "red" }}>*</span>Min. $ Item to Price
              <div className="col-lg-2 col-md-2 col-sm-12">
                <Tooltip text={"hello"} />
              </div>
            </label>{" "}
          </div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-12">
          <GenericInput
            placeholder="$88.00"
            type="number"
            inputFieldClassname="hideInputArrow"
            showError={error["minItemPrice"]}
            errorMsg={error?.minItemPrice?.message}
            {...register("minItemPrice")}

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
            type="number"
            inputFieldClassname="hideInputArrow"
            showError={error["taxRate"]}
            errorMsg={error?.taxRate?.message}
            // disabled={disabled}
            disabled={topping === "no"}
            {...register("taxRate")}
          />
        </div>
        <div
          className={clsx("col-lg-4 col-md-2 col-sm-12 mt-2 d-flex align-items-center")}
        >
          <label className={ClaimInformationStyle.label}>
            <span style={{ color: "red" }}>*</span>Apply Taxes
          </label>
          <GenericInput
            type="radio"
            formControlClassname={ClaimInformationStyle.formControl}
            inputFieldWrapperClassName={ClaimInformationStyle.wrapper}
            inputFieldClassname={ClaimInformationStyle.inputField}
            value="yes"
            label="Yes"
            // id="yes"
            // name="applyTax"
            checked={topping === "yes"}
            onChange={onOptionChange}
          />
          {/* <label className="mt-4">No</label> */}
          <GenericInput
            type="radio"
            formControlClassname={ClaimInformationStyle.formControl1}
            inputFieldWrapperClassName={ClaimInformationStyle.wrapper1}
            inputFieldClassname={ClaimInformationStyle.inputField1}
            value="no"
            label="No"
            // id="no"
            checked={topping === "no"}
            // name="applyTax"
            onChange={onOptionChange}
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
            type="number"
            inputFieldClassname="hideInputArrow"
            showError={error["contentLimits"]}
            errorMsg={error?.contentLimits?.message}
            errorMsgClassname={ClaimInformationStyle.errorMessage}
            {...register("contentLimits")}

            //   className={ClaimInformationStyle.addressSecond}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>
            <span style={{ color: "red" }}>*</span>Home Owners Policy Type
          </label>
        </div>
        <div className="col-1">
          <Controller
            control={control}
            name="homeOwnersPolicyType"
            rules={{ required: true }}
            render={({ field: { ...rest } }: any) => {
              console.log("console", { ...rest });
              return (
                <GenericSelect
                  options={options}
                  // {...register("homeOwnersPolicyType")}
                  {...rest}
                  disabled={"homeOwnersPolicyType"}
                />
              );
            }}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>
            <span style={{ color: "red" }}>*</span>Attachments
          </label>
        </div>
        <div className="col-1">
          <input
            type="file"
            // value="Click to add attachments"
            className={ClaimInformationStyle.file}
          />{" "}
          {/* <a onClick={openFile}>Click to add attachments</a> */}
        </div>
      </div>
    </div>
  );
}

export default ClaimInformation;
