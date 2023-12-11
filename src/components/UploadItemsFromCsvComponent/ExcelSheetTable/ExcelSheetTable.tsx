"use client";
import React from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  // getSortedRowModel,
  // SortingState,
  useReactTable,
  // PaginationState,
} from "@tanstack/react-table";
// import { TABLE_LIMIT_20 } from "@/constants/constants";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store/store";
import CustomReactTable from "@/components/common/CustomReactTable";

interface ExcelTableData {
  slNo: number;
  brand: string;
  model: string;
  description: string;
  ageInYear: number;
  ageInMonth: number;
  condition: string;
  purchasedFrom: string;
  purchasedMethod: string;
  quantity: number;
  statedValue: number;
  roomName: string;
  roomType: string;
  totalCost: number;
  category: string;
  subCategory: string;
  action: string;
}
interface ExcelSheetTableProps {
  postLossItemDetails: ExcelTableData[];
}

const ExcelSheetTable: React.FC<ExcelSheetTableProps> = () => {
  // console.log('ddddd', postLossItemDetails);
  // const { postLossItemDetails } = useSelector(
  //   (state: RootState) => state.excelCsvUpload
  // ) || { postLossItemDetails: [] };

  // const data = useMemo(
  //   () =>
  //     postLossItemDetails.map((item) => ({
  //       slNo: item + 1,
  //       brand: item.brand,
  //       model: item.model,
  //       description: item.description,
  //       ageInYear: item.ageInYear,
  //       ageInMonth: item.ageInMonth,
  //       condition: item.condition,
  //       purchasedFrom: item.purchaseFrom,
  //       purchasedMethod: item.purchaseMethod,
  //       quantity: item.quantity,
  //       statedValue: item.replacementCost,
  //       roomName: item.room,
  //       roomType: item.roomType,
  //       totalCost: item.totalCost,
  //       category: item.category,
  //       subCategory: item.subCategory,
  //       action: item.addedByMobile,
  //     })),
  //   [postLossItemDetails]
  // );

  const data: ExcelTableData[] = [
    {
      slNo: 1,
      brand: "ss",
      model: "ss",
      description: "ss",
      ageInYear: 2,
      ageInMonth: 1,
      condition: "2",
      purchasedFrom: "s",
      purchasedMethod: "w",
      quantity: 2,
      statedValue: 2,
      roomName: "s",
      roomType: "2",
      totalCost: 2,
      category: "2",
      subCategory: "2",
      action: "2",
    },
  ];
  const columnHelper = createColumnHelper<ExcelTableData>();
  const columns = [
    columnHelper.accessor("slNo", {
      header: "Sl No #",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("brand", {
      header: "Brand",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("model", {
      header: "Model",
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelper.accessor("ageInYear", {
      header: "Age In Year",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("ageInMonth", {
      header: "Age In Month",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("condition", {
      header: "Condition",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("purchasedFrom", {
      header: "Purchased From",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("purchasedMethod", {
      header: "Purchased Method",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("quantity", {
      header: "Quantity",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("statedValue", {
      header: "Stated Value",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("quantity", {
      header: "Quantity",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("roomName", {
      header: "Room Name",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("totalCost", {
      header: "Total Cost",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("subCategory", {
      header: "Sub Category",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("action", {
      header: "Action",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel<ExcelTableData>(),
  });

  return (
    <>
      <CustomReactTable table={table} />
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default ExcelSheetTable;
