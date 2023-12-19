"use-client";
import clsx from "clsx";
import React from "react";
import { useState } from "react";
import modalStyle from "./AddNewMsgModalComponent.module.scss";
import GenericSelect from "@/components/common/GenericSelect";
import GenericButton from "@/components/common/GenericButton";
import { IoClose } from "react-icons/io5";

interface AddNewMsgModalComponentProps {
  handleOpenModal: () => void;
}

const AddNewMsgModalComponent: React.FC<AddNewMsgModalComponentProps> = ({
  handleOpenModal,
}) => {
  const [docs, setDocs] = useState<string[]>([]);

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const handleAnchorTagClick = () => {
    document.getElementById("inp")?.click();
  };

  const handleUpload = (event: any) => {
    console.log("handle upload triggered");
    const selectedImageArr: any[] = [];
    const imageUrl = event.target.files[0]?.name;
    selectedImageArr.push(imageUrl);
    setDocs((prev: any) => [...prev, ...selectedImageArr]);
  };

  const handleDeleteImage = (index: number) => {
    const docArray = docs.filter((elem, ind) => {
      if (ind !== index) {
        return elem;
      }
    });
    setDocs([...docArray]);
  };

  return (
    <div>
      <form>
        <div className={clsx(modalStyle.upperContainer, "p-2")}>
          <div className="row col-12 m-2">
            <div className={clsx(modalStyle.inputBoxAlign, "col-2")}>
              <label className={modalStyle.labelStyle}>To</label>
            </div>
            <div className={clsx("col-10")}>
              <GenericSelect
                placeholder={"Select Participants"}
                options={options}
                name={"select participants"}
                showLabel={false}
              />
            </div>
          </div>

          <div className="row col-12 m-2">
            <div className={clsx(modalStyle.inputBoxAlign, "col-2")}>
              <label className={modalStyle.labelStyle}>Message</label>
            </div>
            <div className={clsx("col-10")}>
              <textarea
                id="message"
                className={clsx(modalStyle.textArea, "col-12")}
                placeholder="Message"
              />
            </div>
          </div>

          <div className="row col-12 m-2">
            <div className={clsx(modalStyle.inputBoxAlign, "col-2")}>
              <label className={modalStyle.labelStyle}>Attachments</label>
            </div>
            <div className={clsx("col-10")}>
              <span>
                <a onClick={handleAnchorTagClick}>click to add attachment</a>
              </span>
              <input
                type="file"
                id="inp"
                className={clsx(modalStyle.fileInputStyle)}
                multiple
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={handleUpload}
              ></input>
            </div>
          </div>
          <div className="col-12 row my-2">
            {docs.map((elem: any, index: number) => (
              <div className="row col-6" key={index}>
                <div className={clsx(modalStyle.clipped, "col")}>{elem}</div>
                <div className="col p-0">
                  <IoClose
                    className={clsx(modalStyle.iconColor)}
                    onClick={() => handleDeleteImage(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={clsx(modalStyle.alignRight, "row col-12 mt-2")}>
          <div className={"row col-7"}>
            <div className={clsx("row col-6", modalStyle.centerAlign)}>
              <GenericButton label="Cancel" size="medium" onClick={handleOpenModal} />
            </div>
            <div className="row col-6">
              <GenericButton label="Add Messages" size="medium" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewMsgModalComponent;
