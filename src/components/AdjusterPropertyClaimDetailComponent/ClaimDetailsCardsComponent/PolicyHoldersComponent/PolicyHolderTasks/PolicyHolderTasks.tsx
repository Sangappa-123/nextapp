import React from "react";
import clsx from "clsx";
import PolicyHolderTasksStyle from "./PolicyHolderTasks.module.scss";

interface PolicyHolderTasksProps {
  elem: any;
  handleOpenTaskModal: any;
}

const PolicyHolderTasks = ({ elem, handleOpenTaskModal }: PolicyHolderTasksProps) => {
  return (
    <>
      <div
        className={clsx(PolicyHolderTasksStyle.Container, "col-12 p-2")}
        onClick={handleOpenTaskModal}
      >
        <div className={clsx(PolicyHolderTasksStyle.labelStyle, "col-5")}>
          {elem.formName}
        </div>
        <div className={clsx(PolicyHolderTasksStyle.labelStatus, "col-3")}>
          {elem.status}
        </div>
        <div className={clsx(PolicyHolderTasksStyle.labelStyle, "col-4")}>
          {elem.assignedDate}
        </div>
      </div>
    </>
  );
};

export default PolicyHolderTasks;
