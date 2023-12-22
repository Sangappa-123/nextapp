"use client";
import React, { useEffect } from "react";
import clsx from "clsx";
import { object, string, minLength, Output } from "valibot";
import useCustomForm from "@/hooks/useCustomForm";
// import {useForm} from "react-hook-form";
import GenericInput from "@/components/common/GenericInput";
import GenericButton from "@/components/common/GenericButton";
import addClaimFormStyle from "./addClaimForm.module.scss";
import GenericSelect from "@/components/common/GenericSelect";
import Tooltip from "@/components/common/ToolTip";
import { IoClose } from "react-icons/io5";

import RadioButtons from "@/components/common/RadioButtons";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { useRef } from "react";
// import { OptionTypedList } from "@/hooks/useSelectOption";
import { Controller } from "react-hook-form";
import AttachementPreview from "./AttachementPreview";
import ImagePreviewModal from "./ImagePreviewModal";
import { RiArrowLeftCircleFill } from "react-icons/ri";
import { RiArrowRightCircleFill } from "react-icons/ri";
import { ConnectedProps, connect } from "react-redux";
import { getPreviousItem, getNextItem } from "src/services/AddItemContentService";

// interface TypedProp<T> {
//   selectOptions: OptionTypedList<T>;
// }

interface MyObject {
  imgType: string;
  url: string;
}

