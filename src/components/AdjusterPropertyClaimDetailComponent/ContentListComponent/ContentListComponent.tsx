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

function ContentListComponent(props: any) {
  const {
    claimContentListRes,
    addClaimContentListData,
    claimId,
    editItemDetail,
    claimContentListData,
  } = props;
  console.log("calimID", props.claimId);
  const router = useRouter();
  const [tableLoader, setTableLoader] = useState<boolean>(false);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editItem, setEditItem] = React.useState<React.SetStateAction<any>>(null);

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
                disabled={true}
              />
              <GenericButton
                label="Map Receipts"
                theme="normal"
                size="small"
                type="submit"
                btnClassname={ContentListComponentStyle.contentListBtn}
              />
              <GenericButton
                label="More"
                theme="normal"
                size="small"
                type="submit"
                btnClassname={ContentListComponentStyle.contentListBtn}
                disabled={true}
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
});
const mapDispatchToProps = {
  addClaimContentListData,
};
export default connect(mapStateToProps, mapDispatchToProps)(ContentListComponent);
