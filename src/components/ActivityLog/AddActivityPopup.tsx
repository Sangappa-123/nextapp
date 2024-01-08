"use-client";
import clsx from "clsx";
import React from "react";
import { useState } from "react";
import modalStyle from "./AddActivityPopup.module.scss";
import GenericButton from "@/components/common/GenericButton";
import noImg from "@/assets/images/no-image.png";
import { toast } from "react-toastify";
import { FaTimesCircle } from "react-icons/fa";
import excelImg from "@/assets/images/excel-img.png";
import pdfImg from "@/assets/images/pdf-img.png";
import docImg from "@/assets/images/word-img.png";
import unKnownImg from "@/assets/images/unknown.png";
import { uploadActivityLogData } from "@/services/AdjusterPropertyClaimDetailServices/AdjusterPropertyClaimDetailService";
interface AddActivityPopupProps {
  handleOpenModal: () => void;
}

const AddActivityPopup: React.FC<AddActivityPopupProps> = ({ handleOpenModal }) => {
  const [fileName, setFileName] = useState<string>("...");
  const [prevImg, setPrevImg] = useState<any>(noImg.src);
  const [showMe, setshowMe] = useState<boolean>(false);
  const [showError, setshowError] = useState<boolean>(false);
  const [description, setDescription] = useState<any>("");
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [file, setFile] = useState<any>(null);

  const handleAnchorTagClick = () => {
    document.getElementById("FileUpload")?.click();
  };

  const handleUpload = (event: any) => {
    setFileName(event.target.files[0]?.name);
    const file = event.target.files[0];
    setFile(file);

    const fileExtension = file.name.substr(file.name.lastIndexOf("."));
    const size = file.size;
    if (
      [".jpeg", ".png", ".jpg", ".xls", ".xlsx", ".pdf", ".doc", ".docx"].includes(
        fileExtension.toLowerCase()
      )
    ) {
      if (size <= 20000000) {
        if (fileExtension.includes("xls") || fileExtension.includes("xlsx")) {
          setPrevImg(excelImg.src);
        } else if (fileExtension.includes("docx") || fileExtension.includes("doc")) {
          setPrevImg(docImg.src);
        } else if (fileExtension.includes("pdf")) {
          setPrevImg(pdfImg.src);
        } else if (
          fileExtension.includes("jpeg") ||
          fileExtension.includes("png") ||
          fileExtension.includes("jpg")
        ) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPrevImg(reader.result);
            setshowMe(true);
          };
          reader.readAsDataURL(file);
        } else {
          setPrevImg(unKnownImg.src);
        }
      } else {
        toast.error("file size exceeded . Please upload image below 20Mb");
      }
    } else {
      toast.error("File type jpg ,jpeg ,png ,word ,excel ,pdf  is supported");
    }
  };

  const handleImageError = () => {
    setPrevImg(noImg.src);
  };

  const removeImage = () => {
    setshowMe(false);
    setPrevImg(noImg.src);
    setFileName("...");
  };

  const handleChange = (event: any) => {
    setDescription(event.target.value);
    if (!event.target.value || event.target.value.trim() === "") {
      setDisabledButton(true);
      setshowError(true);
      return;
    } else if (event.target.value) {
      setDisabledButton(false);
      setshowError(false);
    }
  };

  const handleBlur = () => {
    if (description && description.trim() != "") {
      setshowError(false);
    } else {
      setshowError(true);
    }
    // Your custom logic for blur
  };

  const publishActivity = async () => {
    const messageReceipient: any = [];
    // let internal: boolean = true;
    // let registration: any;
    //checking needed
    // if (item.participantType.participantType.toUpperCase() == 'EXTERNAL' ||
    //   item.participantType.participantType.toUpperCase() == 'EXISTING VENDOR' ||
    //   item.participantType.participantType.toUpperCase() == 'NEW VENDOR'
    // ) {
    //   internal = false;
    //   registration = item.vendorRegistration;
    //   messageReceipient.push({
    //     "participantId": item.participantId, "email": item.emailId, "participantType": { "id": item.participantType.id, "participantType": item.participantType.participantType }, "vendorRegistration": item ? item.vendorRegistration : null
    //   });
    // }
    // else {
    //   messageReceipient.push({
    //     "participantId": item.participantId, "email": item.emailId, "participantType": { "id": item.participantType.id, "participantType": item.participantType.participantType }
    //   });
    // }
    //checking needed end

    const formData = new FormData();
    formData.append(
      "customActivity",
      JSON.stringify({
        id: null,
        description: description,
        claim: {
          claimId: sessionStorage.getItem("claimId"),
        },
        participants: messageReceipient,
        companyURL: sessionStorage.getItem("CRN"),
        activityEvent: 4,
      })
    );

    if (file) {
      const fileExtension = file.name.substr(file.name.lastIndexOf("."));
      const fileDetaills = [
        {
          extension: fileExtension,
          fileName: file.name,
          filePurpose: "CUSTOM_ACTIVITY_LOG",
          fileType: file.type,
        },
      ];
      formData.append("filesDetails", JSON.stringify(fileDetaills));
      formData.append("file", file);
    } else {
      formData.append("filesDetails", JSON.stringify([]));
      formData.append("file", JSON.stringify([]));
    }

    const result = await uploadActivityLogData(formData);
    if (result.status == 200) {
      toast.success(result.message);
      handleOpenModal();
    }
  };

  return (
    <div>
      <form>
        <div className={clsx(modalStyle.upperContainer, "p-2 row")}>
          <div className="col-4">
            <FaTimesCircle
              className={modalStyle.deleteImageSty}
              onClick={removeImage}
              style={{
                display: showMe ? "block" : "none",
              }}
            />
            <img
              className={modalStyle.noImg}
              src={prevImg}
              alt="Preview"
              style={{ maxWidth: "100%", width: "300px" }}
              onError={handleImageError}
            />
            <h6 className={modalStyle.fileNameSty}>{fileName}</h6>
            <input
              onChange={handleUpload}
              id="FileUpload"
              type="file"
              name="imageUpload"
              style={{ display: "none" }}
              accept="image/*|.pdf|.xls|.xlsx|.docx|.doc"
              placeholder="upload Image"
            />
            <a className={modalStyle.uploadAnchor} onClick={handleAnchorTagClick}>
              Click to add attachment
            </a>
            &nbsp;
            <div className={modalStyle.infoTextbox}>
              <span>
                The file should be jpg, jpeg, png, word, excel and pdf format and can
                upload to 20Mb file size.
              </span>
            </div>
          </div>
          <div className={clsx(modalStyle.descCont, "col-8")}>
            <label htmlFor="desc">
              <span>*</span>Description
            </label>
            <textarea
              className={modalStyle.descField}
              rows={10}
              id="desc"
              value={description}
              onBlur={handleBlur}
              onChange={handleChange}
              cols={20}
              placeholder="Description"
            />
            <div style={{ height: "22px" }}>
              <span
                style={{
                  display: showError ? "block" : "none",
                  color: "red",
                  fontSize: "12px",
                }}
              >
                Please enter Activity description
              </span>
            </div>
          </div>
        </div>

        <div className={clsx(modalStyle.alignRight, "row col-12 mt-2")}>
          <div className={modalStyle.buttonContStyle}>
            <GenericButton
              className={modalStyle.buttonStyle}
              label="Cancel"
              size="medium"
              onClick={handleOpenModal}
            />
            <GenericButton
              disabled={disabledButton}
              className={modalStyle.buttonStyle}
              label="Publish Activity"
              size="medium"
              onClick={publishActivity}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddActivityPopup;
