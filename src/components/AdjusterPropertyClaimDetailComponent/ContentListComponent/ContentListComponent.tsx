"use client";
import React from "react";
import { useState } from "react";
import ContentListTable from "./ContentListTable";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";
import ContentListComponentStyle from "./ContentListComponent.module.scss";
import GenericButton from "@/components/common/GenericButton/index";
import { connect } from "react-redux";
import { addClaimContentListData } from "@/reducers/ClaimData/ClaimContentSlice";
import { Tooltip } from "react-tooltip";
import { useRouter } from "next/navigation";
import ContentListSearchBox from "./ContentListSearchBox/ContentListSearchBox";
import AddItemModal from "@/components/AddItemModal/AddItemModal";
import ChangeCategoryModal from "@/components/ChangeCategoryModal/ChangeCategoryModal";
import { addNotification } from "@/reducers/Notification/NotificationSlice";
import { claimContentList } from "@/services/ClaimContentListService";
import {
  getClaimDetailMessageList,
  updateCliamStatus,
  updatePaidStatus,
  updateUnderReview,
} from "@/services/AdjusterPropertyClaimDetailServices/AdjusterPropertyClaimDetailService";
import clsx from "clsx";
import Modal from "@/components/common/ModalPopups";
import GenericInput from "@/components/common/GenericInput";
import useCustomForm from "@/hooks/useCustomForm";
import { Output, minLength, object, string } from "valibot";
import AddNewMsgModalComponent from "@/components/common/AddNewMessageModalComponent";
import { capitalize } from "@/utils/helper";
import { addMessage } from "@/services/AdjusterPropertyClaimDetailServices/ClaimDetailsMessageService";
import selectCRN from "@/reducers/Session/Selectors/selectCRN";
import { RootState } from "@/store/store";
import { PAGINATION_LIMIT_10 } from "@/constants/constants";
import { addMessageList } from "@/reducers/ClaimDetail/ClaimDetailSlice";
import CustomLoader from "@/components/common/CustomLoader";
import useTranslation from "@/hooks/useTranslation";
import { contentListComponentType } from "@/translations/contentListComponent/en";

