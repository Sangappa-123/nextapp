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
import { updateCliamStatus } from "@/services/AdjusterPropertyClaimDetailServices/AdjusterPropertyClaimDetailService";
import clsx from "clsx";

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
  console.log("claimContentListDataFull", claimContentListDataFull);

  const handleCreatedStatus = async () => {
    const selectedClaims =
      claimContentListDataFull &&
      claimContentListDataFull.length > 0 &&
      claimContentListDataFull.filter(
        (item: any) => item.selected === true && item.statusName === "CREATED"
      );

    const param = {
      claimItems: selectedClaims,
      itemStatus: "VALUED",
    };
    const updateStatusresult = await updateCliamStatus(param);

    if (updateStatusresult?.status === 200) {
      const payload = { claimId };
      const claimContentListRes = await claimContentList(payload, true);

      if (claimContentListRes) {
        props.addClaimContentListData({ claimContentData: claimContentListRes, claimId });

        props.addNotification({
          message: "Status Updated Successfully",
          id: "update_status_valued_success",
          status: "success",
        });
        closeModal();
      }
    } else {
      props.addNotification({
        message: "Something went wrong.",
        id: "update_status_valued_failure",
        status: "error",
      });
    }
  };

  const isCreatedSelected = claimContentListDataFull.filter(
    (item: any) => item.statusName === "CREATED" && item.selected === true
  );
  const isNotCreatedSelected = claimContentListDataFull.filter(
    (item: any) => item.statusName !== "CREATED" && item.selected === true
  );
  const isNotValuedSelected = claimContentListDataFull.filter(
    (item: any) => item.statusName !== "VALUED" && item.selected === true
  );

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
                          { "d-none": !(isNotValuedSelected.length > 0) },
                          ContentListComponentStyle.dropDownInnerDiv
                        )}
                      >
                        Mark Paid
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

const mapStateToProps = ({ claimContentdata }: any) => ({
  editItemDetail: claimContentdata.editItemDetail,
  claimContentListData: claimContentdata.claimContentListData,
  claimContentListDataFull: claimContentdata.claimContentListDataFull,
});
const mapDispatchToProps = {
  addClaimContentListData,
  addNotification,
};
export default connect(mapStateToProps, mapDispatchToProps)(ContentListComponent);
