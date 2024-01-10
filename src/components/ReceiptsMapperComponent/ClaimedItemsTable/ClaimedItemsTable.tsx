"use client";
import React ,{useEffect, useState} from "react";
import { useParams } from "next/navigation";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "@/store/store";
import {
    getCoreRowModel,
    useReactTable,
    createColumnHelper,
  } from "@tanstack/react-table";
import clsx from "clsx";
import CustomReactTable from "@/components/common/CustomReactTable/index";
import { getClaimedItems } from "@/services/ReceiptMapper/ReceiptMapperService";


interface claimedItemData {
    [key: string | number]: any;
  }
const ClaimedItemsTable: React.FC<connectorType> = ({
    claimedItemsList
}) => {
 
  const {  claimId } = useParams();
 
  const claimNumber = sessionStorage.getItem("claimNumber") ?? "";
  const [tableLoader, setTableLoader] = useState<boolean>(false);
  const [claimedItemArray, setClaimedItems] = useState();



  useEffect(() => {
    getClaimedItems({
     
        claimNumber: claimNumber,
        reqForReceiptMapper : true

    });
  }, [claimNumber, getClaimedItems]);

  useEffect(() => {
    if (claimedItemsList) {
      const defaultData: claimedItemData[] = [...claimedItemsList];
      setClaimedItems(defaultData);
    }
  }, [claimedItemsList]);


  const columnHelper = createColumnHelper<claimedItemData>();

  const columns = [
    columnHelper.accessor("itemNumber", {
      header: () => "Item #",
      cell: (info) => info.getValue(),
    }),
];

const table = useReactTable({
    data: claimedItemArray || [],
    columns,
    // pageCount: Math.ceil(listData?.length / pageLimit),
    state: {},
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    manualSorting: true,
    manualPagination: true,
    enableSorting: true,
    enableColumnFilters: false,
  });

  return (
    <div className="row">
         <CustomReactTable
            table={table}
            
          />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
    claimedItemsList : state.ClaimedItems.claimedItemsList
});

const mapDispatchToProps = {
 
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(ClaimedItemsTable);
