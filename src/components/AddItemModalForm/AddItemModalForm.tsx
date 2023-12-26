"use client";
import { useEffect } from "react";
import clsx from "clsx";
import { object, string, number, minLength, Output } from "valibot";
import useCustomForm from "@/hooks/useCustomForm";
import GenericInput from "@/components/common/GenericInput";
import GenericButton from "@/components/common/GenericButton";
import addClaimFormStyle from "./addClaimForm.module.scss";
import GenericSelect from "@/components/common/GenericSelect";
import Tooltip from "@/components/common/ToolTip";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { ImCross } from "react-icons/im";
// import { OptionTypedList } from "@/hooks/useSelectOption";
import { Controller } from "react-hook-form";
import AttachementPreview from "./AttachementPreview";
import ImagePreviewModal from "./ImagePreviewModal";
import { RiArrowLeftCircleFill } from "react-icons/ri";
import { RiArrowRightCircleFill } from "react-icons/ri";
import { ConnectedProps, connect } from "react-redux";
import { getPreviousItem, getNextItem } from "@/services/AddItemContentService";
import { getCategories } from "@/services/ClaimService";

interface MyObject {
  imgType: string;
  url: string;
}

interface typeProps {
  [key: string | number]: any;
}
const AddItemModalForm: React.FC<connectorType & typeProps> = (props: any) => {
  const { editItem, editItemDetail, previousItem, nextItem } = props;

  const [newRetailerInputField, setNewRetailerInputField] = useState(false);
  const [newRoomInputField, setNewRoomInputField] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [imagePreviewType, setImagePreviewType] = useState("");
  const [topping, setTopping] = useState("yes");
  const [sechduledItemRadio, setSechduledItemRadio] = useState("no");
  const [categoriesData, setCategoriesData] = useState([]);

  const [docs, setDocs] = useState<string[]>([]);

  const [zoomLevel, setZoomLevel] = useState(100);

  const onOptionChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setTopping(e.target.value);
  };

  const onRadioButtonChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSechduledItemRadio(e.target.value);
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

  useEffect(() => {
    getCategories()
      .then((res: any) => {
        setCategoriesData(res?.data);
      })
      .catch((error) => console.log("facing errr", error));
  }, []);

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const style = { height: "20px" };

  const openModal = (url: string, imageType: string) => {
    setImagePreviewType(imageType);
    setImagePreviewUrl(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openRetailerInputBox = () => {
    setNewRetailerInputField(!newRetailerInputField);
  };
  const addRoom = () => {
    setNewRoomInputField(!newRoomInputField);
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

  const handleDeleteImage = (index: number) => {
    const docArray = docs.filter((elem, ind) => {
      if (ind !== index) {
        return elem;
      }
    });
    setDocs([...docArray]);
  };

  const schema = object({
    // username: string("Your email must be a string.", [
    //   minLength(1, "User name field is required."),
    //   email("Please enter valid email."),
    // ]),
    description: string("Your description must be a string.", [
      minLength(1, "description field is required."),
    ]),
    quantity: number("Your quantity must be a string."),

    price: string("Your price must be a number."),

    category: object({
      label: string("Your label must be a string."),
      value: string("Your value must be a string."),
    }),
    subcategory: object({
      label: string("Your label must be a string."),
      value: string("Your value must be a string."),
    }),
    years: string("your years must be number"),

    months: string("your months must be number"),

    room: object({
      label: string("Your label must be a string."),
      value: string("Your value must be a string."),
    }),
    condition: object({
      label: string("Your label must be a string."),
      value: string("Your value must be a string."),
    }),
    originalPurchase: object({
      label: string("Your label must be a string."),
      value: string("Your value must be a string."),
    }),
    addRetailer: string("your add retailer string must be number"),

    roomName: string("your roomName string must be string"),

    sechduledAmount: string("Your sechduledAmount must be a string.", [
      minLength(1, "sechduled Amount field is required."),
    ]),
  });

  const { register, handleSubmit, formState, control } = useCustomForm(schema);

  const { errors } = formState;

  const onSubmit = (data: Output<typeof schema>) => {
    console.log(register("quantity"), "quantity added");

    console.log(data, "form got submitted on submit");
  };

  // function selectFile(): any {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <div className={addClaimFormStyle.addItemContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={addClaimFormStyle.containerScroll}>
          <div className="row m-2">
            <div className={clsx("col-3", addClaimFormStyle.inputBoxAlign)}>
              <span style={{ color: "red" }}>*</span>
              <label className={addClaimFormStyle.labelStyle}> Item Description:</label>
            </div>
            <div className="col-8">
              <textarea
                className="col-12"
                // showError={errors["description"]}
                // errorMsg={errors?.description?.message}
                style={{ height: "50px", padding: "5px" }}
                id="description"
                placeholder="Description"
                {...register("description")}
              />
            </div>
          </div>
          <div className="row m-2">
            <div className={clsx("col-3", addClaimFormStyle.inputBoxAlign)}>
              <label className={addClaimFormStyle.labelStyle}>Quantity</label>
            </div>
            <div className="row col-8 p-0">
              <div className="row col-4 p-0">
                <GenericInput
                  formControlClassname={addClaimFormStyle.inputBox}
                  showError={errors["quantity"]}
                  errorMsg={errors?.quantity?.message}
                  placeholder="Quantity"
                  id="quantity"
                  autoComplete="off"
                  // label="Quantity"
                  {...register("quantity")}
                  type={"number"}
                  inputFieldClassname="hideInputArrow"
                />
              </div>
              <div className={clsx("row col-4 p-0", addClaimFormStyle.inputBoxAlign)}>
                <label className={addClaimFormStyle.labelStyle}>Price</label>
              </div>
              <div className="row col-4 p-0">
                <GenericInput
                  formControlClassname={addClaimFormStyle.inputBox}
                  showError={errors["price"]}
                  errorMsg={errors?.price?.message}
                  autoComplete="off"
                  placeholder="$0.00"
                  id="price"
                  // label="Price"
                  {...register("price")}
                  type={"number"}
                  inputFieldClassname="hideInputArrow"
                />
              </div>
            </div>
          </div>
          <div className="row m-2">
            <div className={clsx("col-3", addClaimFormStyle.inputBoxAlign)}>
              <label className={addClaimFormStyle.labelStyle}>Category</label>
            </div>
            <div className={clsx("row col-8 p-0", addClaimFormStyle.centerAlign)}>
              <div className={clsx("row col-4 p-0", addClaimFormStyle.centerAlign)}>
                <div className="col-10">
                  <Controller
                    control={control}
                    name={"category"}
                    rules={{ required: true }}
                    render={({ field: { ...rest } }: any) => (
                      <GenericSelect
                        placeholder={""}
                        options={categoriesData}
                        getOptionLabel={(option: { categoryName: any }) =>
                          option?.categoryName
                        }
                        getOptionValue={(option: { categoryId: any }) =>
                          option.categoryId
                        }
                        name={"category"}
                        showLabel={false}
                        style={style}
                        {...rest}
                      />
                    )}
                  />
                </div>
                <div className="col-2 p-0">
                  <Tooltip text="This is a tooltip!" />
                </div>
              </div>
              <div className={clsx("col-4", addClaimFormStyle.inputBoxAlign)}>
                <label className={addClaimFormStyle.labelStyle}>SubCategory</label>
              </div>
              <div className={clsx("row col-4 p-0", addClaimFormStyle.centerAlign)}>
                <div className="col-10">
                  <Controller
                    control={control}
                    name={"subcategory"}
                    rules={{ required: true }}
                    render={({ field: { ...rest } }: any) => (
                      <GenericSelect
                        placeholder={""}
                        options={options}
                        name={"subcategory"}
                        showLabel={false}
                        {...rest}
                      />
                    )}
                  />
                </div>
                <div className="col-2">
                  <Tooltip text="tooltip!" />
                </div>
              </div>
            </div>
          </div>

          <div className="row m-2">
            <div className={clsx("col-3", addClaimFormStyle.inputBoxAlign)}>
              <label className={addClaimFormStyle.labelStyle}>Age</label>
            </div>
            <div className="row col-6">
              <div className="col-3 p-0">
                <GenericInput
                  formControlClassname={addClaimFormStyle.inputBox}
                  // showError={errors["years"]}
                  // errorMsg={errors?.username?.message}
                  placeholder="Years"
                  id="years"
                  type="number"
                  inputFieldClassname="hideInputArrow"
                  {...register("years")}
                />
              </div>
              <div className="col-2">
                <span className={addClaimFormStyle.labelStyle}>(Years)</span>
              </div>
              <div className="col-3 p-0">
                <GenericInput
                  formControlClassname={addClaimFormStyle.inputBox}
                  // showError={errors["months"]}
                  // errorMsg={errors?.username?.message}
                  placeholder="Months"
                  id="months"
                  type="number"
                  inputFieldClassname="hideInputArrow"
                  inputmode="numeric"
                  {...register("months")}
                />
              </div>
              <div className="col-2">
                <span className={addClaimFormStyle.labelStyle}>(Months)</span>
              </div>
            </div>
          </div>
          <div className="row m-2">
            <div className={clsx("col-3", addClaimFormStyle.inputBoxAlign)}>
              <label className={addClaimFormStyle.labelStyle}>Room</label>
            </div>
            <div className="row col-8 p-0">
              <div className="col-4">
                <Controller
                  control={control}
                  name={"room"}
                  rules={{ required: true }}
                  render={({ field: { ...rest } }: any) => (
                    <GenericSelect
                      placeholder={""}
                      options={options}
                      name={"room"}
                      showLabel={false}
                      // formControlClassname={addClaimFormStyle.genericSelect}
                      // selectBoxClassname={addClaimFormStyle.inputBoxWidth}
                      {...rest}
                    />
                  )}
                />
              </div>
              {newRoomInputField && (
                <div className="col-4">
                  <a onClick={addRoom}>Click to add new Room</a>
                </div>
              )}
              {!newRoomInputField && (
                <div className="col-4">
                  <div className={clsx(addClaimFormStyle.margin, "row")}>
                    <div className="col-10">
                      <GenericInput
                        formControlClassname={addClaimFormStyle.inputBox}
                        placeholder="Room Name"
                        id="roomName"
                        type="text"
                        {...register("roomName")}
                      />
                    </div>
                    <div className={clsx("col-2")}>
                      <a onClick={addRoom}>Cancel</a>
                    </div>
                  </div>
                  <div className={clsx(addClaimFormStyle.margin, "row")}>
                    <div className="col-10">
                      <Controller
                        control={control}
                        name={"room"}
                        rules={{ required: true }}
                        render={({ field: { ...rest } }: any) => (
                          <GenericSelect
                            placeholder={"RoomType"}
                            options={options}
                            name={"room"}
                            showLabel={false}
                            // formControlClassname={addClaimFormStyle.genericSelect}
                            // selectBoxClassname={addClaimFormStyle.inputBoxWidth}
                            {...rest}
                          />
                        )}
                      />
                    </div>
                    <div className="col-2">
                      <a>Create</a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="row m-2">
            <div className={clsx("col-3", addClaimFormStyle.inputBoxAlign)}>
              <label className={addClaimFormStyle.labelStyle}>Apply Taxes(%)</label>
            </div>
            <div className="row col-8">
              <div className={clsx(addClaimFormStyle.radioButtonWrapper, "col-4")}>
                <GenericInput
                  type="radio"
                  formControlClassname={addClaimFormStyle.formControl}
                  inputFieldWrapperClassName={addClaimFormStyle.wrapper}
                  inputFieldClassname={addClaimFormStyle.inputField}
                  value="yes"
                  label="Yes"
                  labelClassname={addClaimFormStyle.labelClassname}
                  checked={topping === "yes"}
                  onChange={onOptionChange}
                />
                <GenericInput
                  type="radio"
                  formControlClassname={addClaimFormStyle.formControl1}
                  inputFieldWrapperClassName={addClaimFormStyle.wrapper1}
                  inputFieldClassname={addClaimFormStyle.inputField1}
                  value="no"
                  label="No"
                  labelClassname={addClaimFormStyle.labelClassname}
                  // id="no"
                  checked={topping === "no"}
                  // name="applyTax"
                  onChange={onOptionChange}
                />
              </div>

              <div className={clsx("col-4", addClaimFormStyle.inputBoxAlign)}>
                <label className={addClaimFormStyle.labelStyle}>Condition</label>
              </div>
              <div className="col-4">
                <Controller
                  control={control}
                  name={"condition"}
                  rules={{ required: true }}
                  render={({ field: { ...rest } }: any) => (
                    <GenericSelect
                      placeholder={"Average"}
                      options={options}
                      name={"condition"}
                      showLabel={false}
                      // formControlClassname={addClaimFormStyle.genericSelect}
                      // selectBoxClassname={addClaimFormStyle.inputBoxWidth}
                      {...rest}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="row m-2">
            <div className={clsx("col-3", addClaimFormStyle.inputBoxAlign)}>
              <label className={addClaimFormStyle.labelStyle}>
                Originally Purchased From
              </label>
            </div>
            <div className={clsx("row col-9", addClaimFormStyle.centerAlign)}>
              <div className="col-3 p-0">
                <Controller
                  control={control}
                  name={"originalPurchase"}
                  rules={{ required: true }}
                  render={({ field: { ...rest } }: any) => (
                    <GenericSelect
                      placeholder={""}
                      options={options}
                      name={"originalPurchase"}
                      showLabel={false}
                      isSearchable={true}
                      // formControlClassname={addClaimFormStyle.genericSelect}
                      // selectBoxClassname={addClaimFormStyle.inputBoxWidth}
                      {...rest}
                    />
                  )}
                />
              </div>
              <div className="row col-6">
                {!newRetailerInputField && (
                  <a onClick={openRetailerInputBox}>
                    Not found? click to add new retailer
                  </a>
                )}
                {newRetailerInputField && (
                  <div className="row col-10">
                    <div className="col-10 p-0">
                      <GenericInput
                        formControlClassname={addClaimFormStyle.inputBox}
                        // showError={errors["username"]}
                        // errorMsg={errors?.username?.message}
                        placeholder="Add Retailer"
                        id="addRetailer"
                        {...register("addRetailer")}
                      />
                    </div>

                    <div
                      className={clsx(addClaimFormStyle.centerAlignCrossIcon, "col-2")}
                    >
                      <ImCross onClick={openRetailerInputBox} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className={clsx("col-3", addClaimFormStyle.inputBoxAlign)}>
              <label className={addClaimFormStyle.labelStyle}>Scheduled Item</label>
            </div>
            <div className={clsx(addClaimFormStyle.centerAlign, "row col-8")}>
              <div className={clsx(addClaimFormStyle.radioButtonWrapper, "col-4")}>
                <GenericInput
                  type="radio"
                  formControlClassname={addClaimFormStyle.formControl}
                  inputFieldWrapperClassName={addClaimFormStyle.wrapper}
                  inputFieldClassname={addClaimFormStyle.inputField}
                  value="yes"
                  label="Yes"
                  labelClassname={addClaimFormStyle.labelClassname}
                  checked={sechduledItemRadio === "yes"}
                  onChange={onRadioButtonChange}
                />
                <GenericInput
                  type="radio"
                  formControlClassname={addClaimFormStyle.formControl1}
                  inputFieldWrapperClassName={addClaimFormStyle.wrapper1}
                  inputFieldClassname={addClaimFormStyle.inputField1}
                  value="no"
                  label="No"
                  labelClassname={addClaimFormStyle.labelClassname}
                  checked={sechduledItemRadio === "no"}
                  onChange={onRadioButtonChange}
                />
              </div>

              {sechduledItemRadio === "yes" && (
                <div className={clsx("col-4 p-0", addClaimFormStyle.inputBoxAlign)}>
                  <span style={{ color: "red" }}>*</span>
                  <label className={addClaimFormStyle.labelStyle}>Scheduled Amount</label>
                </div>
              )}
              {sechduledItemRadio === "yes" && (
                <div className="row col-4 p-0">
                  <GenericInput
                    formControlClassname={addClaimFormStyle.inputBox}
                    showError={errors["sechduledAmount"]}
                    errorMsg={errors?.sechduledAmount?.message}
                    autoComplete="off"
                    placeholder="Scheduled Amount"
                    id="sechduledAmount"
                    // label="Price"
                    {...register("sechduledAmount")}
                    type={"number"}
                    inputFieldClassname="hideInputArrow"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="row col-3 m-2"></div>
          <div
            className="row col-3 m-2"
            style={{ height: "25px", justifyContent: "right", alignItems: "center" }}
          >
            <label
              htmlFor="inp"
              className={clsx(addClaimFormStyle.labelStyle, "row col-8")}
              style={{
                backgroundColor: "#dddddd",
                color: "#333",
                justifyContent: "right",
                borderRadius: "4px",
                paddingTop: "4px",
                paddingBottom: "4px",
                marginRight: "12px",
              }}
            >
              Add attachements
            </label>
            <input
              type="file"
              id="inp"
              multiple
              style={{ display: "none" }}
              accept=".png,.jpg,.jpeg,.pdf"
              onChange={handleUpload}
            ></input>
          </div>

          <div className={clsx(addClaimFormStyle.attachmentBox, "row")}>
            {docs?.length === 0 && (
              <div className={clsx(addClaimFormStyle.contentCenter, "row p-3")}>
                No attachments available for this item
              </div>
            )}
            {docs?.map((elem: any, index: number) =>
              elem.imgType == "pdf" ? (
                <div className="col-2 m-2" key={index}>
                  <div
                    style={{ position: "relative", left: "100px" }}
                    onClick={() => handleDeleteImage(index)}
                  >
                    {" "}
                    <IoClose style={{ color: "#f20707" }} />
                  </div>
                  <div onClick={() => openModal(elem.url, elem.imgType)}>
                    <iframe
                      key={index}
                      src={elem.url}
                      style={{
                        display: "inline-block",
                        objectFit: "cover",
                        height: "100px",
                        aspectRatio: 400 / 400,
                        cursor: "pointer",
                      }}
                    />
                  </div>
                  <div>
                    <a
                      className={addClaimFormStyle.textEllipsis}
                      onClick={() => openModal(elem.url, elem.imgType)}
                      key={index}
                    >
                      {elem.url}
                    </a>
                  </div>
                </div>
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
                      onClick={() => openModal(elem.url, elem.imgType)}
                      key={index}
                      src={elem.url}
                      alt={`Image ${index}`}
                      style={{
                        display: "inline-block",
                        objectFit: "cover",
                        height: "100px",
                        aspectRatio: 400 / 400,
                        cursor: "pointer",
                      }}
                    />
                  </div>
                  <a
                    className={addClaimFormStyle.textEllipsis}
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
        {editItem ? (
          <div>
            <div className={addClaimFormStyle.arrowContainer}>
              <div
                className={clsx({
                  [addClaimFormStyle.arrowLeft]: true,
                  [addClaimFormStyle.leftDisable]: !previousItem,
                })}
                onClick={() => {
                  if (previousItem) {
                    getPreviousItem(editItemDetail.itemId);
                  }
                }}
              >
                <RiArrowLeftCircleFill
                  size="50px"
                  fill={previousItem ? "black" : "grey"}
                />
              </div>
              <div
                className={clsx({
                  [addClaimFormStyle.arrowRight]: true,
                  [addClaimFormStyle.rightDisable]: !nextItem,
                })}
                onClick={() => {
                  if (nextItem) {
                    getNextItem(editItemDetail.itemId);
                  }
                }}
              >
                {" "}
                <RiArrowRightCircleFill size="50px" fill={nextItem ? "black" : "grey"} />
              </div>
            </div>
            <div className="row m-2 flex-row-reverse">
              <div className="row col-12 m-2 flex-row-reverse">
                <div className="row col-2">
                  <GenericButton label="Cancel" size="medium" />
                </div>
                <div className="row col-2">
                  <GenericButton label="Update Item" type="submit" size="medium" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={clsx(addClaimFormStyle.centerAlign, "row m-2")}>
            <div className="col-8" style={{ textAlign: "right" }}>
              <a>Save and Add Another Item</a>
            </div>

            <div className={clsx("row col-2", addClaimFormStyle.centerAlign)}>
              <GenericButton label="Add Item" type="submit" size="medium" />
            </div>
            <div className="row col-2">
              <GenericButton label="Reset" size="medium" />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

const mapStateToProps = ({ claimContentdata }: any) => ({
  editItemDetail: claimContentdata.editItemDetail,
  previousItem: claimContentdata.previousItem,
  nextItem: claimContentdata.nextItem,
});

const connector = connect(mapStateToProps, null);
type connectorType = ConnectedProps<typeof connector>;
export default connector(AddItemModalForm);
