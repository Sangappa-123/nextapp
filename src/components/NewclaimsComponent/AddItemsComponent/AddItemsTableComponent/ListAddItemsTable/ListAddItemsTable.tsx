"use client";
import React from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import CustomReactTable from "@/components/common/CustomReactTable";
import TableLisStyle from "./listAddItems.module.scss";
import { ConnectedProps, connect } from "react-redux";
import {
  setAddItemsTableData,
  setSelectedItems,
} from "@/reducers/UploadCSV/AddItemsTableCSVSlice";
import { RootState } from "@/store/store";

interface ListAddItemsTableProps {
  addItemsTableData: any[];
  onCheckboxChange: (item: any) => void;
}

const ListAddItemsTable: React.FC<ListAddItemsTableProps & connectorType> = ({
  addItemsTableData,
  onCheckboxChange,
}) => {
  const handleCheckboxChange = (item: any) => {
    console.log("Selected Item", item);
    onCheckboxChange(item);
  };

  const pageLimit = 100;
  type AddItemsData = {
    itemNumber: number;
    description: string;
    status: { status: string };
    totalStatedAmount: number;
    quantity: string;
    category: string;
    ageMonths: number;
    action: { edit: boolean; delete: boolean };
    select: boolean;
  };

  const columnHelper = createColumnHelper<AddItemsData>();
  const checkboxAccessor = (data: AddItemsData) => data.select;

  const columns = [
    columnHelper.accessor(checkboxAccessor, {
      header: () => (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <input
            type="checkbox"
            onChange={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
      ),
      meta: {},
      id: "check",
      enableColumnFilter: false,
      cell: ({ row }) => (
        <div
          className="d-flex justify-content-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <input
            type="checkbox"
            onChange={() => {
              handleCheckboxChange(row.original);
            }}
          />
        </div>
      ),
    }),
    columnHelper.accessor("itemNumber", {
      header: () => "Item #",
      id: "itemNumber",
      enableColumnFilter: false,
    }),
    columnHelper.accessor("description", {
      header: () => "Description",
      id: "Description",
      enableColumnFilter: false,
    }),
    columnHelper.accessor((data) => data.status.status, {
      header: () => "Status",
      id: "status",
    }),

    columnHelper.accessor("totalStatedAmount", {
      header: () => "Total Value",
      id: "totalStatedAmount",
    }),
    columnHelper.accessor("quantity", {
      header: () => "Qty",
      id: "quantity",
      enableColumnFilter: false,
    }),
    columnHelper.accessor("category", {
      header: () => "Catogory",
      id: "category",
    }),
    columnHelper.accessor("ageMonths", {
      header: () => "Age",
      id: "ageMonths",
    }),
    columnHelper.accessor("action", {
      header: () => `Action`,
      cell: () => (
        <div className={TableLisStyle.actionButtons}>
          <button className={TableLisStyle.editButton}>Edit</button>
          <button className={TableLisStyle.deleteButton}>Delete</button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    columns,
    data: addItemsTableData,
    enableColumnFilters: false,
    pageCount: Math.ceil(addItemsTableData.length / pageLimit),
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <div className={TableLisStyle.addListTableContainer}>
      <CustomReactTable table={table} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  addItemsTableData: state.addItemsTable.addItemsTableData,
  selectedItems: state.addItemsTable.selectedItems,
  isAnyItemSelected: state.addItemsTable.isAnyItemSelected,
});

const mapDispatchToProps = {
  setAddItemsTableData,
  setSelectedItems,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(ListAddItemsTable);