interface typeProps {
  [key: string | number]: any;
}
const AddItemModalForm: React.FC<connectorType & typeProps> = (props: any) => {
  const { editItem, editItemDetail, previousItem, nextItem } = props;

  console.log("editItem", editItem);

  // const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [newRetailerInputField, setNewRetailerInputField] = useState(false);
  const [newRoomInputField, setNewRoomInputField] = useState(true);
  // const [previewImage, setPreviewImage] = useState(true);
  // const [previewAttachment, setPreviewAttachment] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [imagePreviewType, setImagePreviewType] = useState("");

  const [docs, setDocs] = useState<string[]>([]);

  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => {
    setZoomLevel(zoomLevel + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel(zoomLevel - 0.1);
  };

  const handleZoomMid = () => {
    setZoomLevel(1);
  };

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const style = { height: "20px" };
  const radioBtnOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // const openAttachment = () => {
  //   setPreviewAttachment(true);
  // };
  // const closePreviewImage = () => {
  //   setPreviewImage(!previewImage);
  // };

  const handleDeleteImage = (index: number) => {
    console.log(index, "handleDeleteImage");

    const docArray = docs.filter((elem, ind) => {
      if (ind !== index) {
        return elem;
      }
    });
    console.log(docArray, "docArray");

    // docs.splice(index, 1);
    // if(docs.length === 0){
    //   setDocs([]);
    // } else {
    //   setDocs([...docs]);
    // }
    // console.log(docs, "Docs updated i delete func");

    setDocs([...docArray]);
  };
  useEffect(() => {
    console.log(docs, "checking docs in useeffect");
  }, [docs]);

  const openModal = (url: string, imageType: string) => {
    setImagePreviewType(imageType);
    setImagePreviewUrl(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   // Handle the file change event here
  //   const selectedFile = event.target.files && event.target.files[0];
  //   if (selectedFile) {
  //     console.log("Selected file:", selectedFile);
  //   }
  // };

  const openRetailerInputBox = () => {
    setNewRetailerInputField(!newRetailerInputField);
  };
  const addRoom = () => {
    setNewRoomInputField(!newRoomInputField);
  };

  //handle file upload click
  const handleUpload = (event: any) => {
    console.log(event, "handleUpload");
    // setPreviewImage(true);

    // let imageArr: any[] = [];
    const imageUrl = URL.createObjectURL(event.target.files[0]);
    let selectedImageArr: any[];
    console.log(event.target.files);
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
    console.log(selectedImageArr, "selectedImageArr");
    setDocs((prev: any) => [...prev, ...selectedImageArr]);
    console.log(docs, "checking docs");
  };

  const schema = object({
    // username: string("Your email must be a string.", [
    //   minLength(1, "User name field is required."),
    //   email("Please enter valid email."),
    // ]),
    description: string("Your description must be a string.", [
      minLength(1, "description field is required."),
    ]),
    quantity: string("Your quantity must be a string.", [
      minLength(1, "quantity field is required."),
    ]),
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
        {`Item# ${editItemDetail.itemNumber}`}
        <div className="row col-12 m-2">
          <div className={clsx("col-3", addClaimFormStyle.inputBoxAlign)}>
            <span style={{ color: "red" }}>*</span>
            <label className={addClaimFormStyle.labelStyle}> Item Description:</label>
          </div>
          <div className="col-8">
            <textarea
              id="description"
              className="col-12"
              // showError={errors["description"]}
              // errorMsg={errors?.description?.message}
              style={{ height: "50px", padding: "5px" }}
              placeholder="Description"
              {...register("description")}
            />
          </div>
        </div>
        <div className="row col-12 m-2">
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
                theme="normal"
                {...register("quantity")}
                type={"number"}
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
                theme="normal"
                {...register("price")}
                type={"number"}
              />
            </div>
          </div>
        </div>
        <div className="row col-12 m-2">
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
                      options={options}
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
                <Tooltip text="This is a tooltip!" />
              </div>
            </div>
          </div>
        </div>

        <div className="row col-12 m-2">
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
                theme="normal"
                type="number"
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
                theme="normal"
                type="number"
                {...register("months")}
              />
            </div>
            <div className="col-2">
              <span className={addClaimFormStyle.labelStyle}>(Months)</span>
            </div>
          </div>
        </div>
        <div className="row col-12 m-2">
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
                <div className="row col-12">
                  <div className="col-10">
                    <GenericInput
                      formControlClassname={addClaimFormStyle.inputBox}
                      placeholder="Room Name"
                      id="roomName"
                      theme="normal"
                      type="text"
                      {...register("roomName")}
                    />
                  </div>
                  <div className="col-2">
                    <a onClick={addRoom}>Cancel</a>
                  </div>
                </div>
                <div className="row col-12">
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
        <div className="row col-12 m-2">
          <div className={clsx("col-3", addClaimFormStyle.inputBoxAlign)}>
            <label className={addClaimFormStyle.labelStyle}>Apply Taxes(%)</label>
          </div>
          <div className="row col-8">
            <div className="col-4">
              {/* <RadioButtons options={radioBtnOptions} selectedOption={selectedOption} /> */}
              <RadioButtons options={radioBtnOptions} />
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

        <div className="row col-12 m-2">
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
                <a onClick={openRetailerInputBox}>Not found? click to add new retailer</a>
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
                      theme="normal"
                      {...register("addRetailer")}
                    />
                  </div>

                  <div className="col-2">
                    <ImCross onClick={openRetailerInputBox} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="row col-12 mt-2">
          <div className={clsx("col-3", addClaimFormStyle.inputBoxAlign)}>
            <label className={addClaimFormStyle.labelStyle}>Scheduled Item</label>
          </div>
          <div className={clsx(addClaimFormStyle.centerAlign, "row col-8")}>
            <div className="col-4">
              <RadioButtons options={radioBtnOptions} />
              {/* selectedOption={selectedOption} */}
            </div>

            <div className={clsx("col-4 p-0", addClaimFormStyle.inputBoxAlign)}>
              <span style={{ color: "red" }}>*</span>
              <label className={addClaimFormStyle.labelStyle}>Scheduled Amount</label>
            </div>
            <div className="row col-4 p-0">
              <GenericInput
                formControlClassname={addClaimFormStyle.inputBox}
                showError={errors["sechduledAmount"]}
                errorMsg={errors?.sechduledAmount?.message}
                autoComplete="off"
                placeholder="Scheduled Amount"
                id="sechduledAmount"
                // label="Price"
                theme="normal"
                {...register("sechduledAmount")}
                type={"number"}
              />
            </div>
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
              backgroundColor: "#32c5d2",
              color: "white",
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
            ref={fileInputRef}
            style={{ display: "none" }}
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={handleUpload}
          ></input>
        </div>

        <div
          style={{ height: "160px", width: "100%", border: " 1px solid black " }}
          className="row"
        >
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

        {editItem ? (
          <>
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

            <div className="row col-12 m-2 flex-row-reverse">
              <div className="row col-2">
                <GenericButton label="Cancel" />
              </div>
              <div className="row col-2">
                <GenericButton label="Update Item" type="submit" />
              </div>
            </div>
          </>
        ) : (
          <div className="row col-12 m-2">
            <div className="col-8" style={{ textAlign: "right" }}>
              <a>SaveandAdd Another Item</a>
            </div>

            <div className={clsx("row col-2", addClaimFormStyle.centerAlign)}>
              <GenericButton label="Add Item" type="submit" />
            </div>
            <div className="row col-2">
              <GenericButton label="Reset" />
            </div>
          </div>
        )}

        {/* <GenericButton label="Add Item" type="submit" /> */}
        {/* <GenericButton label="Sign in with SSO" theme="darkBlue" /> */}
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
