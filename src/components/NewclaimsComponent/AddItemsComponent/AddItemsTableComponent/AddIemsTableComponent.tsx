"use client";
import React from "react";
import { useState } from "react";
import AddItemsButton from "./AddItemsButton";
import AddTableSTyle from "./addItemsTableComponent.module.scss";
import AssignAddItemButton from "./AssignAddItemButton";
import SelectBoxAddItems from "./SelectBoxAddItems";
import LoadFileAddItemButton from "./LoadFileAddItemButton";
import SearchBoxAddItems from "./SearchBoxAddItems";
import ListAddItemsTable from "./ListAddItemsTable";
import Modal from "@/components/common/ModalPopups";
import AddItemModalForm from "@/components/AddItemModalForm";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ConnectedProps, connect } from "react-redux";
import { useAppDispatch } from "@/hooks/reduxCustomHook";
// import { useAppSelector } from "@/hooks/reduxCustomHook";
import {
  setAddItemsTableData,
  setSelectedItems,
} from "@/reducers/UploadCSV/AddItemsTableCSVSlice";
import { RootState } from "@/store/store";

interface AddItemsTableComponentProps {
  onAssignItemsClick: () => void;
  isAnyItemSelected: boolean;
}

const AddItemsTableComponent: React.FC<AddItemsTableComponentProps & connectorType> = ({
  onAssignItemsClick,
  isAnyItemSelected,
  selectedItems,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const { claimId } = useSearchParams();

  const dispatch = useAppDispatch();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    router.push(`/adjuster-property-claim-details/${claimId}`);
  };

  const handleCheckboxChange = (item: any) => {
    const updatedSelectedItems = selectedItems.includes(item)
      ? selectedItems.filter((selectedItem) => selectedItem !== item)
      : [...selectedItems, item];
    dispatch(setSelectedItems(updatedSelectedItems));
  };

  return (
    <>
      <div className={AddTableSTyle.addItemsContainer}>
        <div className="col-12">
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            childComp={<AddItemModalForm />}
            headingName="Add Item"
            modalWidthClassName={AddTableSTyle.modalWidth}
          ></Modal>
        </div>

        <div className={`row gx-2 ${AddTableSTyle.addItemsContentContainer}`}>
          <div
            className={`col-lg-2 col-md-2 col-sm-12 col-12 mt-2 mb-2 ${AddTableSTyle.addButtonStyle}`}
            onClick={openModal}
          >
            <AddItemsButton />
          </div>
          <div
            className={`col-lg-2 col-md-2 col-sm-12 col-12 mt-2 mb-2 ${AddTableSTyle.loadButtonStyle}`}
          >
            <LoadFileAddItemButton />
          </div>
          <div
            className={`col-lg-2 col-md-2 col-sm-12 col-12 mt-2 mb-2 ${AddTableSTyle.assignButtonStyle}`}
          >
            <AssignAddItemButton
              isAnyItemSelected={isAnyItemSelected}
              onClick={onAssignItemsClick}
            />
          </div>
          <div
            className={`col-lg-3 col-md-3 col-sm-12 col-12 mt-2 mb-2 ${AddTableSTyle.selectItemsStyle}`}
          >
            <SelectBoxAddItems />
          </div>
          <div
            className={`col-lg-3 col-md-3 col-sm-12 col-12 mt-2 mb-2 ${AddTableSTyle.searchItemsStyle}`}
          >
            <SearchBoxAddItems />
          </div>
        </div>
      </div>
      <div className="row">
        <ListAddItemsTable onCheckboxChange={handleCheckboxChange} />
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  addItemsTableData: state.addItemsTable.addItemsTableData,
  selectedItems: state.addItemsTable.selectedItems,
  isAnyItemSelected: state.addItemsTable.isAnyItemSelected,
});

const mapDispatchToProps = {
  setAddItemsTableData,
  setSelectedItems,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(AddItemsTableComponent);
