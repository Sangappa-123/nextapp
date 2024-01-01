"use client";
import { useEffect, useMemo } from "react";
import clsx from "clsx";
import { object, string, number, minLength, Output, nullish } from "valibot";
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
import {
  getPreviousItem,
  getNextItem,
  addContentItem,
  addNewRoom,
  updateContentItem,
} from "@/services/AddItemContentService";
import GenericTextArea from "../common/GenericTextArea/index";
import { addNotification } from "@/reducers/Notification/NotificationSlice";
import { useParams } from "next/navigation";
import {
  getClaimItemRoom,
  getSubCategories,
} from "@/services/AdjusterPropertyClaimDetailService";
import { addSubcategories } from "@/reducers/ClaimDetail/ClaimDetailSlice";

interface objectType {
  imgType: string;
  url: string;
}

interface typeProps {
  [key: string | number]: any;
}
const AddItemModalForm: React.FC<connectorType & typeProps> = (props: any) => {
  const {
    editItem,
    editItemDetail,
    previousItem,
    nextItem,
    category,
    subCategory,
    condition,
    originallyPurchasedFrom,
    roomType,
    room,
    addNotification,
    addSubcategories,
    closeModal,
  } = props;

  const { claimId }: { claimId: string } = useParams();
  const claimNumber = sessionStorage.getItem("claimNumber") ?? "";
  const [newRetailerInputField, setNewRetailerInputField] = useState(false);
  const [newRoomInputField, setNewRoomInputField] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [imagePreviewType, setImagePreviewType] = useState("");
  const [applyTaxState, setapplyTaxState] = useState("yes");
  const [isScheduledItemState, SetScheduledItemState] = useState("no");
  const [showSubCat, setShowSubCategory] = useState(false);
  const [docs, setDocs] = useState<string[]>([]);
  const [roomName, setRoomName] = useState<React.SetStateAction<string>>();
  const [roomTypeSelected, setRoomTypeSelected] = useState<React.SetStateAction<any>>();

  const [zoomLevel, setZoomLevel] = useState(100);

  const onTaxOptionChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setapplyTaxState(e.target.value);
  };

  const onScheduleItemChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    SetScheduledItemState(e.target.value);
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

  const closePreviewModal = () => {
    setIsModalOpen(false);
  };

  const addRoom = () => {
    setNewRoomInputField(!newRoomInputField);
    setRoomName("");
    setRoomTypeSelected(null);
  };

  const handleNewRoomCreation = async () => {
    const param = {
      claim: {
        claimNumber: claimNumber,
      },
      roomType: roomTypeSelected,
      roomName: roomName,
    };
    const res = await addNewRoom(param);
    if (res?.status === 200) {
      addNotification({
        message: "New Room Created",
        id: "room_created",
        status: "success",
      });
      await getClaimItemRoom(claimId, true);
    } else {
      addNotification({
        message: res.message ?? "Something went wrong.",
        id: "room_creation_failure",
        status: "error",
      });
    }
  };
  const handleUpload = (event: any) => {
    const imageUrl = URL.createObjectURL(event.target.files[0]);
    let selectedImageArr: any[];
    if (event.target.files[0].type == "application/pdf") {
      const newObj: objectType = {
        imgType: "pdf",
        url: imageUrl,
      };
      selectedImageArr = [newObj];
    } else {
      const newObj: objectType = {
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
  const handleCategoryChange = async (val: any) => {
    const param = {
      categoryId: val?.categoryId ?? null,
    };
    const subcategoryListRes: any = await getSubCategories(param, true);

    addSubcategories(subcategoryListRes?.data);
    if (val) {
      setShowSubCategory(true);
    } else {
      setShowSubCategory(false);
    }
  };
  const defaultValue = useMemo(() => {
    return {
      description:
        editItem && editItemDetail.description ? editItemDetail.description : null,
      quantity:
        editItem && editItemDetail.quantity ? String(editItemDetail.quantity) : null,
      insuredPrice:
        editItem && editItemDetail?.insuredPrice
          ? String(editItemDetail?.insuredPrice)
          : null,
      category: editItem && editItemDetail.category ? editItemDetail.category : null,
      subCategory:
        editItem && editItemDetail.subCategory ? editItemDetail.subCategory : null,
      ageYears:
        editItem && editItemDetail.ageYears ? String(editItemDetail.ageYears) : null,
      ageMonths:
        editItem && editItemDetail.ageMonths ? String(editItemDetail.ageMonths) : null,
      room: editItem && editItemDetail.room ? editItemDetail.room : null,
      condition: editItem && editItemDetail.condition ? editItemDetail.condition : null,
      originallyPurchasedFrom:
        editItem && editItemDetail.originallyPurchasedFrom
          ? editItemDetail.originallyPurchasedFrom
          : null,
      scheduleAmount:
        editItem && editItemDetail.scheduleAmount
          ? String(editItemDetail.scheduleAmount)
          : null,
    };
  }, [editItemDetail]);

  const schema = object({
    description: string(" Description must be a string.", [
      minLength(1, "Description field is required."),
    ]),
    quantity: nullish(string("Quantity must be a number")),
    insuredPrice: nullish(string("Price must be a number")),
    category: nullish(
      object({
        categoryName: string(),
        categoryId: number(),
      })
    ),
    subCategory: nullish(
      object({
        name: string(),
        id: number(),
      })
    ),
    ageYears: nullish(string("Years must be a number")),
    ageMonths: nullish(string("Month must be a number")),
    room: nullish(
      object({
        roomName: string(),
        id: number(),
      })
    ),
    condition: nullish(
      object({
        conditionName: string(),
        conditionId: number(),
      })
    ),
    originallyPurchasedFrom: nullish(
      object({
        id: number(),
        name: string(),
      })
    ),
    scheduleAmount: nullish(string("Amount must be a number")),
    addRetailer: nullish(string()),
  });

  const { register, handleSubmit, formState, control, setValue, reset } = useCustomForm(
    schema,
    defaultValue
  );

  const { errors } = formState;
  console.log(formState);
  console.log(errors);

  useEffect(() => {
    if (editItem && editItemDetail) {
      setValue("description", editItemDetail.description ?? null);
      setValue(
        "quantity",
        editItemDetail.quantity ? String(editItemDetail.quantity) : null
      );
      setValue(
        "insuredPrice",
        editItemDetail?.insuredPrice ? String(editItemDetail?.insuredPrice) : null
      );
      setValue("category", editItemDetail.category ? editItemDetail.category : null);
      setValue("subCategory", editItemDetail.subCategory ?? null);
      setValue(
        "ageYears",
        editItemDetail.ageYears ? String(editItemDetail.ageYears) : null
      );
      setValue(
        "ageMonths",
        editItemDetail.ageMonths ? String(editItemDetail.ageMonths) : null
      );
      setValue("room", editItemDetail.room ?? null);
      setValue("condition", editItemDetail.condition ?? null);
      setValue("originallyPurchasedFrom", editItemDetail.originallyPurchasedFrom ?? null);
      setValue(
        "scheduleAmount",
        editItemDetail.scheduleAmount ? String(editItemDetail.scheduleAmount) : null
      );
      setapplyTaxState(editItemDetail?.applyTax ? "yes" : "no");
      SetScheduledItemState(editItemDetail?.isScheduledItem ? "yes" : "no");
    }
  }, [editItem, editItemDetail, setValue]);

  const openRetailerInputBox = () => {
    setValue("addRetailer", null);
    setNewRetailerInputField(!newRetailerInputField);
  };
  const submitFormData = async (data: Output<typeof schema>) => {
    const payload = {
      id: editItem && editItemDetail ? editItemDetail?.itemId : null,
      claimId: claimId,
      claimNumber: claimNumber,
      description: data.description,
      quantity: data.quantity,
      insuredPrice: data.insuredPrice,
      applyTax: applyTaxState === "yes" ? true : false,
      ageYears: data.ageYears,
      ageMonths: data.ageMonths,
      isScheduledItem: isScheduledItemState === "yes" ? true : false,
      scheduleAmount: data.scheduleAmount,
      category: {
        id: data?.category?.categoryId,
        name: data?.category?.categoryName,
      },
      subCategory: data.subCategory,
      room: data.room,
      condition: data.condition,
      originallyPurchasedFrom: data.addRetailer
        ? { name: data.addRetailer }
        : data.originallyPurchasedFrom,
    };
    const formData = new FormData();
    formData.append("itemDetails", JSON.stringify(payload));

    return formData;
  };

  const handleSaveAndNext = async (data: Output<typeof schema>) => {
    const formData = await submitFormData(data);
    const addItemRes = await addContentItem(formData);

    if (addItemRes?.status === 200) {
      reset();
      addNotification({
        message: "Item Added Successfully. You Can Add Another One",
        id: "add_content_item_and_next_success",
        status: "success",
      });
    } else {
      addNotification({
        message: addItemRes.message ?? "Something went wrong.",
        id: "add_content_item_and_next_failure",
        status: "error",
      });
    }
  };
  const formSubmit = async (data: Output<typeof schema>) => {
    const formData = await submitFormData(data);
    const addItemRes = await addContentItem(formData);

    if (addItemRes?.status === 200) {
      closeModal();
      addNotification({
        message: "Item Added Successfully",
        id: "add_content_item_success",
        status: "success",
      });
    } else {
      addNotification({
        message: addItemRes.message ?? "Something went wrong.",
        id: "add_content_item_failure",
        status: "error",
      });
    }
  };
  const handleUpdate = async (data: Output<typeof schema>) => {
    const formData = await submitFormData(data);

    const updateItemRes = await updateContentItem(formData);

    if (updateItemRes?.status === 200) {
      closeModal();
      addNotification({
        message: "Item Updated Successfully",
        id: "update_content_item_success",
        status: "success",
      });
    } else {
      addNotification({
        message: updateItemRes.message ?? "Something went wrong.",
        id: "update_content_item_failure",
        status: "error",
      });
    }
  };
  const handleUpdateAndNext = async (data: Output<typeof schema>) => {
    const formData = await submitFormData(data);
    const updateItemRes = await updateContentItem(formData);

    if (updateItemRes?.status === 200) {
      if (nextItem) {
        getNextItem(editItemDetail.itemId);
      }
      addNotification({
        message: "Item Updated Successfully",
        id: "update_content_item_success",
        status: "success",
      });
    } else {
      addNotification({
        message: updateItemRes.message ?? "Something went wrong.",
        id: "update_content_item_failure",
        status: "error",
      });
    }
  };
  const handleUpdateAndPrevious = async (data: Output<typeof schema>) => {
    const formData = await submitFormData(data);
    const updateItemRes = await updateContentItem(formData);

    if (updateItemRes?.status === 200) {
      if (previousItem) {
        getPreviousItem(editItemDetail.itemId);
      }
      addNotification({
        message: "Item Updated Successfully",
        id: "update_content_item_success",
        status: "success",
      });
    } else {
      addNotification({
        message: updateItemRes.message ?? "Something went wrong.",
        id: "update_content_item_failure",
        status: "error",
      });
    }
  };

  return (
    <div className={addClaimFormStyle.addItemContainer}>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className={addClaimFormStyle.containerScroll}>
          <div className="row m-2">
            <div className={clsx("col-3", addClaimFormStyle.inputBoxAlign)}>
              <span style={{ color: "red" }}>*</span>
              <label className={addClaimFormStyle.labelStyle}> Item Description:</label>
            </div>
            <div className="col-8">
              <GenericTextArea
                showError={errors["description"]}
                errorMsg={errors?.description?.message}
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
                  showError={errors["insuredPrice"]}
                  errorMsg={errors?.insuredPrice?.message}
                  autoComplete="off"
                  placeholder="$0.00"
                  id="insuredPrice"
                  {...register("insuredPrice")}
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
                    name="category"
                    render={({ field: { onChange: fieldOnChange, ...rest } }: any) => (
                      <GenericSelect
                        options={category}
                        name="category"
                        getOptionLabel={(option: { categoryName: any }) =>
                          option.categoryName
                        }
                        getOptionValue={(option: { categoryId: any }) =>
                          option.categoryId
                        }
                        onChange={(e: any) => {
                          fieldOnChange(e);
                          handleCategoryChange(e);
                        }}
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
                    name={"subCategory"}
                    render={({ field: { ...rest } }: any) => (
                      <GenericSelect
                        placeholder={""}
                        options={showSubCat ? subCategory : []}
                        name={"subCategory"}
                        getOptionLabel={(option: { name: string }) => option.name}
                        getOptionValue={(option: { id: number }) => option.id}
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
                  showError={errors["ageYears"]}
                  errorMsg={errors?.ageYears?.message}
                  placeholder="Years"
                  id="ageYears"
                  type="number"
                  inputFieldClassname="hideInputArrow"
                  {...register("ageYears")}
                />
              </div>
              <div className="col-2">
                <span className={addClaimFormStyle.labelStyle}>(Years)</span>
              </div>
              <div className="col-3 p-0">
                <GenericInput
                  formControlClassname={addClaimFormStyle.inputBox}
                  showError={errors["ageMonths"]}
                  errorMsg={errors?.ageMonths?.message}
                  placeholder="Months"
                  id="ageMonths"
                  type="number"
                  inputFieldClassname="hideInputArrow"
                  {...register("ageMonths")}
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
                      options={room}
                      getOptionLabel={(option: { roomName: any }) => option.roomName}
                      getOptionValue={(option: { id: any }) => option.id}
                      name={"room"}
                      showLabel={false}
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
                        value={roomName}
                        onChange={(e: {
                          target: { value: React.SetStateAction<string> };
                        }) => {
                          setRoomName(e.target.value);
                        }}
                      />
                    </div>
                    <div className={clsx("col-2")}>
                      <a className={addClaimFormStyle.cancelLink} onClick={addRoom}>
                        Cancel
                      </a>
                    </div>
                  </div>
                  <div className={clsx(addClaimFormStyle.margin, "row")}>
                    <div className="col-10">
                      <Controller
                        control={control}
                        name={"room"}
                        render={({
                          field: { onChange: fieldOnChange, ...rest },
                        }: any) => (
                          <GenericSelect
                            placeholder={"RoomType"}
                            options={roomType}
                            getOptionLabel={(option: { name: string }) => option.name}
                            getOptionValue={(option: { id: number }) => option.id}
                            name={"room"}
                            showLabel={false}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              fieldOnChange(e);
                              setRoomTypeSelected(e);
                            }}
                            {...rest}
                          />
                        )}
                      />
                    </div>
                    <div className="col-2">
                      <a
                        className={addClaimFormStyle.pointerCursor}
                        onClick={handleNewRoomCreation}
                      >
                        Create
                      </a>
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
                  name="applyTax"
                  labelClassname={addClaimFormStyle.labelClassname}
                  checked={applyTaxState === "yes"}
                  onChange={onTaxOptionChange}
                />
                <GenericInput
                  type="radio"
                  formControlClassname={addClaimFormStyle.formControl1}
                  inputFieldWrapperClassName={addClaimFormStyle.wrapper1}
                  inputFieldClassname={addClaimFormStyle.inputField1}
                  value="no"
                  label="No"
                  labelClassname={addClaimFormStyle.labelClassname}
                  checked={applyTaxState === "no"}
                  name="applyTax"
                  onChange={onTaxOptionChange}
                />
              </div>

              <div className={clsx("col-4", addClaimFormStyle.inputBoxAlign)}>
                <label className={addClaimFormStyle.labelStyle}>Condition</label>
              </div>
              <div className="col-4">
                <Controller
                  control={control}
                  name={"condition"}
                  render={({ field: { ...rest } }: any) => (
                    <GenericSelect
                      placeholder={"Average"}
                      options={condition}
                      name={"condition"}
                      getOptionLabel={(option: { conditionName: any }) =>
                        option.conditionName
                      }
                      getOptionValue={(option: { conditionId: any }) =>
                        option.conditionId
                      }
                      showLabel={false}
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
                  name={"originallyPurchasedFrom"}
                  render={({ field: { ...rest } }: any) => (
                    <GenericSelect
                      placeholder={""}
                      name={"originallyPurchasedFrom"}
                      options={originallyPurchasedFrom}
                      getOptionLabel={(option: { name: string }) => option.name}
                      getOptionValue={(option: { id: number }) => option.id}
                      showLabel={false}
                      isSearchable={true}
                      {...rest}
                    />
                  )}
                />
              </div>
              <div className="row col-6">
                {!newRetailerInputField && (
                  <a
                    className={addClaimFormStyle.pointerCursor}
                    onClick={openRetailerInputBox}
                  >
                    Not found? click to add new retailer
                  </a>
                )}
                {newRetailerInputField && (
                  <div className="row col-10">
                    <div className="col-10 p-0">
                      <GenericInput
                        formControlClassname={addClaimFormStyle.inputBox}
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
                  name="isScheduledItem"
                  id="isScheduledItem-yes"
                  label="Yes"
                  labelClassname={addClaimFormStyle.labelClassname}
                  checked={isScheduledItemState === "yes"}
                  onChange={onScheduleItemChange}
                />
                <GenericInput
                  type="radio"
                  formControlClassname={addClaimFormStyle.formControl1}
                  inputFieldWrapperClassName={addClaimFormStyle.wrapper1}
                  inputFieldClassname={addClaimFormStyle.inputField1}
                  value="no"
                  name="isScheduledItem"
                  id="isScheduledItem-no"
                  label="No"
                  labelClassname={addClaimFormStyle.labelClassname}
                  checked={isScheduledItemState === "no"}
                  onChange={onScheduleItemChange}
                />
              </div>

              {isScheduledItemState === "yes" && (
                <>
                  <div className={clsx("col-4 p-0", addClaimFormStyle.inputBoxAlign)}>
                    <span style={{ color: "red" }}>*</span>
                    <label className={addClaimFormStyle.labelStyle}>
                      Scheduled Amount
                    </label>
                  </div>

                  <div className="row col-4 p-0">
                    <GenericInput
                      formControlClassname={addClaimFormStyle.inputBox}
                      showError={errors["scheduleAmount"]}
                      errorMsg={errors?.scheduleAmount?.message}
                      autoComplete="off"
                      placeholder="Scheduled Amount"
                      id="scheduleAmount"
                      // label="Price"
                      {...register("scheduleAmount")}
                      type={"number"}
                      inputFieldClassname="hideInputArrow"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="row col-3 m-2"></div>
          <div
            className="row col-3 m-2"
            style={{ height: "25px", justifyContent: "right", alignItems: "center" }}
          >
            <label
              htmlFor="file"
              className={clsx(addClaimFormStyle.labelStyle, "row col-8")}
              style={{
                backgroundColor: "#dddddd",
                color: "#333",
                justifyContent: "right",
                borderRadius: "4px",
                paddingTop: "4px",
                paddingBottom: "4px",
                marginRight: "12px",
                width: "auto",
              }}
            >
              Add attachements
            </label>
            <input
              type="file"
              id="file"
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
              onClose={closePreviewModal}
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
                onClick={handleSubmit(handleUpdateAndPrevious)}
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
                onClick={handleSubmit(handleUpdateAndNext)}
              >
                {" "}
                <RiArrowRightCircleFill size="50px" fill={nextItem ? "black" : "grey"} />
              </div>
            </div>
            <div className="row m-2 flex-row-reverse">
              <div className="row col-12 m-2 flex-row-reverse">
                <div className="row col-2">
                  <GenericButton label="Cancel" onClick={closeModal} size="medium" />
                </div>
                <div className="row col-2">
                  <GenericButton
                    label="Update Item"
                    type="submit"
                    onClick={handleSubmit(handleUpdate)}
                    size="medium"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={clsx(addClaimFormStyle.centerAlign, "row mt-4")}>
            <div className="col-8" style={{ textAlign: "right" }}>
              <a
                type="submit"
                className={addClaimFormStyle.pointerCursor}
                onClick={handleSubmit(handleSaveAndNext)}
              >
                Save and Add Another Item
              </a>
            </div>

            <div className={clsx("row col-2", addClaimFormStyle.centerAlign)}>
              <GenericButton label="Add Item" type="submit" size="medium" />
            </div>
            <div className="row col-2">
              <GenericButton label="Reset" size="medium" onClick={() => reset()} />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

const mapStateToProps = ({ claimContentdata, claimDetail }: any) => ({
  editItemDetail: claimContentdata.editItemDetail,
  previousItem: claimContentdata.previousItem,
  nextItem: claimContentdata.nextItem,
  category: claimDetail.category,
  subCategory: claimDetail.subCategory,
  condition: claimDetail.condition,
  originallyPurchasedFrom: claimDetail.retailer,
  room: claimDetail.room,
  roomType: claimDetail.roomType,
});
const mapDispatchToProps = {
  addNotification,
  addSubcategories,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(AddItemModalForm);
