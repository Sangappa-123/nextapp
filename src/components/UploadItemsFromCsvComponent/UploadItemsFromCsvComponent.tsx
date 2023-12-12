"use client";
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import GenericComponentHeading from "../common/GenericComponentHeading";
import GenericButton from "../common/GenericButton";
import UploadItemsStyle from "./uploadItemsFromCsvComponent.module.scss";
import ExcelSheetTable from "./ExcelSheetTable";
// import { unknownObjectType } from "@/constants/customTypes";
import { setExcelCsvUploadData } from "@/services/excelCsvUploadSlice";
import { fetchExcelCsvTableData } from "@/services/ClaimService";
// import { getServerCookie } from "@/utils/utitlity";

// type ExcelTableData = {
//   slNo:number;
//   brand:unknownObjectType;
//   model	:unknownObjectType;
//   description	:string;
//   ageInYear	:number;
//   ageInMonth	:number;
//   condition:string
//   purchasedFrom	:unknownObjectType
//   purchasedMethod:unknownObjectType
//   quantity:number
//   statedValue:number
//   roomName	:unknownObjectType
//   roomType:string
//   totalCost	:number
//   category	:unknownObjectType
//   subCategory	:unknownObjectType
//   action : unknownObjectType
// };

const UploadItemsFromCsvComponent: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFileChosen, setIsFileChosen] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [excelData, setExcelData] = useState<any[] | null>(null);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  // const userId = getServerCookie("userId");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files && event.target.files[0];
    if (fileUploaded) {
      const isXlsx = fileUploaded.name.endsWith(".xlsx");

      setSelectedFile(fileUploaded);
      setIsFileChosen(true);
      setIsFileUploaded(false);
      setIsLoading(false);
      setUploadProgress(isXlsx ? 100 : 90);
    }
  };

  // const handleStartUpload = () => {
  //   if (selectedFile && selectedFile.name.endsWith(".xlsx")) {
  //     setIsLoading(true);
  //     setTimeout(() => {
  //       setIsFileUploaded(true);
  //     }, 2000);
  //   } else {
  //     setIsLoading(true);
  //     setUploadProgress(90);
  //     setTimeout(() => {
  //       setIsFileUploaded(false);
  //     }, 2000);
  //   }
  // };

  const handleStartUpload = async () => {
    if (selectedFile && selectedFile.name.endsWith(".xlsx")) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await fetchExcelCsvTableData(formData);

        if (response.status === 200) {
          dispatch(setExcelCsvUploadData(response.data.postLossItemDetails));
          setExcelData(response.data.postLossItemDetails);
          setIsFileUploaded(true);
        } else {
          console.error("Error uploading file", response);
          setIsFileUploaded(false);
        }
      } catch (error) {
        console.error("Error uploading file", error);
        setIsFileUploaded(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      setUploadProgress(90);
      setTimeout(() => {
        setIsFileUploaded(false);
      }, 2000);
    }
  };

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  useEffect(() => {
    if (selectedFile) {
      hiddenFileInput.current?.setAttribute("value", selectedFile.name);
    } else {
      hiddenFileInput.current?.setAttribute("value", "");
    }
  }, [selectedFile]);

  return (
    <>
      {!isFileUploaded && (
        <div>
          <div className={UploadItemsStyle.uploadSpacing}>
            <GenericComponentHeading title="Bulk Upload Items" />
          </div>
          {/* // )}
      // {!isFileUploaded && ( */}
          <div className="row">
            <div className="col-lg-8 mt-2">
              <p className={`mt-2 mb-2 ${UploadItemsStyle.stepsTextStyle}`}>
                Steps for uploading catalog items in bulk:
              </p>
              <p className={`mb-3 ${UploadItemsStyle.pTextStyle}`}>
                1. Download the CSV template
                <a href="#"> Upload post loss items to claim </a> to upload items.
              </p>
              <p className={`mb-2 ${UploadItemsStyle.pTextStyle}`}>
                2. Fill the CSV OR modify existing CSV file.
              </p>
              <p className={UploadItemsStyle.pTextStyle1}>
                <span className={UploadItemsStyle.dotIcon}></span> Fields marked with a{" "}
                <span>&#42;</span> are mandatory.
              </p>

              <p className={`mb-3 ${UploadItemsStyle.pTextStyle2}`}>
                <span className={UploadItemsStyle.dotIcon}></span> If an item with the
                same ID already exists, it will be updated.
              </p>

              <p className={`mb-2 ${UploadItemsStyle.pTextStyle}`}>
                3. Load updated file and click on start upload.
              </p>
              <form>
                <div className={`row mb-3 ${UploadItemsStyle.formUploadStyle}`}>
                  <div className="col-lg-2 col-md-2 col-sm-6">
                    <label htmlFor="fileInput" className={UploadItemsStyle.labelFile}>
                      Choose File:
                    </label>
                  </div>
                  <div className="col-lg-5 col-md-5 col-sm-6">
                    <input
                      type="text"
                      className={UploadItemsStyle.formControl}
                      placeholder="No File Selected"
                      value={selectedFile ? selectedFile.name : ""}
                    />
                  </div>
                  <div className="col-lg-4 col-md-3">
                    <button
                      type="button"
                      onClick={handleClick}
                      className={UploadItemsStyle.fileButton}
                    >
                      Choose file
                    </button>
                    <input
                      type="file"
                      onChange={handleChange}
                      ref={hiddenFileInput}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          {isLoading && (
            <div className={UploadItemsStyle.progressBarContainer}>
              <div
                className={UploadItemsStyle.progressBar}
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
          <div className="row mb-4 justify-content-end">
            <div className="col-auto">
              <GenericButton
                label="Cancel"
                theme="lightBlue"
                size="small"
                type="submit"
                btnClassname={UploadItemsStyle.newClaimBtn}
              />
            </div>
            <div className="col-auto">
              <GenericButton
                label="Start Upload"
                theme="lightBlue"
                size="small"
                type="submit"
                btnClassname={UploadItemsStyle.newClaimBtn}
                onClick={handleStartUpload}
                // disabled={!isFileChosen}
                disabled={!isFileChosen || isLoading}
              />
            </div>
          </div>
        </div>
        // </div>
      )}
      {excelData && <ExcelSheetTable postLossItemDetails={excelData} />}
    </>
  );
};

export default UploadItemsFromCsvComponent;
