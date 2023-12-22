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

interface AddItemsTableComponentProps {
  onAssignItemsClick: () => void;
  onNewClaimsClick: () => void;
}

const AddItemsTableComponent: React.FC<AddItemsTableComponentProps> = ({
  onAssignItemsClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
            <AssignAddItemButton onAssignItemsClick={onAssignItemsClick} />
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
        <ListAddItemsTable />
      </div>
    </>
  );
};
export default AddItemsTableComponent;
