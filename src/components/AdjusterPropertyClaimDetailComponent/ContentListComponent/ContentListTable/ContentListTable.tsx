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
  const {
    claimContentListData,
    setTableLoader,
    totalClaims,
    tableLoader,
    claimErrorMsg,
  }: any = props;

  const [claimResult, setClaimResult] = React.useState(claimContentListData);

  const pageLimit = 20;

  type ContentListData = {
    status: object | null;
    category: object | null;
    description: string | null;
    quantity: number | null;
    totalStatedAmount: number | null;
    itemTag: string | null;
    vendorName: string | null;
    adjusterDescription: string | null;
    rcvTotal: number | null;
    cashPayoutExposure: number | null;
  };

  React.useEffect(() => {
    const defaultData: ContentListData[] = [...claimContentListData];
    setClaimResult([...defaultData]);
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

  // const [sorting, setSorting] = React.useState<SortingState>([]);

  // const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
  //   pageIndex: currentPageNumber - 1,
  //   pageSize: pageLimit,
  // });
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  // const pagination = React.useMemo(
  //   () => ({
  //     pageIndex,
  //     pageSize,
  //   }),
  //   [pageIndex, pageSize]
  // );

  // const handleSorting = async (sortingUpdater: any) => {
  //   setTableLoader(true);

  //   const newSortVal = sortingUpdater(sorting);
  //   setSorting(newSortVal);

  //   if (newSortVal.length > 0) {
  //     const orderBy = newSortVal[0].desc ? "desc" : "asc";
  //     const sortBy = newSortVal[0].id;
  //     const result = await fetchClaimList(1, pageLimit, sortBy, orderBy);
  //     if (result) {
  //       setTableLoader(false);
  //     }
  //   } else if (newSortVal.length === 0 && claimContentListData.length > 0) {
  //     const result = await fetchClaimList();
  //     if (result) {
  //       setTableLoader(false);
  //     }
  //   }
  // };
  // const handlePagination = async (updaterFunction: any) => {
  //   setTableLoader(true);

  //   const newPaginationValue = updaterFunction(pagination);
  //   setPagination(newPaginationValue);
  //   const pageNumber = newPaginationValue.pageIndex + 1;

  //   if (sorting.length > 0) {
  //     const orderBy = sorting[0].desc ? "desc" : "asc";
  //     const sortBy = sorting[0].id;
  //     const result = await fetchClaimList(pageNumber, pageLimit, sortBy, orderBy);
  //     if (result) {
  //       setTableLoader(false);
  //     }
  //   } else if (sorting.length === 0 && claimContentListData.length > 0) {
  //     const result = await fetchClaimList(pageNumber);
  //     if (result) {
  //       setTableLoader(false);
  //     }
  //   }
  // };

  const table = useReactTable({
    data: claimResult,
    columns,
    pageCount: Math.ceil(totalClaims / pageLimit),
    state: {
      // sorting,
      // pagination,
      columnFilters,
    },
    // onPaginationChange: handlePagination,
    // onSortingChange: handleSorting,
    getCoreRowModel: getCoreRowModel(),
    // getSortedRowModel: getSortedRowModel(),
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
      />
    </div>
  );
};

const mapStateToProps = ({ claimContentdata }: any) => ({
  claimContentListData: claimContentdata.claimContentListData,
 
});

export default connect(mapStateToProps, null)(ContentListTable);
