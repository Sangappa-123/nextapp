"use client";
import React, { useState, useEffect, useRef } from "react";
import ReceiptMapperPdfList from "../ReceiptMapperPdfList/ReceiptMapperPdfList";
import { receiptApiUrl } from "@/services/ReceiptMapper/ReceiptMapperService";
import { RiListCheck } from "react-icons/ri";
import { getReceiptMapperDate } from "@/services/ReceiptMapper/ReceiptMapperService";
import { useAppDispatch } from "@/hooks/reduxCustomHook";
import { addNotification } from "@/reducers/Notification/NotificationSlice";
import receiptMapperStyle from "../../../receiptMapperComponent.module.scss";
import GenericButton from "@/components/common/GenericButton/index";
import ReciptMapperSearchBox from "../ReciptMapperSearchBox/ReciptMapperSearchBox";
import { useParams } from "next/navigation";
import RecieptMapperPdfViewer from "../RecieptMapperPdfViewer/RecieptMapperPdfViewer";
import { addSelectedFile } from "@/reducers/ReceiptMapper/ReceiptMapperSlice";

const RecieptMapperMainComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { claimId } = useParams();

  const [showPdfViewer, setPdfViewer] = useState(false);
  const [showListLoader, setListLoader] = useState(false);

  useEffect(() => {
    const getItems = async () => {
      setListLoader(true);
      await getReceiptMapperDate({
        claimId: claimId,
      });
      setListLoader(false);
    };
    getItems();
  }, [claimId]);

  const handleReceipt = (e: any) => {
    const formData: any = new FormData();

    formData.append("pdfFile", e.target.files[0]);
    formData.append("pdfName", e.target.files[0].name);
    formData.append("claimId", claimId);

    receiptApiUrl(formData)
      .then(() => {
        e.preventDefault();
        if (e.target.files[0].type !== "application/pdf") {
          dispatch(
            addNotification({
              message: "Please enter the PDF file",
              id: "receipt_file_message",
              status: "error",
            })
          );
        }
      })
      .catch((error) => console.log(" receiptApiUrl Failed", error));
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={receiptMapperStyle.receiptMapperContainer}>
      <div className={receiptMapperStyle.receiptMapperListContainer}>
        <div className="col-7">
          <GenericButton
            label="New Receipt"
            size="small"
            onClick={() => fileInputRef?.current && fileInputRef?.current?.click()}
          />
          <input
            type="file"
            id="inp"
            multiple
            ref={fileInputRef}
            hidden
            accept=".pdf"
            onChange={handleReceipt}
          ></input>
        </div>
        <div className="col-5 text-right">
          {showPdfViewer ? (
            <div
              className="cursor-pointer"
              onClick={() => {
                setPdfViewer(false);
                dispatch(addSelectedFile({ fileUrl: "", fileName: "" }));
              }}
            >
              <RiListCheck size="25px" fill="white" />
            </div>
          ) : (
            <ReciptMapperSearchBox setListLoader={setListLoader} />
          )}
        </div>
      </div>
      {showPdfViewer ? (
        <RecieptMapperPdfViewer />
      ) : (
        <ReceiptMapperPdfList
          showListLoader={showListLoader}
          setPdfViewer={setPdfViewer}
        />
      )}
    </div>
  );
};

export default RecieptMapperMainComponent;
