"use client";
import React from "react";
import OpenClaimTableStyle from "./OpenClaimTable.module.scss";
import { connect } from "react-redux";
import { fetchClaimList } from "@/services/ClaimService";

import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";
import ReactTable from "@/components/common/ReactTable/index";

const OpenClaimTable: React.FC = (props) => {
  const [claimResult, setClaimResult] = React.useState(props.claimListData);
  const pageLimit = 20;

  type ClaimData = {
    claimNumber: string;
    status: string;
    noOfItems: number;
    noOfItemsPriced: number;
    policyHoldersName: string;
    claimDate: string;
    lastActive: string;
    lastUpdated: string;
  };
  React.useEffect(() => {
    const defaultData: ClaimData[] = [...props.claimListData];
    setClaimResult([...defaultData]);
  }, [props.claimListData]);

  const columnHelper = createColumnHelper<ClaimData>();

  const columns = [
    columnHelper.accessor("claimNumber", {
      id: "Claim_Number",
      header: () => `Claim #`,
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor((row) => row.status, {
      id: "Status",
      cell: (status) => (
        <div style={{ width: "40px" }}>{status.getValue() as React.ReactNode}</div>
      ),
      header: () => <span>Status</span>,
      enableSorting: true,
    }),
    columnHelper.accessor("noOfItems", {
      id: "itemNumber",
      header: () => `# of Items`,
      cell: (info) => info.renderValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("noOfItemsPriced", {
      header: () => `# of Items Priced`,
      cell: (info) => info.renderValue(),
      enableSorting: false,
    }),
    columnHelper.accessor("policyHoldersName", {
      id: "Insured_Name",
      header: () => <span>{`PolicyHolder's Name`}</span>,
      enableSorting: true,
    }),
    columnHelper.accessor("claimDate", {
      id: "Create_Date",
      header: "Claim Date",
      enableSorting: true,
    }),
    columnHelper.accessor("lastActive", {
      header: "Last Active",
      enableSorting: false,
    }),
    columnHelper.accessor("lastUpdated", {
      id: "Last_Update_Date",
      header: "Last Updated",
      enableSorting: true,
    }),
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: props.currentPageNumber - 1,
    pageSize: pageLimit,
  });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  React.useEffect(() => {
    const pageNumber = pagination.pageIndex + 1;
    if (sorting.length > 0) {
      const orderBy = sorting[0].desc ? "desc" : "asc";
      const sortBy = sorting[0].id;
      fetchClaimList(pageNumber, pageLimit, sortBy, orderBy);
    } else {
      fetchClaimList(pageNumber);
    }
  }, [sorting, pagination]);

  const table = useReactTable({
    data: claimResult,
    columns,
    pageCount: Math.ceil(props.totalClaims / pageLimit),
    state: {
      sorting,
      pagination,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    manualSorting: true,
    manualPagination: true,
  });

  return (
    <div className={OpenClaimTableStyle.claimTableContainer}>
      <ReactTable
        table={table}
        totalClaims={props.totalClaims}
        pageLimit={pageLimit}
        showStatusColor={true}
      />
    </div>
  );
};

const mapStateToProps = ({ claimdata }) => ({
  claimListData: claimdata.claimListData,
  currentPageNumber: claimdata.currentPageNumber,
  totalClaims: claimdata.totalClaims,
});
export default connect(mapStateToProps, null)(OpenClaimTable);