function ContentListComponent(props: any) {
  const {
    claimContentListRes,
    addClaimContentListData,
    claimId,
    editItemDetail,
    claimContentListData,
    claimContentListDataFull,
    categoryListRes,
    CRN,
  } = props;
  console.log("calimID", props.claimId);
  const router = useRouter();
  const [tableLoader, setTableLoader] = useState<boolean>(false);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editItem, setEditItem] = React.useState<React.SetStateAction<any>>(null);
  const [openMore, setOpenMore] = useState(false);
  const [isModalOpenAcceptMinVal, setIsModalOpenAcceptMinVal] = useState(false);
  const [isModalOpenPaid, setIsModalOpenPaid] = useState(false);
  const [checkedValues, setcheckStatus] = useState(false);
  const [isCreatedItemvAilable, setIsCreatedItemAvailable] = useState(false);
  const [getNumberSelected, setNumberSelected] = useState(0);
  const [openStatus, setOpenStatus] = useState(false);
  const [isModalOpenSuperVisor, setIsModalOpenSuperVisor] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isModalOpenChangeCat, setIsModalOpenChangeCat] = useState<boolean>(false);

  React.useEffect(() => {
    const claimContentData = claimContentListRes;
    addClaimContentListData({ claimContentData, claimId });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditItem(null);
    setIsModalOpen(false);
    router.push(`/adjuster-property-claim-details/${claimId}`);
  };

  const openModalChangeCat = () => {
    setIsModalOpenChangeCat(true);
  };
  const closeModalChangeCat = () => {
    setIsModalOpenChangeCat(false);
  };

  const userId = props?.policyInfo?.insuraceAccountDetails?.adjuster?.userId;
  const isCreatedSelected = claimContentListDataFull.filter(
    (item: any) => item.statusName === "CREATED" && item.selected === true
  );
  const isNotCreatedSelected = claimContentListDataFull.filter(
    (item: any) => item.statusName !== "CREATED" && item.selected === true
  );
  const isValuedSelected = claimContentListDataFull.filter(
    (item: any) => item.statusName === "VALUED" && item.selected === true
  );
  const isPaidSelected = claimContentListDataFull.filter(
    (item: any) => item.statusName === "PAID" && item.selected === true
  );
  const isNotUnderReviewSelected = claimContentListDataFull.filter(
    (item: any) => item.statusName !== "UNDER REVIEW" && item.selected === true
  );
  const cashExposureTotalPrice = isValuedSelected
    .map((item: any) => +item.cashPayoutExposure)
    .reduce((a: any, b: any) => a + b, 0);

  const acceptMinVaues = props?.claimDetail?.minimumThreshold;
  const claimListOfMinValues = claimContentListDataFull.filter(
    (item: any) =>
      item?.statusName === "CREATED" && item?.totalStatedAmount <= acceptMinVaues
  );
  const costMinValues = claimListOfMinValues
    .map((item: any) => item.totalStatedAmount)
    .reduce((a: any, b: any) => a + b, 0);

  const handleAcceptMinValues = async () => {
    if (claimListOfMinValues && claimListOfMinValues.length > 0) {
      changeStatus(claimListOfMinValues, "accept_min_val");
    } else {
      props.addNotification({
        message: `There are no items which are less then minimum $${acceptMinVaues} to price`,
        id: "update_status_valued_success",
        status: "error",
      });
    }
  };

  const handleCreatedStatus = async () => {
    const selectedClaims =
      claimContentListDataFull &&
      claimContentListDataFull.length > 0 &&
      claimContentListDataFull.filter(
        (item: any) => item.selected === true && item.statusName === "CREATED"
      );
    changeStatus(selectedClaims, "mark_as_value");
  };

  const changeStatus = async (selectedClaims: any, state: any) => {
    const param = {
      claimItems: selectedClaims,
      itemStatus: "VALUED",
    };
    const updateStatusresult = await updateCliamStatus(param);

    if (updateStatusresult?.status === 200) {
      const payload = { claimId };
      let message = "";
      if (state === "mark_as_value") {
        message = "Status Updated Successfully";
      } else if (state === "accept_min_val") {
        message = `<${
          claimListOfMinValues && claimListOfMinValues.length
        }> Items have been valued at their original cost for total 0f <${costMinValues.toFixed(
          2
        )}>`;
      }
      const claimContentListRes = await claimContentList(payload, true);

      if (claimContentListRes) {
        props.addClaimContentListData({ claimContentData: claimContentListRes, claimId });
        props.addNotification({
          message: message,
          id: "mark_status_valued_success",
          status: "success",
        });
        closeModal();
        setIsModalOpenAcceptMinVal(false);
      }
    } else {
      props.addNotification({
        message: "Something went wrong.",
        id: "mark_status_valued_failure",
        status: "error",
      });
    }
  };

  const statusChange = async (status: any, claimItems: any) => {
    const param = {
      claimItems: claimItems,
      itemStatus: status,
    };
    const updateStatusresult = await updateCliamStatus(param);

    if (updateStatusresult?.status === 200) {
      const payload = { claimId };
      const claimContentListRes = await claimContentList(payload, true);

      if (claimContentListRes) {
        props.addClaimContentListData({ claimContentData: claimContentListRes, claimId });
        props.addNotification({
          message: updateStatusresult.message,
          id: "mark_change_status_success",
          status: "success",
        });
        closeModal();
        setIsModalOpenAcceptMinVal(false);
      }
    } else {
      props.addNotification({
        message: "Something went wrong.",
        id: "mark_change_status__failure",
        status: "error",
      });
    }
  };

  const handleSupervisorModal = () => {
    setIsModalOpenSuperVisor(!isModalOpenSuperVisor);
  };

  const participantsList =
    props.participants &&
    props.participants.length > 0 &&
    props.participants
      .filter((item: any) => item.id != userId)
      .map((item: any) => {
        const companyName = item?.companyDTO?.companyName || "";
        return {
          label: `${item?.firstName} ${item?.lastName} (${companyName}${capitalize(
            item?.role
          )})`,
          value: JSON.stringify({ item }),
        };
      });

  const preSelectedParticipant =
    participantsList &&
    participantsList.filter((item: any) => {
      const value = JSON.parse(item.value);
      return value?.item?.role === "CLAIM SUPERVISOR";
    });

  const fecthMessageList = async () => {
    const claimDetailMessageListRes: any = await getClaimDetailMessageList(
      {
        pageNo: 1,
        recordPerPage: PAGINATION_LIMIT_10,
        claimId,
      },
      true
    );
    console.log("claimDetailMessageListRes ===", claimDetailMessageListRes);
    if (claimDetailMessageListRes?.data !== null) {
      props.addMessageList(claimDetailMessageListRes?.data?.messages);
    } else {
      props.addMessageList([]);
    }
  };

  const statusChangeToUnderReview = async (addMessageResp: any) => {
    const items =
      isNotUnderReviewSelected &&
      isNotUnderReviewSelected.map((item: any) => {
        return { itemId: item.id };
      });

    const payload = {
      claimNumber: props?.claimDetail?.claimNumber,
      items: items,
    };
    const res = await updateUnderReview(payload);
    if (res?.status === 200) {
      const payload = { claimId };
      const claimContentListRes = await claimContentList(payload, true);
      if (claimContentListRes) {
        props.addClaimContentListData({ claimContentData: claimContentListRes, claimId });
        fecthMessageList();
        props.addNotification({
          message: addMessageResp.message,
          id: "add_message_success",
          status: "success",
        });
      }
    } else {
      addNotification({
        message: addMessageResp.message ?? "Something went wrong.",
        id: "add_message_failure",
        status: "error",
      });
    }
  };

  const constructFormData = (data: any) => {
    const participantsdetails = data?.participants.map((participant: any) => {
      const prsedObj = JSON.parse(participant?.value);
      return {
        participantId: prsedObj?.item?.participantId,
        email: prsedObj?.item?.emailId,
        participantType: { ...prsedObj?.item?.participantType },
      };
    });

    const payload = {
      claimId: claimId,
      claimNumber: props?.claimDetail?.claimNumber,
      sender: CRN,
      itemUID: null,
      serviceRequestNumber: null,
      isPublicNote: false,
      message: data?.message,
      isInternal: true,
      registrationNumber: null,
      groupDetails: {
        groupId: null,
        groupTitle: "Supervisor Review",
        participants: participantsdetails,
      },
    };
    const formData = new FormData();
    let mediaFileDetailsArray: any = [];
    if (data?.files.length > 0) {
      data?.files?.map((fileObj: any) => {
        const newObj = {
          fileName: fileObj?.name,
          fileType: fileObj?.type,
          extension: fileObj?.name.substr(fileObj?.name.lastIndexOf(".")),
          filePurpose: "Note",
          latitude: null,
          longitude: null,
        };
        mediaFileDetailsArray.push(newObj);
        formData.append("file", fileObj);
      });
    } else {
      formData.append("file", "null");
      mediaFileDetailsArray = null;
    }
    formData.append("mediaFilesDetail", JSON.stringify(mediaFileDetailsArray));
    formData.append("noteDetail", JSON.stringify(payload));

    return formData;
  };

  const handleMessageSubmit = async (data: any) => {
    setShowLoader(true);
    handleSupervisorModal();
    const formData = constructFormData(data);
    const addMessageResp = await addMessage(formData);
    if (addMessageResp?.status === 200) {
      setShowLoader(false);
      statusChangeToUnderReview(addMessageResp);
    }
  };

  const FooterComp = () => {
    return (
      <>
        <div className={ContentListComponentStyle.modalWidth}>
          <div className="row m-1">
            <div className="row col-12 flex-row-reverse">
              <div className="row col-2">
                <GenericButton
                  label="Yes"
                  type="submit"
                  onClick={() => handleAcceptMinValues()}
                  size="small"
                />
              </div>
              <div className="row col-2">
                <GenericButton
                  label="No"
                  onClick={() => setIsModalOpenAcceptMinVal(false)}
                  size="small"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const schema = object({
    checkNumber: string([minLength(1, "Please Enter Check number")]),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useCustomForm(schema);

  const FooterCompPaid = () => {
    return (
      <>
        <div className={ContentListComponentStyle.modalWidth}>
          <div className="row m-1">
            <div className="row col-12 flex-row-reverse">
              <div className="row col-4">
                <GenericButton label="Submit" type="submit" size="small" />
              </div>
              <div className="row col-4">
                <GenericButton
                  label="Cancel"
                  onClick={() => setIsModalOpenPaid(false)}
                  size="small"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const onSubmit = async (data: Output<typeof schema>) => {
    const payload = {
      ammount: cashExposureTotalPrice,
      checkNumber: data?.checkNumber,
      claimLineItemDetails:
        isValuedSelected &&
        isValuedSelected.map((item: any) => {
          return { ...item, isPaid: true };
        }),
      claimNumber: claimId && String(claimId),
      paidBy: userId && String(userId),
      registrationNumber: "ARTGM", // temprary hardcoded due to did't get this data
    };

    const updateStatusresult = await updatePaidStatus(payload);

    if (updateStatusresult?.status === 200) {
      const payload = { claimId };
      const claimContentListRes = await claimContentList(payload, true);
      if (claimContentListRes) {
        props.addClaimContentListData({ claimContentData: claimContentListRes, claimId });
        props.addNotification({
          message: updateStatusresult.message,
          id: "mark_status_paid_success",
          status: "success",
        });
        setIsModalOpenPaid(false);
      }
    } else {
      props.addNotification({
        message: "Something went wrong.",
        id: "mark_status_paid_failure",
        status: "error",
      });
    }
  };

  React.useEffect(() => {
    if (isCreatedSelected.length > 0) {
      setIsCreatedItemAvailable(true);
      setcheckStatus(true);
      setNumberSelected(isCreatedSelected.length);
    } else if (isNotCreatedSelected.length > 0) {
      setIsCreatedItemAvailable(false);
      setcheckStatus(true);
      setNumberSelected(isCreatedSelected.length);
    } else {
      setIsCreatedItemAvailable(false);
      setOpenMore(false);
      setcheckStatus(false);
      setNumberSelected(0);
    }
  }, [claimContentListDataFull]); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    translate,
    loading,
  }: { translate: contentListComponentType | undefined; loading: boolean } =
    useTranslation("contentListComponent");

  console.log("translate", translate);
  if (loading) {
    return null;
  }

  return (
    <>
      {showLoader && <CustomLoader />}
      <div className="row mb-4">
        <div className={`${ContentListComponentStyle.contentListHeaderContainer} mt-4`}>
          <GenericComponentHeading
            title={` ${translate?.contentList ?? ""}
          (${claimContentListData.length})`}
            customHeadingClassname={ContentListComponentStyle.contentListHeader}
          />
        </div>

        <div className={ContentListComponentStyle.contentListContainer}>
          <div
            className={`row col-12 ${ContentListComponentStyle.contentListContentContainer}`}
          >
            <div className="col-md-9 col-sm-12 col-xs-12 col-lg-9 d-flex ps-0">
              <div
                className={`row col-12 ${ContentListComponentStyle.contentListButtonDiv}`}
              >
                <Tooltip
                  anchorSelect="#my-anchor-element"
                  place="bottom"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    padding: "0px",
                    zIndex: "999",
                    boxShadow: "2px 2px 2px 2px #888888",
                  }}
                  openOnClick={true}
                  clickable={true}
                >
                  <div className="p-0">
                    <div
                      className={ContentListComponentStyle.dropDownInnerDiv}
                      onClick={openModal}
                    >
                      {translate?.addItems ?? ""}
                    </div>

                    <div
                      className={ContentListComponentStyle.dropDownInnerDiv}
                      onClick={() =>
                        router.push(`/upload-items-from-csv?claimDetail=${claimId}`)
                      }
                    >
                      {translate?.loadFromFile ?? ""}
                    </div>
                  </div>
                </Tooltip>
                <GenericButton
                  label={translate?.addItem ?? ""}
                  theme="normal"
                  size="small"
                  type="submit"
                  btnClassname={ContentListComponentStyle.contentListBtn}
                  id="my-anchor-element"
                  onClick={handleDropDown}
                />
                <GenericButton
                  label={translate?.createAssignment ?? ""}
                  theme="normal"
                  size="small"
                  type="submit"
                  btnClassname={ContentListComponentStyle.contentListBtn}
                  disabled={!isCreatedItemvAilable}
                />
                <GenericButton
                  label={translate?.mapReceipts ?? ""}
                  theme="normal"
                  size="small"
                  type="submit"
                  btnClassname={ContentListComponentStyle.contentListBtn}
                />
                <Tooltip
                  anchorSelect="#more-btn-element"
                  place="bottom"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    padding: "0px",
                    zIndex: "999",
                    boxShadow: "2px 2px 2px 2px #888888",
                  }}
                  hidden={!openMore}
                  openOnClick={true}
                  clickable={true}
                >
                  <div className="p-0">
                    <span className={ContentListComponentStyle.selectedItemsLine}>
                      ({getNumberSelected}) {translate?.itemSelected ?? ""}
                    </span>
                    <div
                      className={ContentListComponentStyle.dropDownInnerDiv}
                      onClick={openModalChangeCat}
                    >
                      {translate?.changeCategory ?? ""}
                    </div>

                    <div
                      id="more-status-btn-element"
                      onClick={() => {
                        setOpenStatus(!openStatus);
                      }}
                      className={ContentListComponentStyle.dropDownInnerDiv}
                    >
                      {translate?.changeStatus ?? ""}
                    </div>
                    <Tooltip
                      anchorSelect="#more-status-btn-element"
                      place="right-start"
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        padding: "0px",
                        zIndex: "999",
                        boxShadow: "2px 2px 2px 2px #888888",
                      }}
                      hidden={!openStatus}
                      openOnClick={true}
                      clickable={true}
                    >
                      <div className="p-0">
                        <div
                          className={clsx(
                            { "d-none": !(isCreatedSelected.length > 0) },
                            ContentListComponentStyle.dropDownInnerDiv
                          )}
                          onClick={handleCreatedStatus}
                        >
                          {translate?.markValued ?? ""}
                        </div>
                        <div
                          className={clsx(
                            { "d-none": !(isValuedSelected.length > 0) },
                            ContentListComponentStyle.dropDownInnerDiv
                          )}
                          onClick={() => setIsModalOpenPaid(true)}
                        >
                          Mark Paid
                        </div>
                        <div
                          className={clsx(
                            { "d-none": !(isPaidSelected.length > 0) },
                            ContentListComponentStyle.dropDownInnerDiv
                          )}
                          onClick={() => statusChange("SETTLED", isPaidSelected)}
                        >
                          Mark Settled
                        </div>
                        <div
                          id="more-status-btn-element"
                          className={ContentListComponentStyle.dropDownInnerDiv}
                          onClick={handleSupervisorModal}
                        >
                          {translate?.supervisorReview ?? ""}
                        </div>
                      </div>
                    </Tooltip>
                  </div>
                </Tooltip>
                <GenericButton
                  label={translate?.more ?? ""}
                  theme="normal"
                  size="small"
                  type="submit"
                  id="more-btn-element"
                  btnClassname={ContentListComponentStyle.contentListBtn}
                  disabled={!checkedValues}
                  onClickHandler={() => setOpenMore(!openMore)}
                />
                <GenericButton
                  label={translate?.acceptMinValues ?? ""}
                  theme="normal"
                  size="small"
                  type="submit"
                  btnClassname={ContentListComponentStyle.contentListBtn}
                  onClickHandler={() => setIsModalOpenAcceptMinVal(true)}
                />
                <GenericButton
                  label={translate?.acceptStandardCost ?? ""}
                  theme="normal"
                  size="small"
                  type="submit"
                  btnClassname={ContentListComponentStyle.contentListBtn}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 pr-0">
              <ContentListSearchBox setTableLoader={setTableLoader} />
            </div>
          </div>
          <div className="col-12">
            <AddItemModal
              closeModal={closeModal}
              isModalOpen={isModalOpen}
              editItem={editItem}
              editItemDetail={editItemDetail}
            />
          </div>
          <Modal
            headingName="Accept Min. Values"
            isOpen={isModalOpenAcceptMinVal}
            onClose={() => setIsModalOpenAcceptMinVal(false)}
            modalWidthClassName={ContentListComponentStyle.modalContent}
            childComp={
              <div className={ContentListComponentStyle.addItemContainer}>
                <div className={ContentListComponentStyle.modalLabel}>
                  A total of &lt;{claimListOfMinValues && claimListOfMinValues.length}&gt;
                  items will be accepted at replacement cost of &lt;$
                  {costMinValues.toFixed(2)}&gt;.Would you like to accept the original
                  costs as replacement costs of these items?
                </div>
              </div>
            }
            footerContent={<FooterComp />}
          ></Modal>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal
              headingName="Payment Details"
              isOpen={isModalOpenPaid}
              onClose={() => setIsModalOpenPaid(false)}
              modalWidthClassName={ContentListComponentStyle.modalPaidContent}
              childComp={
                <div className={ContentListComponentStyle.addItemContainer}>
                  <div className={ContentListComponentStyle.modalLabel}>
                    Paying a sum of ${cashExposureTotalPrice.toFixed(2)} (Cash Payout
                    Exposure) for {isValuedSelected && isValuedSelected.length} item
                  </div>
                  <div>
                    <GenericInput
                      formControlClassname={ContentListComponentStyle.inputBox}
                      labelClassname={ContentListComponentStyle.modalLabel}
                      showError={errors["checkNumber"]}
                      errorMsg={errors?.checkNumber?.message}
                      label="Check #*"
                      id="checkNumber"
                      autoComplete="off"
                      {...register("checkNumber")}
                    />
                  </div>
                </div>
              }
              footerContent={<FooterCompPaid />}
            ></Modal>
          </form>

          <Modal
            isOpen={isModalOpenSuperVisor}
            onClose={handleSupervisorModal}
            headingName="Add new message"
            childComp={
              <AddNewMsgModalComponent
                handleOpenModal={handleSupervisorModal}
                claimId={claimId}
                participants={participantsList}
                handleMessageSubmit={handleMessageSubmit}
                defaultValue={preSelectedParticipant}
              />
            }
            overlayClassName={ContentListComponentStyle.modalContainer}
            modalWidthClassName={ContentListComponentStyle.modalContent}
          />
          <div className="col-12">
            <ChangeCategoryModal
              closeModal={closeModalChangeCat}
              isModalOpen={isModalOpenChangeCat}
              categoryListRes={categoryListRes}
              claimContentListDataFull={claimContentListDataFull}
            />
          </div>
        </div>
        <ContentListTable
          setTableLoader={setTableLoader}
          tableLoader={tableLoader}
          setIsModalOpen={setIsModalOpen}
          setEditItem={setEditItem}
        />
      </div>
    </>
  );
}

const mapStateToProps = (state: RootState) => ({
  editItemDetail: state?.claimContentdata?.editItemDetail,
  claimContentListData: state?.claimContentdata?.claimContentListData,
  claimContentListDataFull: state?.claimContentdata?.claimContentListDataFull,
  claimDetail: state?.claimDetail && state?.claimDetail?.contents,
  policyInfo: state?.claimDetail && state?.claimDetail?.policyInfo,
  participants: state?.claimDetail && state?.claimDetail?.participants,
  CRN: selectCRN(state),
});

const mapDispatchToProps = {
  addClaimContentListData,
  addNotification,
  addMessageList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentListComponent);
