"use client";
import React from "react";
import ContentListTableStyle from "./ContentListTable.module.scss";
import { connect } from "react-redux";
// import { fetchClaimList } from "@/services/ClaimService";
import {
  createColumnHelper,
  getCoreRowModel,
  // getSortedRowModel,
  // SortingState,
  useReactTable,
  // PaginationState,
  getFilteredRowModel,
  ColumnFiltersState,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from "@tanstack/react-table";

import CustomReactTable from "@/components/common/CustomReactTable/index";

const ContentListTable: React.FC = (props) => {
  const { claimContentListData, totalClaims, tableLoader, claimErrorMsg }: any = props;

  const [claimResult, setClaimResult] = React.useState(claimContentListData);

  const pageLimit = 20;
  const fetchSize = 20;

  // type ContentListData = {
  //   status: object | null;
  //   category: object | null;
  //   description: string | null;
  //   quantity: number | null;
  //   totalStatedAmount: number | null;
  //   itemTag: string | null;
  //   vendorName: string | null;
  //   adjusterDescription: string | null;
  //   rcvTotal: number | null;
  //   cashPayoutExposure: number | null;
  // };

  interface ContentListData {
    [key: string | number]: any;
  }
  React.useEffect(() => {
    const defaultData: ContentListData[] = [...claimContentListData];
    setClaimResult([...defaultData.slice(0, fetchSize)]);
  }, [claimContentListData]);

  const columnHelper = createColumnHelper<ContentListData>();

  const columns = [
    columnHelper.group({
      header: () => (
        <span>
          <a href="">Clear All Filter</a>
        </span>
      ),
      id: "clear",
      columns: [
        columnHelper.accessor("[]", {
          header: () => "[]",
          id: "check",
          enableColumnFilter: false,
        }),
        columnHelper.accessor((row, i) => i + 1, {
          header: () => "Item #",
          id: "item",
          enableColumnFilter: false,
        }),
        columnHelper.accessor((row) => (row.status ? row.status.status : null), {
          header: () => "Status",
          id: "status",
          // cell: (info) =>{
          //   if (info.renderValue()) {
          //     return info.renderValue().status;
          //   }
          //   return null;
          // }
        }),
        columnHelper.accessor((row) => (row.category ? row.category.name : null), {
          header: () => "Catogory",
          id: "catogory",
          // cell: (info) =>{
          //   if (info.renderValue()) {
          //     return info.renderValue().name;
          //   }
          //   return null;
          // }
        }),
      ],
    }),
    columnHelper.group({
      header: () => "Original Item",
      id: "original_item",
      meta: {
        headerClass: ContentListTableStyle.originalItemHeader,
      },
      columns: [
        columnHelper.accessor("description", {
          header: () => "Description",
          id: "Description",
          enableColumnFilter: false,
        }),
        columnHelper.accessor("quantity", {
          header: () => "Qty",
          id: "qty",
          enableColumnFilter: false,
        }),
        columnHelper.accessor("totalStatedAmount", {
          header: () => "Total Price",
          id: "total-price",
        }),
        columnHelper.accessor("itemTag", {
          header: () => "Item Tag",
          id: "item-tag",
        }),
      ],
    }),
    columnHelper.group({
      header: "Vendor",
      id: "vendorId",
      meta: {
        headerClass: ContentListTableStyle.originalItemHeader,
      },
      columns: [
        columnHelper.accessor("vendorName", {
          header: () => "Vendor",
          id: "vendor",
          enableColumnFilter: false,
        }),
      ],
    }),
    columnHelper.group({
      header: "Replacment Item",
      id: "replacmentItem",
      meta: {
        headerClass: ContentListTableStyle.replacementItemHeader,
      },
      columns: [
        columnHelper.accessor("adjusterDescription", {
          header: () => "Replacment Description",
          id: "Replacement_Description",
          enableColumnFilter: false,
        }),
        columnHelper.accessor("rcvTotal", {
          header: () => "Replacment Cost",
          id: "replacment",
          enableColumnFilter: false,
        }),
        columnHelper.accessor("cashPayoutExposure", {
          header: () => "Cash Exposure",
          id: "cash-exposure",
          enableColumnFilter: false,
        }),
      ],
    }),
    columnHelper.group({
      header: "",
      id: "actionItem",
      columns: [
        columnHelper.accessor("Action", {
          header: () => "Action",
          id: "Action",
          cell: () => <a href="">Action</a>,
          enableColumnFilter: false,
        }),
      ],
    }),
  ];

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const fetchNextPage = () => {
    const nextPageData = claimContentListData.slice(
      claimResult.length,
      claimResult.length + fetchSize
    );
    setClaimResult([...claimResult, ...nextPageData]);

    return true;
  };

  const table = useReactTable({
    data: claimResult,
    columns,
    pageCount: Math.ceil(totalClaims / pageLimit),
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
  });

  return (
    <div className={ContentListTableStyle.claimTableContainer}>
      <CustomReactTable
        table={table}
        totalDataCount={totalClaims}
        pageLimit={totalClaims > 20 ? pageLimit : null}
        loader={tableLoader}
        tableDataErrorMsg={claimErrorMsg}
        fetchNextPage={fetchNextPage}
        totalFetched={claimResult.length}
        totalDBRowCount={claimContentListData.length}
      />
    </div>
  );
};

const mapStateToProps = ({ claimContentdata }: any) => ({
  claimContentListData: claimContentdata.claimContentListData,
});

export default connect(mapStateToProps, null)(ContentListTable);
