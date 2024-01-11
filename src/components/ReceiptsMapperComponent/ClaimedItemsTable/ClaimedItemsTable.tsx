"use client";
import React, { useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "@/store/store";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from "@tanstack/react-table";
import CustomReactTable from "@/components/common/CustomReactTable/index";
import receiptMapperStyle from "../receiptMapperComponent.module.scss";

function convertToDollar(value: any) {
  if (value) return `$${Number.parseFloat(value).toFixed(2)}`;
  else {
    return "$0.00";
  }
}
interface claimedItemData {
  [key: string | number]: any;
}
const ClaimedItemsTable: React.FC<connectorType> = ({
  claimedItemsList,
  claimedItemsErrorMsg,
  tableLoader,
  // setTableLoader
}) => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const [claimedItemArray, setClaimedItems] = useState<any>(claimedItemsList);

  useEffect(() => {
    if (claimedItemsList) {
      const defaultData: claimedItemData[] = [...claimedItemsList];
      setClaimedItems([...defaultData]);
    }
  }, [claimedItemsList]);

  const columnHelper = createColumnHelper<claimedItemData>();

  const columns = [
    columnHelper.accessor("itemNumber", {
      header: () => "Item #",
      cell: (info) => info.getValue(),
      enableColumnFilter: false,
      enableSorting: true,
    }),
    columnHelper.accessor("description", {
      header: () => "Description",
      cell: (info) => info.getValue(),
      enableColumnFilter: false,
      enableSorting: true,
    }),
    columnHelper.accessor("categoryFilter", {
      header: () => "Catogory",
      cell: (info) => info.getValue(),

      enableSorting: false,
    }),
    columnHelper.accessor("statusFilter", {
      header: () => "Status",
      cell: (info) => info.getValue(),
      footer: () => {
        return <span>Total</span>;
      },
      colSpan: 4,
      meta: {
        footerClass: receiptMapperStyle.footerStyles,
      },
      enableSorting: false,
    }),

    columnHelper.accessor("receiptValue", {
      header: () => "Receipt Value",
      cell: (info: any) => (
        <div className={receiptMapperStyle.alignRight}>{`${convertToDollar(
          info.getValue()
        )}`}</div>
      ),
      footer: () => {
        const sum = claimedItemArray.reduce(
          (acc: number, dataItem: any) => acc + dataItem.receiptValue,
          0
        );
        return <span>{`${convertToDollar(sum)}`}</span>;
      },
      meta: {
        footerClass: receiptMapperStyle.footerStyles,
      },
      enableSorting: true,
      enableColumnFilter: false,
    }),
    columnHelper.accessor("totalQuantityReplaced", {
      header: () => "Qty Replaced",
      cell: (info: any) => (
        <div className={receiptMapperStyle.alignRight}>{`${info.getValue()}(${
          info.row.original.quantity
        })`}</div>
      ),
      footer: () => {
        const Replacedsum = claimedItemArray.reduce(
          (acc: number, dataItem: any) => acc + dataItem.totalQuantityReplaced,
          0
        );
        const sum = claimedItemArray.reduce(
          (acc: number, dataItem: any) => acc + dataItem.quantity,
          0
        );
        return <span>{`${Replacedsum}(${sum})`}</span>;
      },
      meta: {
        footerClass: receiptMapperStyle.footerStyles,
      },
      enableSorting: true,
      enableColumnFilter: false,
    }),
    columnHelper.accessor("totalStatedAmount", {
      header: () => "Max. Replacement $",
      cell: (info: any) => (
        <div className={receiptMapperStyle.alignRight}>{`${convertToDollar(
          info.getValue()
        )}`}</div>
      ),
      footer: () => {
        const sum = claimedItemArray.reduce(
          (acc: number, dataItem: any) => acc + dataItem.totalStatedAmount,
          0
        );
        return <span>{`${convertToDollar(sum)}`}</span>;
      },
      meta: {
        footerClass: receiptMapperStyle.footerStyles,
      },
      enableSorting: true,
      enableColumnFilter: false,
    }),
    columnHelper.accessor("cashPaid", {
      header: () => "Cash Paid",
      cell: (info: any) => (
        <div className={receiptMapperStyle.alignRight}>{`${convertToDollar(
          info.getValue()
        )}`}</div>
      ),
      footer: () => {
        const sum = claimedItemArray.reduce(
          (acc: number, dataItem: any) => acc + dataItem.cashPaid,
          0
        );
        return <span>{`${convertToDollar(sum)}`}</span>;
      },
      meta: {
        footerClass: receiptMapperStyle.footerStyles,
      },
      enableSorting: true,
      enableColumnFilter: false,
    }),
    columnHelper.accessor("holdOverDue", {
      header: () => "Holdover Due",
      cell: (info: any) => (
        <div className={receiptMapperStyle.alignRight}>{`${convertToDollar(
          info.getValue()
        )}`}</div>
      ),
      footer: () => {
        const sum = claimedItemArray.reduce(
          (acc: number, dataItem: any) => acc + dataItem.holdOverDue,
          0
        );
        return <span>{`${convertToDollar(sum)}`}</span>;
      },
      meta: {
        footerClass: receiptMapperStyle.footerStyles,
      },
      enableSorting: true,
      enableColumnFilter: false,
    }),
    columnHelper.accessor("holdOverPaymentPaidAmount", {
      header: () => "Holdover Paid",
      cell: (info: any) => (
        <div className={receiptMapperStyle.alignRight}>{`${convertToDollar(
          info.getValue()
        )}`}</div>
      ),
      footer: () => {
        const sum = claimedItemArray.reduce(
          (acc: number, dataItem: any) => acc + dataItem.holdOverPaymentPaidAmount,
          0
        );
        return <span>{`${convertToDollar(sum)}`}</span>;
      },
      meta: {
        footerClass: receiptMapperStyle.footerStyles,
      },
      enableSorting: true,
      enableColumnFilter: false,
    }),
    columnHelper.accessor("Action", {
      header: () => "Action",
      cell: (info) => info.getValue(),
      footer: () => {
        return <span></span>;
      },
      meta: {
        footerClass: receiptMapperStyle.footerStyles,
      },
      enableSorting: false,
      enableColumnFilter: false,
    }),
  ];

  const table = useReactTable({
    data: claimedItemArray,
    columns,
    state: {
      columnFilters,
    },

    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    manualSorting: true,
    manualPagination: true,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    enableSorting: false,
    manualFiltering: true,
  });

  return (
    <div className={receiptMapperStyle.claimedTable}>
      <CustomReactTable
        table={table}
        tableDataErrorMsg={claimedItemsList.length === 0 ? claimedItemsErrorMsg : null}
        loader={tableLoader}
        totalFetched={claimedItemArray.length}
        totalDBRowCount={claimedItemsList.length}
        showFooter={true}
        fetchNextPage={true}
      />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  claimedItemsList: state.claimedItems.claimedItemsList,
  claimedItemsErrorMsg: state.claimedItems.claimedItemsErrorMsg,
});

const connector = connect(mapStateToProps, null);
type connectorType = ConnectedProps<typeof connector>;
export default connector(ClaimedItemsTable);
