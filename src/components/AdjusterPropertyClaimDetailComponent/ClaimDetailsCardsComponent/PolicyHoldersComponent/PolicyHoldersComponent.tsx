"use client";
import { useState } from "react";
import Cards from "@/components/common/Cards";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";
// import NoRecordComponent from "@/components/common/NoRecordComponent/NoRecordComponent";
import PolicyHolderTasks from "./PolicyHolderTasks";
import Link from "next/link";
import PolicyHolderCradStyle from "./PolicyHolderCard.module.scss";
import Modal from "@/components/common/ModalPopups";
import PolicyCreateTaskModalComponent from "./PolicyCreateTaskModalComponent";
import NewTaskModal from "./NewTaskModal.tsx";
import clsx from "clsx";

const PolicyHoldersComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openTaskModal, setOpenTaskModal] = useState(false);

  const handleOpenTaskModal = () => {
    setOpenTaskModal(!openTaskModal);
  };

  const dataArray = [
    {
      formName: "Attach Picture of the damage",
      status: "PENDING",
      assignedDate: "Dec 18, 2023 9:13 AM",
    },
    {
      formName: "List of sechduled items lost/damaged",
      status: "PENDING",
      assignedDate: "Dec 18, 2023 9:13 AM",
    },
    {
      formName: "Attach Police report",
      status: "PENDING",
      assignedDate: "Dec 18, 2023 9:13 AM",
    },
    {
      formName: "Attach Picture of the damage",
      status: "PENDING",
      assignedDate: "Dec 18, 2023 9:13 AM",
    },
    {
      formName: "List of sechduled items lost/damaged",
      status: "PENDING",
      assignedDate: "Dec 18, 2023 9:13 AM",
    },
    {
      formName: "Attach Police report",
      status: "PENDING",
      assignedDate: "Dec 18, 2023 9:13 AM",
    },
    {
      formName: "Attach Picture of the damage",
      status: "PENDING",
      assignedDate: "Dec 18, 2023 9:13 AM",
    },
    {
      formName: "List of sechduled items lost/damaged",
      status: "PENDING",
      assignedDate: "Dec 18, 2023 9:13 AM",
    },
    {
      formName: "Attach Police report",
      status: "PENDING",
      assignedDate: "Dec 18, 2023 9:13 AM",
    },
    {
      formName: "Attach Picture of the damage",
      status: "PENDING",
      assignedDate: "Dec 18, 2023 9:13 AM",
    },
    {
      formName: "List of sechduled items lost/damaged",
      status: "PENDING",
      assignedDate: "Dec 18, 2023 9:13 AM",
    },
    {
      formName: "Attach Police report",
      status: "PENDING",
      assignedDate: "Dec 18, 2023 9:13 AM",
    },
  ];

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleOpenModal}
        headingName="Create Task"
        childComp={<PolicyCreateTaskModalComponent handleOpenModal={handleOpenModal} />}
        overlayClassName={PolicyHolderCradStyle.modalContainer}
        modalWidthClassName={PolicyHolderCradStyle.modalContent}
      />

      <Cards className={PolicyHolderCradStyle.policyHolderCradContainer}>
        <GenericComponentHeading title="Policyholder's Task">
          <div className="text-right">
            <Link href="#" onClick={handleOpenModal}>
              Create New Task
            </Link>
          </div>
        </GenericComponentHeading>
        <div className={PolicyHolderCradStyle.taskContentContainer}>
          <div className={clsx(PolicyHolderCradStyle.formNameContainer, "col-12 p-2")}>
            <div className={clsx(PolicyHolderCradStyle.labelStyle, "col-5")}>
              Form Name
            </div>
            <div className={clsx(PolicyHolderCradStyle.labelStyle, "col-3")}>Status</div>
            <div className={clsx(PolicyHolderCradStyle.labelStyle, "col-4")}>
              Assigned Date
            </div>
          </div>
          {/* <NoRecordComponent message="No task available" /> */}
          {dataArray?.map((elem, index) => (
            <PolicyHolderTasks
              elem={elem}
              key={index}
              handleOpenTaskModal={handleOpenTaskModal}
            />
          ))}

          <div>
            <Modal
              isOpen={openTaskModal}
              onClose={handleOpenTaskModal}
              headingName="#4 List of scheduled items lost/damaged"
              childComp={<NewTaskModal handleOpenTaskModal={handleOpenTaskModal} />}
              overlayClassName={PolicyHolderCradStyle.modalContainer}
              modalWidthClassName={PolicyHolderCradStyle.modalContent}
            />
          </div>
        </div>
        <div className="text-right">
          <Link href="/all-tasks">View all</Link>
        </div>
      </Cards>
    </>
  );
};
export default PolicyHoldersComponent;
