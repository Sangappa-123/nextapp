"use client";
import React, { useEffect, useState } from "react";
import receiptMapperStyle from "../receiptMapperComponent.module.scss";

import { getClaimedItems } from "@/services/ReceiptMapper/ReceiptMapperService";
import ClaimedItemsTable from "./LeftSection/ClaimedItemsTable/ClaimedItemsTable";
import ClaimedItemsSearchBox from "./LeftSection/ClaimedItemsSearchBox/ClaimedItemsSearchBox";
import GenericButton from "@/components/common/GenericButton/index";
import RecieptMapperMainComponent from "./RightSection/RecieptMapperMainComponent/RecieptMapperMainComponent";

type propTypes = {
  claimNumber: string;
};
const ClaimedItemsComponent: React.FC<propTypes> = ({ claimNumber }: propTypes) => {
  const [tableLoader, setTableLoader] = useState<boolean>(false);
  const [clearFilter, setClearFilter] = useState<boolean>(false);

  useEffect(() => {
    const getItems = async () => {
      setTableLoader(true);
      await getClaimedItems({
        claimNumber: claimNumber,
        reqForReceiptMapper: true,
      });
      setTableLoader(false);
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
              onClickHandler={async () => {
                setTableLoader(true);
                await getClaimedItems({
                  claimNumber: claimNumber,
                  reqForReceiptMapper: true,
                });
                setClearFilter(true);
                setTableLoader(false);
              }}
            />
          </div>
          <div className="col-4">
            <ClaimedItemsSearchBox setTableLoader={setTableLoader} />
          </div>
        </div>
        <ClaimedItemsTable
          setTableLoader={setTableLoader}
          tableLoader={tableLoader}
          clearFilter={clearFilter}
        />
      </div>

      <div className="col-4 p-0">
        <RecieptMapperMainComponent />
      </div>
    </div>
  );
};

export default ClaimedItemsComponent;
