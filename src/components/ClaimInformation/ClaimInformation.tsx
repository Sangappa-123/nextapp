import React, { useState, useEffect, useRef } from "react";
import { Controller } from "react-hook-form";
import GenericInput from "../common/GenericInput/index";
import clsx from "clsx";
import ClaimInformationStyle from "./claimInformation.module.scss";
import Tooltip from "../common/ToolTip/index";
import GenericSelect from "../common/GenericSelect/index";
import DateTimePicker from "../common/DateTimePicker/index";
import Cards from "../common/Cards/index";
// import SearchBoxAssignItems from "./SearchBoxAssignItems";
import {
  fetchHomeOwnersType,
  fetchLossType,
  validateClaim,
  getCategories,
} from "@/services/ClaimService";
import CategoryCoverage from "./CategoryCoverage";

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
  const [Data, setData] = useState([]);
  const [hide, setHide] = useState(false);
  // const [lists, setList] = useState(Data);
  const [show, setShow] = useState(false);
  // const [filteredData] = useState([]);
  const [searchQuery] = useState("");
  const [categoriesData, setCategoriesData] = useState([]);

  const [selectedDate, setSelectedDate] = useState<React.SetStateAction<null> | Date>(
    null
  );

  console.log("homeOwnerTypeOptions", homeOwnerTypeOptions);
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
        // const isValidInput: RegExp = /^[a-zA-Z0-9\-/]*$/;

        console.log("claim res", res, res.data);
        if (res.data)
          setError("claim", {
            type: "manual",
            message: "The claim number already exists",
          });
        // else if (res.data != isValidInput)
        //   setError("claim", {
        //     type: "manual",
        //     message: "enter the claim correctly",
        //   });
        else {
          clearErrors("claim");
        }
      })
      .catch((error: any) => console.log("claim error", error));
    // console.log("e", e.target.value);
  };

  const handleDelete = (categoryId: any) => {
    console.log("categoty.id", categoryId);
    const newList = Data.filter(
      (li: { categoryId: any }) => li.categoryId !== categoryId
    );
    console.log("newList", newList);

    setData(newList);
  };
  useEffect(() => {
    fetchLossType().then((res) => {
      console.log("loss", res);
      setLossType(res.data);
      // console.log(
      //   "stateObject",
      //   res.data.map((item: { state: string }) => {
      //     item;
      //   })
      // );

      // setStateId(res.data.address.state.id);
    });
    getCategories()
      .then((res: any) => {
        console.log("categoriesapi", res);
        setCategoriesData(res.data);
      })
      .catch((error) => console.log(" Losserrr", error));

    // setFilteredData(
    //   categoriesData.filter((el) =>
    //     el.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
    //   )
    // );
    // console.log("setFilteredData", filteredData);
  }, []);

  const handleInputChange = (e: any) => {
    setData((prev) => {
      // prev.push(e);
      console.log("prev", prev);
      return [...prev, e];
    });
    console.log("ee", e);
  };

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
        setData(res.data);
        console.log("namme", Data);
      })
      .catch((error) => console.log(" Losserrr", error));
    setHide(true);
  };

  const handleShow = () => {
    setShow(true);
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
        <div className={clsx("col-lg-3 col-md-3 col-sm-12")}>
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
        <div className="col-lg-3 col-md-3 col-sm-12">
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
                  {...register("claimDate")}
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
        <div className="col-lg-3 col-md-3 col-sm-12">
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
        <div className="col-lg-3 col-md-3 col-sm-12">
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
        <div className={clsx("col-lg-3 col-md-3 col-sm-12")}>
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
        <div className="col-lg-3 col-md-3 col-sm-12">
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
        <div className={clsx("col-lg-3 col-md-3 col-sm-12")}>
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
        <div className="col-lg-3 col-md-3 col-sm-12">
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
        <div className="col-lg-3 col-md-3 col-sm-12">
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
            labelClassname={ClaimInformationStyle.labelClassname}
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
            labelClassname={ClaimInformationStyle.labelClassname}
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
        <div className="col-lg-3 col-md-3 col-sm-12">
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
                    coverageApiCall(e?.stateId, e?.policyTypeId);
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
      </div>
      <div className="row mt-3 align-items-center">
        {hide ? (
          <>
            <div className={clsx("col-lg-2 col-md-2 col-sm-12 mt-2 text-right")}>
              <label className={ClaimInformationStyle.label}>
                <span style={{ color: "red" }}>*</span>Special Limit
              </label>
            </div>
            <div className={clsx("col-2 mt-2", ClaimInformationStyle.specialLimit)}>
              {" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(getValues("homeOwnersPolicyType")?.specialLimit)}
            </div>
            <div>
              <Cards className={clsx("mt-8", ClaimInformationStyle.cards)}>
                <div className="row">
                  <div className={clsx("col-lg-4", ClaimInformationStyle.coverages)}>
                    Category Coverages
                  </div>
                  <div className={clsx("col-lg-1", ClaimInformationStyle.category)}>
                    Category
                  </div>
                  <div
                    className={clsx("col-sm-2", ClaimInformationStyle.aggregateCoverage)}
                  >
                    Aggregate Coverage
                  </div>
                  <div className={clsx("col-sm-2", ClaimInformationStyle.itemLimit)}>
                    Individual Item Limit
                  </div>
                </div>
                <div className="row">
                  <div className=""></div>
                  <>
                    <ul>
                      {Data.map((value: any, i) => (
                        <CategoryCoverage
                          data={value}
                          key={i}
                          handleDelete={handleDelete}
                          register={register}
                        />
                      ))}
                    </ul>
                    {/* </div> */}
                  </>
                </div>
                {show && (
                  <div
                    className={clsx(
                      "row ml-12",
                      ClaimInformationStyle.specialCategoryDiv
                    )}
                  >
                    <div className={clsx("col-lg-4 ", ClaimInformationStyle.search)}>
                      {/* <SearchBoxAssignItems /> */}

                      <GenericSelect
                        placeholder="Enter Category"
                        value={searchQuery}
                        name="Category"
                        options={categoriesData}
                        getOptionLabel={(option: { categoryName: any }) =>
                          option?.categoryName
                        }
                        getOptionValue={(option: { categoryId: any }) =>
                          option.categoryId
                        }
                        onChange={handleInputChange}
                      />
                    </div>
                    <div
                      className={clsx(
                        "col-lg-3 col-md-3 col-sm-3",
                        ClaimInformationStyle.categoryInput
                      )}
                    >
                      <GenericInput
                        placeholder="$0.00"
                        type="number"
                        inputFieldClassname="hideInputArrow"
                        onChange={(e: any) => e.target.value}
                      />
                    </div>
                    <div
                      className={clsx(
                        "col-lg-3",
                        ClaimInformationStyle.specialcategoryInput
                      )}
                    >
                      <GenericInput
                        placeholder="$0.00"
                        type="number"
                        inputFieldClassname="hideInputArrow"
                        onChange={(e: any) => e.target.value}
                      />
                    </div>
                  </div>
                )}
                <button
                  type="button"
                  className={clsx(ClaimInformationStyle.specialCategory)}
                  onClick={() => handleShow()}
                >
                  Add another special category
                </button>
              </Cards>
            </div>
          </>
        ) : (
          ""
        )}
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
