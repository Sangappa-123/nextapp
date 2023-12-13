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
// import { useDispatch } from "react-redux";
// import { TABLE_LIMIT_20 } from "@/constants/constants";
import { ConnectedProps, connect } from "react-redux";
// import { useSelector } from "react-redux";
import ExcelSheetTableStyle from "./ExcelSheetTable.module.scss";
import { RootState } from "@/store/store";
import { setExcelCsvUploadData } from "@/services/excelCsvUploadSlice";
import CustomReactTable from "@/components/common/CustomReactTable";

interface ExcelSheetTableProps {
  postLossItemDetails: any[];
}

const ExcelSheetTable: React.FC<ExcelSheetTableProps & connectorType> = (props) => {
  // const dispatch = useDispatch();
  const { postLossItemDetails } = props;
  console.log("postLossItemDetails", postLossItemDetails);

  type ExcelTableData = {
    id: number;
    brand: string | null;
    model: string | null;
    description: string;
    ageInYear: number | null;
    ageInMonth: number | null;
    condition: string | null;
    purchasedFrom: string | null;
    purchasedMethod: string | null;
    quantity: string | null;
    statedValue: number;
    roomType: string | null;
    roomName: string | null;
    totalCost: number;
    category: string | null;
    subCategory: string | null;
    action: () => void;
  };

  // useEffect(() => {
  //   console.log('Updated:', postLossItemDetails);
  // }, [postLossItemDetails]);

  const columnHelper = createColumnHelper<ExcelTableData>();
  const columns = [
    columnHelper.accessor("id", {
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
    columnHelper.accessor("roomType", {
      header: "Room Type",
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
      cell: () => <button className={ExcelSheetTableStyle.removeButton}>Remove</button>,
      enableSorting: false,
    }),
  ];

  const data = React.useMemo(() => postLossItemDetails, [postLossItemDetails]);
  console.log("dddd", data);

  const table = useReactTable({
    data: postLossItemDetails,
    columns,
    enableColumnFilters: false,
    getCoreRowModel: getCoreRowModel<ExcelTableData>(),
  });

  return (
    <>
      <CustomReactTable table={table} />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  postLossItemDetails: state.excelCsvUpload.postLossItemDetails,
});

const mapDispatchToProps = {
  setExcelCsvUploadData,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(ExcelSheetTable);
