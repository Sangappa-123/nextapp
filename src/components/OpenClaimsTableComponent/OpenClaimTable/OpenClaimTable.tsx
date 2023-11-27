"use client";
import React from "react";
import OpenClaimTableStyle from "./OpenClaimTable.module.scss";
import { connect } from "react-redux";
import { fetchClaimList } from "@/services/ClaimService";
import { convertToCurrentTimezone } from "@/utils/helper";
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
    claimDate: Date;
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
      cell: (status) => {
        return (
          <div style={{ width: "80px" }}>
            <span
              className={`badge badge-secondary 
                    ${status.getValue() === "Created" && "badge-info"}
                    ${status.getValue() === "3rd Party Vendor" && "badge-primaryCustom"}
                    ${status.getValue() === "Work In Progress" && "badge-warning"}
                    ${status.getValue() === "Supervisor Approval" && "badge-success"}
                    `}
            >
              {status.getValue() as React.ReactNode}
            </span>
          </div>
        );
      },
      header: () => <span>Status</span>,
      enableSorting: true,
      size: 100,
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
      cell: (info) => {
        const unixDate = Date.parse(info.renderValue().replace("T", " "));
        const formatedDate = convertToCurrentTimezone(unixDate, "MM/DD/YYYY h:mm A");
        return formatedDate;
      },
      enableSorting: true,
    }),
    columnHelper.accessor("lastActive", {
      header: "Last Active",
      enableSorting: false,
      size: 450,
    }),
    columnHelper.accessor("lastUpdated", {
      id: "Last_Update_Date",
      header: "Last Updated",
      cell: (info) => {
        const unixDate = Date.parse(info.renderValue().replace("T", " "));
        const formatedDate = convertToCurrentTimezone(unixDate, "MM/DD/YYYY h:mm A");
        return formatedDate;
      },
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
