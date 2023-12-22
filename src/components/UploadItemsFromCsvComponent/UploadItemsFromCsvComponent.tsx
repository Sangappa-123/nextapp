"use client";
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import GenericComponentHeading from "../common/GenericComponentHeading";
import GenericButton from "../common/GenericButton";
import UploadItemsStyle from "./uploadItemsFromCsvComponent.module.scss";
import ExcelSheetTable from "./ExcelSheetTable";
import { ConnectedProps, connect } from "react-redux";
// import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Cards from "../common/Cards";
// import { unknownObjectType } from "@/constants/customTypes";
import { setExcelCsvUploadData } from "@/reducers/UploadCSV/excelCsvUploadSlice";
import { fetchExcelCsvTableData } from "@/services/ClaimService";
import ProgressBar from "../common/ProgressBar/ProgressBar";
// import { useRouter } from "next/navigation";
// import { getServerCookie } from "@/utils/utitlity";

// interface ExcelSheetTableProps {
//   postLossItemDetails: any[];
// }
const UploadItemsFromCsvComponent: React.FC<connectorType> = (props) => {
  const { rowsProcessed, postLossItemDetails } = props;
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFileChosen, setIsFileChosen] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [excelData, setExcelData] = useState<any[] | null>(null);
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [validItemsCount, setValidItemsCount] = useState<number>(0);
  const [failedItemsCount, setFailedItemsCount] = useState<number>(0);

  const handleCancelClick = () => {
    setSelectedFile(null);
    setIsFileChosen(false);
    setIsFileUploaded(false);
    setIsLoading(false);
    setUploadProgress(0);
    setExcelData(null);
  };

  const serverAddress = process.env.NEXT_PUBLIC_SERVER_ADDRESS;
  const itemTemplate = process.env.NEXT_PUBLIC_ITEM_TEMPLATE;

  const downloadLink = `${serverAddress}${itemTemplate}`;

  // const userId = getServerCookie("userId");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files && event.target.files[0];
    if (fileUploaded) {
      const isXlsx = fileUploaded.name.endsWith(".xlsx");

      setSelectedFile(fileUploaded);
      setIsFileChosen(true);
      setIsFileUploaded(false);
      setIsLoading(false);
      setUploadProgress(isXlsx ? 0 : 90);
    }
  };

  const handleStartUpload = async () => {
    if (selectedFile && selectedFile.name.endsWith(".xlsx")) {
      setIsLoading(true);

      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const totalSteps = 10;
        const interval = 500;

        for (let i = 0; i <= totalSteps; i++) {
          await new Promise((resolve) => setTimeout(resolve, interval));
          const step = Math.min(20 + i * 10, 100);
          setUploadProgress(step);
        }

        const response = await fetchExcelCsvTableData(formData);

        if (response.status === 200) {
          // dispatch(setExcelCsvUploadData(response.data));
          // const failedItems = response.data.failedItems || [];
          // if (failedItems.length > 0) {
          //   console.log("Failed Items:", failedItems);
          // }

          // console.log("rrrrrrrrrrr", response);
          // console.log("ssssssss", response.data);
          // console.log("lllllllll", response.data.postLossItemDetails);
          // setExcelData(response.data.postLossItemDetails);
          // setIsFileUploaded(true);
          const { postLossItemDetails } = response.data;
          dispatch(setExcelCsvUploadData(response.data));

          const failedItems = postLossItemDetails.filter(
            (item: any) => !item.isValidItem
          );
          setFailedItemsCount(failedItems.length);
          setValidItemsCount(postLossItemDetails.length - failedItems.length);

          setExcelData(response.data.postLossItemDetails);
          setIsFileUploaded(true);
        } else {
          console.error("Errloadingfile", response);
          setIsFileUploaded(false);
        }
      } catch (error) {
        console.error("Errorpload", error);
        setIsFileUploaded(false);
      } finally {
        setIsLoading(false);
        setUploadProgress(0);
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

  // useEffect(() => {
  //   setFailedItemsCount((prevCount) => {
  //     const updatedFailedItems = postLossItemDetails.filter((item) => !item.isValidItem);
  //     return updatedFailedItems.length;
  //   });

  //   setValidItemsCount((prevCount) => {
  //     const updatedValidItems = postLossItemDetails.filter((item) => item.isValidItem);
  //     return updatedValidItems.length;
  //   });
  // }, [postLossItemDetails, setFailedItemsCount, setValidItemsCount]);

  useEffect(() => {
    const updatedFailedItems = postLossItemDetails.filter((item) => !item.isValidItem);
    const updatedFailedItems2 = postLossItemDetails.filter((item) => item.isValidItem);

    setFailedItemsCount(updatedFailedItems.length);
    setValidItemsCount(updatedFailedItems2.length);
  }, [postLossItemDetails]);

  useEffect(() => {
    if (selectedFile) {
      hiddenFileInput.current?.setAttribute("value", selectedFile.name);
    } else {
      hiddenFileInput.current?.setAttribute("value", "");
    }
    setUploadProgress(0);
    setExcelData(null);
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
                <a href={downloadLink} download>
                  {" "}
                  Upload post loss items to claim{" "}
                </a>{" "}
                to upload items.
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
                      readOnly
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
              <ProgressBar value={uploadProgress} />
            </div>
          )}
          <div className="row mb-4 justify-content-end">
            <div className="col-auto">
              <GenericButton
                label="Cancel"
                size="small"
                type="submit"
                // onClick={handleRouteChange}
                btnClassname={UploadItemsStyle.newClaimBtn}
              />
            </div>
            <div className="col-auto">
              <GenericButton
                label="Start Upload"
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
      {isFileUploaded && excelData && (
        <>
          <Cards className="ml-2 mr-2">
            <div>
              <div>
                <div className="p-2">
                  <GenericComponentHeading
                    title="Verify Information"
                    customHeadingClassname={UploadItemsStyle.infomationStyle}
                    customTitleClassname={UploadItemsStyle.customTitleClassname}
                  />
                </div>
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-12">
                    <p className={`mt-2 ${UploadItemsStyle.pTitleText}`}>
                      File Name :{" "}
                      <span className={UploadItemsStyle.spanTitle}>
                        {selectedFile ? selectedFile.name : ""}
                      </span>
                    </p>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="row justify-content-end">
                      <div className="col-auto">
                        <GenericButton
                          label="Cancel"
                          // theme="lightBlue"
                          size="small"
                          type="submit"
                          onClick={() => {
                            handleCancelClick();
                          }}
                        />
                      </div>
                      <div className="col-auto">
                        <GenericButton
                          label="Finish Upload"
                          // theme="lightBlue"
                          size="small"
                          type="submit"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className={`mt-2 ${UploadItemsStyle.pTitleTextRowsProcess}`}>
                    Rows Processed :{" "}
                    <span className={UploadItemsStyle.spanTitle}>{rowsProcessed}</span>
                  </p>
                </div>
                <div>
                  <p className={`mt-2 ${UploadItemsStyle.pTitleTextRows}`}>
                    Valid Item(s):{" "}
                    <span className={UploadItemsStyle.spanTitle}>
                      {validItemsCount}/{rowsProcessed}
                    </span>
                  </p>
                </div>
                <div>
                  <p className={`mt-2 mb-3 ${UploadItemsStyle.pTitleTextRowsFailed}`}>
                    Failed Item(s):{" "}
                    <span className={UploadItemsStyle.spanTitle}>
                      {failedItemsCount}/{rowsProcessed}
                    </span>
                  </p>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-2" />
                <div className="col-7">
                  {failedItemsCount > 0 && (
                    <div>
                      <table className={UploadItemsStyle.customTable}>
                        <thead>
                          <tr>
                            <th>Item #</th>
                            <th>Reason</th>
                          </tr>
                        </thead>
                        <tbody>
                          {postLossItemDetails
                            .filter((item) => item.isValidItem === false)
                            .map((failedItem) => (
                              <tr key={failedItem.id}>
                                <td>{failedItem.id}</td>
                                <td>{failedItem.failedReasons}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              <ExcelSheetTable />
              {/* </div> */}
            </div>
          </Cards>
        </>
      )}
      {console.log("exxxxxxxxxxxxx", excelData)}
    </>
  );
};

// export default UploadItemsFromCsvComponent;
const mapStateToProps = (state: RootState) => ({
  postLossItemDetails: state.excelCsvUpload.postLossItemDetails,
  rowsProcessed: state.excelCsvUpload.rowsProcessed,
});

const mapDispatchToProps = {
  setExcelCsvUploadData,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(UploadItemsFromCsvComponent);
