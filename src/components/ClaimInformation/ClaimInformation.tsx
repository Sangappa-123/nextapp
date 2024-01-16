import React, { useState, useEffect, useRef } from "react";
import { Controller } from "react-hook-form";
import GenericInput from "../common/GenericInput/index";
import clsx from "clsx";
import ClaimInformationStyle from "./claimInformation.module.scss";
import Tooltip from "../common/ToolTip/index";
import GenericSelect from "../common/GenericSelect/index";
import DateTimePicker from "../common/DateTimePicker/index";
import Cards from "../common/Cards/index";
import {
  fetchHomeOwnersType,
  fetchLossType,
  validateClaim,
  getCategories,
} from "@/services/ClaimService";
import { IoClose } from "react-icons/io5";
import CategoryCoverage from "./CategoryCoverage";
import useTranslation from "@/hooks/useTranslation";
import { newClaimTransalateType } from "@/translations/newClaimTransalate/en";

import ImagePreviewModal from "../AddItemModal/ImagePreviewModal/index";
import AttachementPreview from "../AddItemModal/AttachementPreview/index";

interface MyObject {
  imgType: string;
  url: string;
}

function ClaimInformation({
  register,
  error,
  control,
  setError,
  clearErrors,
  homeOwnerTypeOptions,
  getValues,
}: any) {
  const [topping, setTopping] = useState("yes");
  const [lossType, setLossType] = useState([]);
  const [Data, setData] = useState([]);
  const [hide, setHide] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [imagePreviewType, setImagePreviewType] = useState("");
  const [show, setShow] = useState(false);
  // const [filteredData] = useState([]);
  const [searchQuery] = useState("");
  const [categoriesData, setCategoriesData] = useState([]);

  const [selectedDate, setSelectedDate] = useState<React.SetStateAction<null> | Date>(
    null
  );

  const handleDateChange = (date: React.SetStateAction<null> | Date) => {
    setSelectedDate(date);
  };

  const onOptionChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setTopping(e.target.value);
  };

  const claimHandler = (claim: any) => {
    if (!claim) return;
    validateClaim({
      claimNumber: claim,
    })
      .then((res) => {
        const isValidInput: RegExp = /^[a-zA-Z0-9/-]+$/;
        if (res.data)
          setError("claim", {
            type: "manual",
            message: "The claim number already exists",
          });
        else if (claim.match(isValidInput) === null)
          setError("claim", {
            type: "manual",
            message: "enter the claim correctly",
          });
        else {
          clearErrors("claim");
        }
      })
      .catch((error: any) => console.log("claim error", error));
  };

  const handleDelete = (categoryId: any) => {
    const newList = Data.filter(
      (li: { categoryId: any }) => li.categoryId !== categoryId
    );

    setData(newList);
  };
  useEffect(() => {
    fetchLossType().then((res) => {
      setLossType(res.data);
    });
    getCategories()
      .then((res: any) => {
        setCategoriesData(res.data);
      })
      .catch((error) => console.log(" Losserrr", error));
  }, []);

  const handleInputChange = (e: any) => {
    setData((prev): any => {
      return [...prev, e];
    });
  };

  const { onBlur: blurHandler, onChange: claimChange, ...rest } = register("claim");

  const coverageApiCall = (stateId: number, policyTypeId: number) => {
    const [state, homeOwnerPlocyType] = getValues(["state", "homeOwnersPolicyType"]);
    stateId = state?.id;
    policyTypeId = homeOwnerPlocyType?.id;
    fetchHomeOwnersType(stateId, policyTypeId)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(" Losserrr", error));
    setHide(true);
  };
  const handleUpload = (event: any) => {
    const imageUrl = URL.createObjectURL(event.target.files[0]);
    let selectedImageArr: any[];
    if (event.target.files[0].type == "application/pdf") {
      const newObj: MyObject = {
        imgType: "pdf",
        url: imageUrl,
      };
      selectedImageArr = [newObj];
    } else {
      const newObj: MyObject = {
        imgType: "jpg",
        url: imageUrl,
      };
      selectedImageArr = [newObj];
    }
    setDocs((prev: any) => [...prev, ...selectedImageArr]);
    event.target.value = null;
  };

  const handleShow = () => {
    setShow(true);
  };
  const [docs, setDocs] = useState<string[]>([]);

  const [zoomLevel, setZoomLevel] = useState(100);

  const handleDeleteImage = (index: number) => {
    const docArray = docs.filter((elem, ind) => {
      if (ind !== index) {
        return elem;
      }
    });
    setDocs([...docArray]);
  };

  const handleZoomIn = () => {
    setZoomLevel(zoomLevel + 5);
  };

  const handleZoomOut = () => {
    setZoomLevel(zoomLevel - 5);
  };

  const handleZoomMid = () => {
    setZoomLevel(100);
  };

  const openModal = (url: string, imageType: string) => {
    setImagePreviewType(imageType);
    setImagePreviewUrl(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    translate,
    loading,
  }: { translate: newClaimTransalateType | undefined; loading: boolean } =
    useTranslation("newClaimTransalate");
  if (loading) {
    return null;
  }
  return (
    <div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-3 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>
            {" "}
            <span style={{ color: "red" }}>*</span> {translate?.claim ?? ""}
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
              const claimValue = e.target.value;

              claimHandler(claimValue);
            }}
            onChange={(e: any) => {
              claimChange(e);
            }}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-3 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>
            {translate?.claimDate ?? ""}
          </label>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12">
          <Controller
            control={control}
            name="claimDate"
            rules={{ required: true }}
            defaultValue={new Date()}
            render={({ field: { onChange: fieldOnChange, ...rest } }: any) => {
              return (
                <DateTimePicker
                  name="claimDate"
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
                  enableTime={true}
                  time_24hr={true}
                  minDate={null}
                  maxDate={null}
                  {...rest}
                />
              );
            }}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-3 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>
            <span style={{ color: "red" }}>*</span> {translate?.InsuranceCompany ?? ""}
          </label>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12">
          <GenericInput
            placeholder="Insurance Company"
            {...register("insuranceCompany")}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-3 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>
            <span style={{ color: "red" }}>*</span>
            {translate?.adjusterName ?? ""}
          </label>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12">
          <GenericInput placeholder="Adjuster's Name" {...register("adjusterName")} />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-3 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>
            {" "}
            {translate?.lossDamageType ?? ""}
          </label>
        </div>
        <div className={clsx("col-lg-3 col-md-3 col-sm-12")}>
          {" "}
          <Controller
            control={control}
            name="lossType"
            rules={{ required: false }}
            render={({ field: { onChange: fieldOnChange, ...rest } }: any) => {
              return (
                <GenericSelect
                  options={lossType}
                  {...rest}
                  onChange={(e: any) => {
                    fieldOnChange(e);
                  }}
                  getOptionLabel={(option: { name: any }) => option.name}
                  getOptionValue={(option: { id: any }) => option.id}
                />
              );
            }}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-3 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>
            {" "}
            {translate?.claimDescription ?? ""}
          </label>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12">
          <textarea
            {...register("claimDescription")}
            className={ClaimInformationStyle.textArea}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-3 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>
            <span style={{ color: "red" }}>*</span> {translate?.claimDeductable ?? ""}
          </label>
        </div>
        <div className={clsx("col-lg-3 col-md-3 col-sm-12")}>
          <Controller
            name="claimDeductible"
            control={control}
            render={({ field }: any) => (
              <GenericInput
                placeholder="$999.00"
                inputFieldClassname="hideInputArrow"
                onValueChange={(values: any) => field.onChange(values.value)}
                priceFormatter={true}
                {...field}
              />
            )}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-3 col-md-2 col-sm-12 mt-2 text-right")}>
          <div className="d-flex">
            <div className={clsx("col-lg-10 mt-1", ClaimInformationStyle.labelContent)}>
              <label className={clsx(ClaimInformationStyle.labelContainer)}>
                <span style={{ color: "red" }}>*</span>
                {translate?.minItemProduct ?? ""}
                <span>
                  <Tooltip
                    text={
                      <span>
                        {translate?.minimumDollar ?? ""}
                        <br /> {translate?.needsPricedByCarrier ?? ""}
                        <br /> {translate?.LessThanAccepted ?? ""}
                        <br /> {translate?.itemFaceValue ?? ""}
                      </span>
                    }
                  />
                </span>
              </label>{" "}
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12">
          <Controller
            name="minItemPrice"
            control={control}
            render={({ field }: any) => (
              <GenericInput
                placeholder="$88.00"
                inputFieldClassname="hideInputArrow"
                showError={error["minItemPrice"]}
                errorMsg={error?.minItemPrice?.message}
                onValueChange={(values: any) => field.onChange(values.value)}
                priceFormatter={true}
                {...field}
              />
            )}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-3 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>
            <span style={{ color: "red" }}>*</span>
            {translate?.taxRate ?? ""}
          </label>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12">
          <GenericInput
            placeholder="99"
            type="number"
            inputFieldClassname="hideInputArrow"
            showError={error["taxRate"]}
            errorMsg={error?.taxRate?.message}
            disabled={topping === "no"}
            {...register("taxRate")}
          />
        </div>
        <div
          className={clsx("col-lg-4 col-md-2 col-sm-12 mt-2 d-flex align-items-center")}
        >
          <label className={ClaimInformationStyle.label}>
            <span style={{ color: "red" }}>*</span>
            {translate?.applyTaxes ?? ""}
          </label>
          <GenericInput
            type="radio"
            formControlClassname={ClaimInformationStyle.formControl}
            inputFieldWrapperClassName={ClaimInformationStyle.wrapper}
            inputFieldClassname={ClaimInformationStyle.inputField}
            value="yes"
            label="Yes"
            labelClassname={ClaimInformationStyle.labelClassname}
            checked={topping === "yes"}
            onChange={onOptionChange}
          />
          <GenericInput
            type="radio"
            formControlClassname={ClaimInformationStyle.formControl1}
            inputFieldWrapperClassName={ClaimInformationStyle.wrapper1}
            inputFieldClassname={ClaimInformationStyle.inputField1}
            value="no"
            label="No"
            labelClassname={ClaimInformationStyle.labelClassname}
            checked={topping === "no"}
            onChange={onOptionChange}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-3 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>
            <span style={{ color: "red" }}>*</span> {translate?.contentLimits ?? ""}
          </label>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12">
          <Controller
            name="contentLimits"
            control={control}
            render={({ field }: any) => (
              <GenericInput
                placeholder="$0.00"
                inputFieldClassname="hideInputArrow"
                showError={error["contentLimits"]}
                errorMsg={error?.contentLimits?.message}
                errorMsgClassname={ClaimInformationStyle.errorMessage}
                onValueChange={(values: any) => field.onChange(values.value)}
                priceFormatter={true}
                {...field}
              />
            )}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-3 col-md-2 col-sm-12 mt-2  text-right")}>
          <label className={ClaimInformationStyle.label}>
            <span style={{ color: "red" }}>*</span>
            {translate?.homeOwnersPolicyType ?? ""}
          </label>
        </div>
        <div className={clsx("col-lg-3 col-md-3 col-sm-12")}>
          <Controller
            control={control}
            name="homeOwnersPolicyType"
            render={({ field: { onChange: onSelect, ...rest } }: any) => {
              return (
                <GenericSelect
                  options={homeOwnerTypeOptions}
                  {...rest}
                  disabled={!homeOwnerTypeOptions.length}
                  getOptionLabel={(option: { typeName: any }) => option.typeName}
                  getOptionValue={(option: { id: any }) => option.id}
                  onChange={(e: any) => {
                    onSelect(e);
                    coverageApiCall(e?.stateId, e?.policyTypeId);
                  }}
                />
              );
            }}
          />
        </div>
      </div>
      <div className="row mt-2 align-items-center">
        {hide ? (
          <>
            <div className={clsx("col-lg-3 col-md-2 col-sm-12 mt-1 text-right")}>
              <label className={ClaimInformationStyle.label}>
                <span style={{ color: "red" }}>*</span> {translate?.specialLimit ?? ""}
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
              <Cards className={clsx("mt-3", ClaimInformationStyle.cards)}>
                <div className="row mb-2">
                  <div className={clsx("col-lg-4", ClaimInformationStyle.coverages)}>
                    {translate?.categoryCoverage ?? ""}
                  </div>
                  <div className={clsx(" col-lg-2 pl-4", ClaimInformationStyle.category)}>
                    {translate?.category ?? ""}
                  </div>
                  <div
                    className={clsx("col-lg-3", ClaimInformationStyle.aggregateCoverage)}
                  >
                    {translate?.aggregateCoverage ?? ""}
                  </div>
                  <div className={clsx("col-lg-3 pl-4", ClaimInformationStyle.itemLimit)}>
                    {translate?.individualItemLimit ?? ""}
                  </div>
                </div>
                <div className="row">
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
                  </>
                </div>
                {show && (
                  <div
                    className={clsx(
                      "row d-flex justify-content-end",
                      ClaimInformationStyle.specialCategoryDiv
                    )}
                  >
                    <div
                      className={clsx(
                        "col-lg-6 col-md-6 col-sm-12",
                        ClaimInformationStyle.search
                      )}
                    >
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
                        "col-lg-2 col-md-3 col-sm-3",
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
                        "col-lg-2",
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
                    <div className={clsx("col-lg-1")} />
                  </div>
                )}
                <button
                  type="button"
                  className={clsx("col-lg-12", ClaimInformationStyle.specialCategory)}
                  onClick={() => handleShow()}
                >
                  {translate?.addAnotherSpecialCategory ?? ""}
                </button>
              </Cards>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="row align-items-center">
        <div className={clsx("col-lg-3 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimInformationStyle.label}>
            <span style={{ color: "red" }}>*</span> {translate?.attachements ?? ""}
          </label>
        </div>
        <div className={clsx("col-lg-2 mt-2")}>
          {" "}
          <label
            onClick={() => fileInputRef?.current && fileInputRef?.current?.click()}
            role="button"
            className={ClaimInformationStyle.fileType}
          >
            {translate?.clickAddAttachment ?? ""}
          </label>
          <input
            type="file"
            id="inp"
            multiple
            ref={fileInputRef}
            style={{ display: "none" }}
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={handleUpload}
          ></input>
        </div>
        <div className="row">
          <div className="col-lg-3" />

          {docs?.length === 0 && (
            <div className={clsx(ClaimInformationStyle.contentCenter, "row p-3")}></div>
          )}
          {docs?.map((elem: any, index: number) =>
            elem.imgType == "pdf" ? (
              <>
                <div className="col-2 m-2" key={index}>
                  <div
                    style={{ position: "relative", left: "100px" }}
                    onClick={() => handleDeleteImage(index)}
                  >
                    {" "}
                    <IoClose style={{ color: "#f20707" }} />
                  </div>
                  <div>
                    <iframe
                      key={index} // Add a unique key for each element
                      src={elem.url}
                      style={{
                        display: "inline-block",
                        objectFit: "cover",
                        height: "100px",
                        aspectRatio: 400 / 400,
                      }}
                    />
                  </div>
                  <div>
                    <a
                      className={ClaimInformationStyle.textEllipsis}
                      onClick={() => openModal(elem.url, elem.imgType)}
                      key={index}
                    >
                      {elem.url}
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <div className="col-2 m-2" key={index}>
                <div
                  style={{ position: "relative", left: "100px" }}
                  onClick={() => handleDeleteImage(index)}
                >
                  {" "}
                  <IoClose style={{ color: "#f20707" }} />
                </div>
                <div>
                  <img
                    key={index} // Add a unique key for each element
                    src={elem.url}
                    alt={`Image ${index}`} // Add alt text for accessibility
                    style={{
                      display: "inline-block",
                      objectFit: "cover",
                      height: "100px",
                      aspectRatio: 400 / 400,
                    }}
                  />
                </div>
                <a
                  className={ClaimInformationStyle.textEllipsis}
                  onClick={() => openModal(elem.url, elem.imgType)}
                  key={index}
                >
                  {elem.url}
                </a>
              </div>
            )
          )}
        </div>
        <div className="col-8">
          <ImagePreviewModal
            isOpen={isModalOpen}
            onClose={closeModal}
            handleZoomIn={handleZoomIn}
            handleZoomOut={handleZoomOut}
            handleZoomMid={handleZoomMid}
            childComp={
              <AttachementPreview
                url={imagePreviewUrl}
                imgType={imagePreviewType}
                zoomLevel={zoomLevel}
              />
            }
            modalClassName={true}
            headingName={"Image preview model"}
          ></ImagePreviewModal>
        </div>
      </div>
    </div>
  );
}

export default ClaimInformation;
