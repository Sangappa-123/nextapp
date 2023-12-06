"use client";
import React, { useState } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import CustomReactTable from "@/components/common/CustomReactTable";
import TableListStyle from "./itemsAssignListTable.module.scss";

const ItemsAssignListTable: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  type AddItemsData = {
    item: string;
    description: string;
    status: string;
    qty: string;
    category: string;
    age: number;
    select: boolean;
    quantity: number;
    statedValue: string;
    individualLimit: string;
    scheduledItem: string;
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
    columnHelper.accessor("quantity", {
      header: () => `Quantity`,
    }),

    columnHelper.accessor("statedValue", {
      header: () => `Stated Value`,
    }),
    columnHelper.accessor("age", {
      header: () => `Age`,
      cell: (info) => info.renderValue(),
      enableSorting: false,
    }),

    columnHelper.accessor("category", {
      header: () => `Category`,
    }),
    columnHelper.accessor("individualLimit", {
      header: () => `Individual Limit`,
    }),
    columnHelper.accessor("scheduledItem", {
      header: () => `Scheduled Item`,
    }),
    columnHelper.accessor("status", {
      header: () => `Status`,
    }),
  ];

  const data: AddItemsData[] = [
    {
      item: "Item 1",
      description: "Description 1",
      status: "Status1",
      qty: "qty",
      category: "category1",
      age: 1,
      select: false,
      quantity: 10,
      statedValue: "$50",
      individualLimit: "Yes",
      scheduledItem: "No",
    },
    {
      item: "Item 1",
      description: "Description 1",
      status: "Status1",
      qty: "qty",
      category: "category1",
      age: 1,
      select: false,
      quantity: 10,
      statedValue: "$50",
      individualLimit: "Yes",
      scheduledItem: "No",
    },
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel<AddItemsData>(),
    enableSorting: true,
    enableColumnFilters: false,
  });

  return (
    <>
      <div className={TableListStyle.addListTableContainer}>
        <CustomReactTable
          table={table}
          // totalClaims={props.totalClaims}
          // pageLimit={pageLimit}
          // showStatusColor={true}
          // loader={loader}
          // tableDataErrorMsg={props.claimErrorMsg}
        />
      </div>
      <div className="row">
        <label className={TableListStyle.labelStyles}>Item(s) Summary</label>
      </div>
      <div className="row">
        <div className="col-md-4 col-sm-6 col-12">
          <label className={TableListStyle.labelStyles}>Total Item(s) Selected:</label>
        </div>
        <div className="col-md-4 col-sm-6 col-12">
          <label className={TableListStyle.labelStyles}>Selected Items Categories:</label>
        </div>
      </div>
      <div className="row">
        <label className={TableListStyle.labelStyles}>Total Stated Value:</label>
      </div>
    </>
  );
};

export default ItemsAssignListTable;
