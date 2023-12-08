import React, { useState, useEffect, useRef } from "react";
import { Controller } from "react-hook-form";
import GenericInput from "../common/GenericInput/index";
import clsx from "clsx";
import ClaimInformationStyle from "./claimInformation.module.scss";
import Tooltip from "../common/ToolTip/index";
import GenericSelect from "../common/GenericSelect/index";
import DateTimePicker from "../common/DateTimePicker/index";
// import Cards from "../common/Cards/index";
import {
  fetchHomeOwnersType,
  fetchLossType,
  validateClaim,
} from "@/services/ClaimService";

function ClaimInformation({
  register,
  error,
  control,
  setError,
  clearErrors,
  homeOwnerTypeOptions,
  getValues,
}: any) {
  // const options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];
  const [topping, setTopping] = useState("yes");
  const [lossType, setLossType] = useState([]);
  // const [file, setFile] = useState(null);
  const [selectedDate, setSelectedDate] = useState<React.SetStateAction<null> | Date>(
    null
  );

  const handleDateChange = (date: React.SetStateAction<null> | Date) => {
    setSelectedDate(date);
  };

  const onOptionChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setTopping(e.target.value);
    console.log("topping", e.target.value);
    // if (e.target.value === "no") {
    //   setDisabled(!disabled);
    // }
  };

  const claimHandler = (claim: string) => {
    if (!claim) return;
    validateClaim({
      claimNumber: claim,
    })
      .then((res) => {
        console.log("claim res", res, res.data);
        if (res.data)
          setError("claim", {
            type: "manual",
            message: "The claim number already exists",
          });
        // else if (res.data === null) {
        //   setError("claim", {
        //     type: "manual",
        //     message: "p;ease enter the claims",
        //   });
        else {
          clearErrors("claim");
        }
      })
      .catch((error: any) => console.log("claim error", error));
    // console.log("e", e.target.value);
  };
  useEffect(() => {
    fetchLossType()
      .then((res) => {
        console.log("loss", res);
        setLossType(res.data);
        // console.log(
        //   "stateObject",
        //   res.data.map((item: { state: string }) => {
        //     item;
        //   })
        // );

        // setStateId(res.data.address.state.id);
      })
      .catch((error) => console.log(" Losserrr", error));
  }, []);
  const { onBlur: blurHandler, ...rest } = register("claim");
  console.log("rest", { ...rest });

  const fileOpen = (e: any) => {
    console.log("file", e.target.files);
    // var files = e.target.files;
    // for (var i = 0; i < files.length; i++) {
    //   var file = files[i];
    //   var reader = new FileReader();
    //   reader.file = file;
    //   reader.fileName = files[i].name;
    //   reader.fileType = files[i].type;
    //   reader.fileExtension = files[i].name.substr(files[i].name.lastIndexOf("."));
    //   reader.onload = scope.ItemContentsImageLoaded;
    //   reader.readAsDataURL(file);
    // }
  };

  const coverageApiCall = (stateId: number, policyTypeId: number) => {
    const [state, homeOwnerPlocyType] = getValues(["state", "homeOwnersPolicyType"]);
    console.log("getValues", state?.id, homeOwnerPlocyType?.id);
    stateId = state?.id;
    policyTypeId = homeOwnerPlocyType?.id;
    fetchHomeOwnersType(stateId, policyTypeId)
      .then((res) => {
        console.log("coverage", res);
      })
      .catch((error) => console.log(" Losserrr", error));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
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
            {...rest}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
              blurHandler(e);
              console.log("e", e.target.value);
              claimHandler(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>Claim Date</label>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-12">
          {/* <GenericInput
            placeholder="First Name"
            type="Date"
            {...register("claimDate")}
            // className={ClaimInformationStyle.claimDate}
          /> */}
          <Controller
            control={control}
            name="claimDate"
            rules={{ required: true }}
            // {...register("claimDate")}
            render={({ field: { onChange: fieldOnChange, ...rest } }: any) => {
              // console.log("console", { ...rest });
              return (
                <DateTimePicker
                  name="claimDate"
                  // labelText="Select"
                  // isRequired={true}
                  placeholderText="12/06/2023"
                  showError={true}
                  errorMsg="kkkk"
                  errorMsgClassname="erressage"
                  labelClassname="labeext"
                  formControlClassname="forontrol"
                  value={selectedDate}
                  onChange={(e) => {
                    fieldOnChange(e);
                    console.log("date", e?.toDateString());
                    handleDateChange(e);
                  }}
                  dateFormat="MM/dd/yyyy"
                  // showTimeSelect={true}
                  enableTime={true}
                  time_24hr={true}
                  minDate={new Date()}
                  maxDate={null}
                  {...rest}
                />
              );
            }}
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
            render={({ field: { onChange: fieldOnChange, ...rest } }: any) => {
              // console.log("console", { ...rest });
              return (
                <GenericSelect
                  options={lossType}
                  {...rest}
                  onChange={(e: any) => {
                    fieldOnChange(e);
                    console.log("onselect", e?.name);
                  }}
                  getOptionLabel={(option: { name: any }) => option.name}
                  getOptionValue={(option: { id: any }) => option.id}
                />
              );
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
            <div className="col-lg-10 mt-1">
              <label className={ClaimInformationStyle.label}>
                <span style={{ color: "red" }}>*</span>Min. $ Item to Price
                <div className="col-lg-2 col-md-2 col-sm-12"></div>
              </label>{" "}
            </div>
            <div className="col-lg-2 mt-2">
              <Tooltip
                text={
                  <span>
                    The minimum dollar value of the item <br /> needs to be priced by the
                    carrier.Anything
                    <br /> less than this can be accepted at the <br /> items face value
                  </span>
                }
              />
            </div>
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
        <div className="col-2">
          <Controller
            control={control}
            name="homeOwnersPolicyType"
            // rules={{ required: true }}
            render={({ field: { onChange: onSelect, ...rest } }: any) => {
              console.log("console", { ...rest });
              return (
                <GenericSelect
                  options={homeOwnerTypeOptions}
                  // {...register("homeOwnersPolicyType")}
                  {...rest}
                  disabled={!homeOwnerTypeOptions.length}
                  getOptionLabel={(option: { typeName: any }) => option.typeName}
                  getOptionValue={(option: { id: any }) => option.id}
                  onChange={(e: any) => {
                    onSelect(e);
                    coverageApiCall(e.stateId, e.policyTypeId);
                  }}
                  // inputFieldClassname="hideInputArrow"
                  // classNames={{
                  //   control: () => ClaimInformationStyle.disabledSelect,
                  // }}
                />
              );
            }}
          />
        </div>
        {/* {
          <div>
            <Cards className={ClaimInformationStyle.cards}></Cards>
          </div>
        } */}
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>
            <span style={{ color: "red" }}>*</span>Attachments
          </label>
        </div>
        <div className={clsx("col-2 mt-2")}>
          {" "}
          <label
            onClick={() => fileInputRef?.current && fileInputRef?.current?.click()}
            role="button"
            className={ClaimInformationStyle.fileType}
          >
            Click to add attachments
          </label>
          {/* <input type="file" />  */}
          <input
            type="file"
            className={ClaimInformationStyle.file}
            onChange={(e) => fileOpen(e)}
            hidden
            ref={fileInputRef}
            accept=".png,.jpg,.jpeg,.pdf"
          />
        </div>
      </div>
    </div>
  );
}

export default ClaimInformation;
