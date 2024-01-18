"use client";
import React, { useEffect, useState, useRef } from "react";
// import { useParams } from "next/navigation";
import receiptMapperStyle from "../receiptMapperComponent.module.scss";

import {
  getClaimedItems,
  getReceiptMapperDate,
} from "@/services/ReceiptMapper/ReceiptMapperService";
import ClaimedItemsTable from "../ClaimedItemsTable/ClaimedItemsTable";
import ClaimedItemsSearchBox from "../ClaimedItemsSearchBox/ClaimedItemsSearchBox";
import GenericButton from "@/components/common/GenericButton/index";
import ReciptMapperSearchBox from "../ReciptMapperSearchBox/ReciptMapperSearchBox";
import RecieptMapperMainComponent from "../RecieptMapperMainComponent/RecieptMapperMainComponent";
import { receiptApiUrl } from "@/services/ClaimService";
import { useAppDispatch } from "@/hooks/reduxCustomHook";
import { addNotification } from "@/reducers/Notification/NotificationSlice";

import { useParams } from "next/navigation";

type propTypes = {
  claimNumber: string;
};
const ClaimedItemsComponent: React.FC<propTypes> = ({ claimNumber }: propTypes) => {
  const { claimId } = useParams();
  const dispatch = useAppDispatch();

  const [tableLoader, setTableLoader] = useState<boolean>(false);

  useEffect(() => {
    const getItems = async () => {
      await getClaimedItems({
        claimNumber: claimNumber,
        reqForReceiptMapper: true,
      });
      await getReceiptMapperDate({
        claimId: claimId,
      });
    };
    getItems();
  }, [claimNumber]);

  const handleReceipt = (e: any) => {
    const formData = new FormData();

    formData.append("pdfFile", e.target.files[0]);
    formData.append("pdfName", e.target.files[0].name);
    formData.append("claimId", claimId);

    receiptApiUrl(formData)
      .then(() => {
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
      .catch((error) => console.log(" Losserrr", error));
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="row mt-4">
      <div className="col-8 pr-0">
        <div className={receiptMapperStyle.claimedItemListContainer}>
          <div className="col8">
            <GenericButton
              btnClassname={receiptMapperStyle.clearAll}
              label="Clear All Filter"
              theme="linkBtn"
            />
          </div>
          <div className="col-4">
            <ClaimedItemsSearchBox setTableLoader={setTableLoader} />
          </div>
        </div>
        <ClaimedItemsTable setTableLoader={setTableLoader} tableLoader={tableLoader} />
      </div>

      <div className="col-4 p-0">
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
                // style={{ display: "none" }}
                accept=".pdf"
                onChange={handleReceipt}
              ></input>
            </div>
            <div className="col-5">
              <ReciptMapperSearchBox setTableLoader={setTableLoader} />
            </div>
          </div>
          <RecieptMapperMainComponent />
        </div>
      </div>
    </div>
  );
};

export default ClaimedItemsComponent;
