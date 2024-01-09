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
  updateCliamStatus,
  updatePaidStatus,
} from "@/services/AdjusterPropertyClaimDetailServices/AdjusterPropertyClaimDetailService";
import clsx from "clsx";
import Modal from "@/components/common/ModalPopups";
import GenericInput from "@/components/common/GenericInput";
import useCustomForm from "@/hooks/useCustomForm";
import { Output, minLength, object, string } from "valibot";

function ContentListComponent(props: any) {
  const {
    claimContentListRes,
    addClaimContentListData,
    claimId,
    editItemDetail,
    claimContentListData,
    claimContentListDataFull,
    categoryListRes,
  } = props;
  const router = useRouter();
  const [tableLoader, setTableLoader] = useState<boolean>(false);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenChangeCat, setIsModalOpenChangeCat] = useState<boolean>(false);
  const [editItem, setEditItem] = React.useState<React.SetStateAction<any>>(null);
  const [openMore, setOpenMore] = useState(false);
  const [isModalOpenAcceptMinVal, setIsModalOpenAcceptMinVal] = useState(false);
  const [isModalOpenPaid, setIsModalOpenPaid] = useState(false);

  const [checkedValues, setcheckStatus] = useState(false);
  const [isCreatedItemvAilable, setIsCreatedItemAvailable] = useState(false);
  const [getNumberSelected, setNumberSelected] = useState(0);
  const [openStatus, setOpenStatus] = useState(false);

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
    const userId = props?.policyInfo?.insuraceAccountDetails?.adjuster?.userId;
    const payload = {
      ammount: cashExposureTotalPrice,
      checkNumber: data?.checkNumber,
      claimLineItemDetails: isValuedSelected,
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
          message: "Updated succesfully ",
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

  return (
    <div className="row mb-4">
      <div className={`${ContentListComponentStyle.contentListHeaderContainer} mt-4`}>
        <GenericComponentHeading
          title={`Content List (${claimContentListData.length})`}
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
                    Add Items
                  </div>

                  <div
                    className={ContentListComponentStyle.dropDownInnerDiv}
                    onClick={() =>
                      router.push(`/upload-items-from-csv?claimDetail=${claimId}`)
                    }
                  >
                    Load from file
                  </div>
                </div>
              </Tooltip>
              <GenericButton
                label="Add Item"
                theme="normal"
                size="small"
                type="submit"
                btnClassname={ContentListComponentStyle.contentListBtn}
                id="my-anchor-element"
                onClick={handleDropDown}
              />
              <GenericButton
                label="Create Assignment"
                theme="normal"
                size="small"
                type="submit"
                btnClassname={ContentListComponentStyle.contentListBtn}
                disabled={!isCreatedItemvAilable}
              />
              <GenericButton
                label="Map Receipts"
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
                    ({getNumberSelected}) items selected
                  </span>
                  <div
                    className={ContentListComponentStyle.dropDownInnerDiv}
                    onClick={openModalChangeCat}
                  >
                    Change Category
                  </div>

                  <div
                    id="more-status-btn-element"
                    onClick={() => {
                      setOpenStatus(!openStatus);
                    }}
                    className={ContentListComponentStyle.dropDownInnerDiv}
                  >
                    Change Status
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
                        Mark Valued
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
                      >
                        Mark Settled
                      </div>

                      <div
                        id="more-status-btn-element"
                        className={ContentListComponentStyle.dropDownInnerDiv}
                      >
                        Supervisor Review
                      </div>
                    </div>
                  </Tooltip>
                </div>
              </Tooltip>
              <GenericButton
                label="More"
                theme="normal"
                size="small"
                type="submit"
                id="more-btn-element"
                btnClassname={ContentListComponentStyle.contentListBtn}
                disabled={!checkedValues}
                onClickHandler={() => setOpenMore(!openMore)}
              />
              <GenericButton
                label="Accept Min. Values"
                theme="normal"
                size="small"
                type="submit"
                btnClassname={ContentListComponentStyle.contentListBtn}
                onClickHandler={() => setIsModalOpenAcceptMinVal(true)}
              />
              <GenericButton
                label="Accept Standerd Cost"
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
                {costMinValues.toFixed(2)}&gt;.Would you like to accept the original costs
                as replacement costs of these items?
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
  );
}

const mapStateToProps = ({ claimContentdata, claimDetail }: any) => ({
  editItemDetail: claimContentdata.editItemDetail,
  claimContentListData: claimContentdata.claimContentListData,
  claimContentListDataFull: claimContentdata.claimContentListDataFull,
  claimDetail: claimDetail && claimDetail?.contents,
  policyInfo: claimDetail && claimDetail?.policyInfo,
});
const mapDispatchToProps = {
  addClaimContentListData,
  addNotification,
};
export default connect(mapStateToProps, mapDispatchToProps)(ContentListComponent);
