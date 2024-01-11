"use-client";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useState } from "react";
import modalStyle from "./AddNewMessageModalComponent.module.scss";
import GenericSelect from "@/components/common/GenericSelect";
import GenericButton from "@/components/common/GenericButton";
import { IoClose } from "react-icons/io5";
import useCustomForm from "@/hooks/useCustomForm";
import GenericTextArea from "@/components/common/GenericTextArea";
import { object, string, minLength, Output, array } from "valibot";
import { Controller } from "react-hook-form";

interface AddNewMsgModalComponentProps {
  handleOpenModal: () => void;
  handleMessageSubmit: (data: any) => void;
  claimId: string;
  participants: [];
  defaultValue?: [];
}
const AddNewMsgModalComponent: React.FC<AddNewMsgModalComponentProps> = (props: any) => {
  const { handleOpenModal, participants, defaultValue } = props;
  const [files, setFiles] = useState<any[]>([]);

  const schema = object({
    participants: array(
      object({
        label: string(),
        value: string(),
      }),
      "Please select recipient",
      [minLength(1, "Please select recipient")]
    ),
    message: string([minLength(1, "Message field is required.")]),
  });

  const { register, handleSubmit, formState, control, setValue } = useCustomForm(schema);

  useEffect(() => {
    if (defaultValue) setValue("participants", defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { errors } = formState;
  const handleAnchorTagClick = () => {
    document.getElementById("inp")?.click();
  };
  const handleUpload = (event: any) => {
    const selectedImageArr: any[] = [];
    const fileObj = event.target.files[0];
    if (files.findIndex((file) => file.name === fileObj.name) > -1) {
      event.preventDefault();
    } else {
      selectedImageArr.push(fileObj);
    }
    setFiles((prev: any) => [...prev, ...selectedImageArr]);
    event.target.value = null;
  };
  const handleDeleteImage = (index: number) => {
    const docArray = files.filter((elem, ind) => {
      if (ind !== index) {
        return elem;
      }
    });
    setFiles([...docArray]);
  };
  const handleMessageSubmit = async (data: Output<typeof schema>) => {
    props.handleMessageSubmit({ ...data, files });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleMessageSubmit)}>
        <div className={clsx(modalStyle.upperContainer, "p-2")}>
          <div className="row col-12 m-2">
            <div className={clsx(modalStyle.inputBoxAlign, "col-2")}>
              <label className={modalStyle.labelStyle}>To</label>
            </div>
            <div className={clsx("col-10")}>
              <Controller
                control={control}
                name="participants"
                render={({ field: { onChange: fieldOnChange, ...rest } }: any) => (
                  <GenericSelect
                    placeholder={"Select Participants"}
                    options={participants}
                    isMulti={true}
                    showError={errors["participants"]}
                    errorMsg={errors?.participants?.message}
                    onChange={(e: any) => {
                      fieldOnChange(e);
                    }}
                    defaultValue={defaultValue}
                    {...rest}
                  />
                )}
              />
            </div>
          </div>

          <div className="row col-12 m-2">
            <div className={clsx(modalStyle.inputBoxAlign, "col-2")}>
              <label className={modalStyle.labelStyle}>Message</label>
            </div>
            <div className={clsx("col-10")}>
              <GenericTextArea
                showError={errors["message"]}
                errorMsg={errors?.message?.message}
                id="message"
                placeholder="Message"
                {...register("message")}
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
            {files.map((elem: any, index: number) => (
              <div className="row col-6" key={index}>
                <div className={clsx(modalStyle.clipped, "col")}>{elem.name}</div>
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
              <GenericButton label="Add Messages" type="submit" size="medium" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddNewMsgModalComponent;
