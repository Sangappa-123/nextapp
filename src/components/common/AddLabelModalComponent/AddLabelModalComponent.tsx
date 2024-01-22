"use-client";
import React from "react";
import clsx from "clsx";
import { useState } from "react";
import GenericButton from "@/components/common/GenericButton";
import GenericInput from "../GenericInput/index";
import Style from "./addLabelModalComponent.module.scss";

interface AddLabelModalComponentProps {
  handleOpenModal: () => void;
}
const AddLabelModalComponent: React.FC<AddLabelModalComponentProps> = (props: any) => {
  const { handleOpenModal } = props;
  const [value, setValue] = useState("");
  const [isBlurred, setIsBlurred] = useState(false);

  const handleBlur = (e: { target: { value: any } }) => {
    if (value === "") {
      setIsBlurred(true);
    } else if (e.target.value) {
      setIsBlurred(false);
    }
  };

  const handleInputChange = (event: { target: { value: any } }) => {
    console.log("log", event.target.value);
    setValue(event.target.value);
  };

  return (
    <div>
      <form>
        <div className="row">
          <div className="col-lg-10">
            <GenericInput
              // className={Style.input}
              placeholder="New Label"
              onChange={handleInputChange}
              onBlur={(e: any) => handleBlur(e)}
              value={value}
            />
            {isBlurred && <p className={Style.error}>Please enter label.. !</p>}
          </div>
          <div className="col-lg-2 mt-2">
            <GenericButton label="Add" size="small" disabled={isBlurred} />
          </div>
        </div>
        <div className={clsx("justify-content-end", Style.button)}>
          <GenericButton label="Close" size="medium" onClick={handleOpenModal} />
        </div>
      </form>
    </div>
  );
};
export default AddLabelModalComponent;
