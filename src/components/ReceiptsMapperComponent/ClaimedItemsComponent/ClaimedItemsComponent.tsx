"use client";
import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
import receiptMapperStyle from "../receiptMapperComponent.module.scss";

import { getClaimedItems } from "@/services/ReceiptMapper/ReceiptMapperService";
import ClaimedItemsTable from "../ClaimedItemsTable/ClaimedItemsTable";
import ClaimedItemsSearchBox from "../ClaimedItemsSearchBox/ClaimedItemsSearchBox";
import GenericButton from "@/components/common/GenericButton/index";

const ClaimedItemsComponent: React.FC = ({ claimNumber }: { claimNumber: string }) => {
  // const {  claimId } = useParams();

  const [tableLoader, setTableLoader] = useState<boolean>(false);

  useEffect(() => {
    const getItems = async () => {
      await getClaimedItems({
        claimNumber: claimNumber,
        reqForReceiptMapper: true,
      });
    };
    getItems();
  }, [claimNumber]);

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
              <GenericButton label="New Recipt" size="small" />
            </div>
            <div className="col-5">
              <ClaimedItemsSearchBox setTableLoader={setTableLoader} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimedItemsComponent;
