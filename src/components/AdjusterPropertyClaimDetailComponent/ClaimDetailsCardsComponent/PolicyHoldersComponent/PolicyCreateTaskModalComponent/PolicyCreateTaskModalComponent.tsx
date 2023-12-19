"use-client";
import clsx from "clsx";
import React from "react";
import modalStyle from "./PolicyCreateTaskModalComponent.module.scss";
import GenericSelect from "@/components/common/GenericSelect";
import GenericButton from "@/components/common/GenericButton";

interface PolicyCreateTaskModalComponentProps {
  handleOpenModal: () => void;
}

const PolicyCreateTaskModalComponent: React.FC<PolicyCreateTaskModalComponentProps> = ({
  handleOpenModal,
}) => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  return (
    <div>
      <form>
        <div className={clsx(modalStyle.upperContainer, "p-2")}>
          <div className="row col-12 m-2">
            <div className={clsx(modalStyle.inputBoxAlign, "col-3")}>
              <label className={modalStyle.labelStyle}>Assigned To</label>
            </div>
            <div className={clsx(modalStyle.labelStyle, "col-7 mx-3")}>Smith, Gracie</div>
          </div>

          <div className="row col-12 m-2">
            <div className={clsx(modalStyle.inputBoxAlign, "col-3")}>
              <label className={modalStyle.labelStyle}>Form Name</label>
            </div>
            <div className={clsx("col-7 mx-3")}>
              <GenericSelect
                placeholder={""}
                options={options}
                name={"form name"}
                showLabel={false}
              />
            </div>
          </div>

          <div className="row col-12 m-2">
            <div className={clsx(modalStyle.inputBoxAlign, "col-3")}>
              <label className={modalStyle.labelStyle}>Description</label>
            </div>
            <div className={clsx("col-7 mx-3")}>
              <textarea
                id="description"
                className={clsx(modalStyle.textAreaStyle, "col-12")}
                placeholder=""
              />
            </div>
          </div>
        </div>

        <div className={clsx(modalStyle.alignRight, "row col-12 mt-2")}>
          <div className={"row col-7"}>
            <div className={clsx("row col-6", modalStyle.centerAlign)}>
              <GenericButton label="Cancel" size="medium" onClick={handleOpenModal} />
            </div>
            <div className="row col-6">
              <GenericButton label="Add Form" size="medium" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PolicyCreateTaskModalComponent;
