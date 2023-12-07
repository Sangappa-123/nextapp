"use client";
import React, { useState } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import CustomReactTable from "@/components/common/CustomReactTable";
import TableLisStyle from "./listAddItems.module.scss";

const ListAddItemsTable: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  type AddItemsData = {
    item: string;
    description: string;
    status: string;
    totalValue: number;
    qty: string;
    category: string;
    age: number;
    action: { edit: boolean; delete: boolean };
    select: boolean;
  };

  const columnHelper = createColumnHelper<AddItemsData>();

  const columns = [
    columnHelper.accessor("select", {
      id: "checkbox",
      header: () => <input type="checkbox" />,
      cell: () => (
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          //   className={TableLisStyle.checkboxInput}
        />
      ),
    }),
    columnHelper.accessor("item", {
      header: () => `Item #`,
    }),

    columnHelper.accessor("description", {
      header: () => `Description`,
    }),
    columnHelper.accessor("status", {
      header: () => `Status`,
    }),

    columnHelper.accessor("totalValue", {
      header: () => `Total Value`,
    }),
    columnHelper.accessor("qty", {
      header: () => `Qty`,
    }),

    columnHelper.accessor("category", {
      header: () => `Category`,
    }),
    columnHelper.accessor("age", {
      header: () => `Age`,
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

  const data: AddItemsData[] = [
    {
      item: "Item 1",
      description: "Description 1",
      status: "Status1",
      totalValue: 1,
      qty: "qty",
      category: "category1",
      age: 1,
      action: { edit: true, delete: true },
      select: false,
    },
  ];

  const table = useReactTable({
    columns,
    data,
    enableColumnFilters: false,
    getCoreRowModel: getCoreRowModel<AddItemsData>(),
  });

  return (
    <div className={TableLisStyle.addListTableContainer}>
      <CustomReactTable
        table={table}
        // totalClaims={props.totalClaims}
        // pageLimit={pageLimit}
        // showStatusColor={true}
        // loader={loader}
        // tableDataErrorMsg={props.claimErrorMsg}
      />
    </div>
  );
};

export default ListAddItemsTable;
