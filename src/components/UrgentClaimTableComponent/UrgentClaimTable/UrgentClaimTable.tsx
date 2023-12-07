"use client";
import React, { useMemo, useState } from "react";
import OpenClaimTableStyle from "./UrgentClaimTable.module.scss";
import { ConnectedProps, connect } from "react-redux";
import GenericBreadcrumb from "@/components/common/GenericBreadcrumb/index";
import clsx from "clsx";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";
import CustomReactTable from "@/components/common/CustomReactTable";
import { RootState } from "@/store/store";
import { unknownObjectType } from "@/constants/customTypes";
import { TABLE_LIMIT_20 } from "@/constants/constants";

const pathList = [
  {
    name: "Home",
    path: "/adjuster-dashboard",
  },
  {
    name: "Claims Exceeding Time limits",
    path: "/login",
    active: true,
  },
];

type typedProp = {
  tableLoader: boolean;
  setTableLoader: any;
};

const UrgentClaimTable: React.FC<typedProp & connectorType> = (props) => {
  const {
    claimListData,
    currentPageNumber,
    totalClaims,
    claimErrorMsg,
    tableLoader,
    setTableLoader,
  } = props;
  const pageLimit = TABLE_LIMIT_20;

  type ClaimData = {
    claimNumber: string;
    adjusterName: string;
    claimStatus: string;
    contractedTimes: string;
    noOfItems: number;
    policyHolderName: string;
    createDate: string;
    elapsedTime: number;
    lastNote: unknownObjectType;
  };

  const columnHelper = createColumnHelper<ClaimData>();
  const columns = [
    columnHelper.accessor("claimNumber", {
      id: "claimNumber",
      header: "Claim #",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("claimStatus", {
      id: "Claim_Status",
      header: `Status`,
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
      enableSorting: true,
    }),
    columnHelper.accessor("contractedTimes", {
      id: "contractedTimes",
      header: "Contracted End Time",
      cell: "Contracted Times",
    }),
    columnHelper.accessor("noOfItems", {
      id: "noOfItems",
      header: "# of Items",
      cell: (noOfItems) => noOfItems.getValue(),
    }),
    columnHelper.accessor("policyHolderName", {
      id: "policyHolderName",
      header: "Policyholder's Name",
      cell: (policyHolderName) => policyHolderName.getValue(),
    }),
    columnHelper.accessor("createDate", {
      id: "createDate",
      header: () => "Claim Date",
      cell: (createDate) => createDate.getValue(),
    }),
    columnHelper.accessor("elapsedTime", {
      id: "elapsedTime",
      header: "Elapsed Time Days",
      cell: (elapsedTime) => elapsedTime.getValue(),
    }),
    columnHelper.accessor("lastNote", {
      id: "lastNote",
      header: "Last Note",
      cell: (elapsedTime) => elapsedTime.getValue()?.message,
    }),
  ];

  const [sorting, setSorting] = useState<SortingState>([]);

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: currentPageNumber - 1,
    pageSize: pageLimit,
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const handleSorting = async () => {
    console.log("hhhhhhhh", setSorting, setPagination);
  };
  const handlePagination = async () => {
    setTableLoader(true);
  };

  const table = useReactTable({
    data: claimListData,
    columns,
    pageCount: Math.ceil(totalClaims / pageLimit),
    state: {
      sorting,
      pagination,
    },
    onPaginationChange: handlePagination,
    onSortingChange: handleSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    manualSorting: true,
    manualPagination: true,
  });

  return (
    <div className="row">
      <div>
        <GenericBreadcrumb dataList={pathList} />
      </div>
      <hr className={OpenClaimTableStyle.divider} />
      <div
        className={clsx(
          "col-lg-12 col-md-12 col-12 m-2",
          OpenClaimTableStyle.tableHeading
        )}
      >
        <label>{`Claims Exceeding Time Limits (${totalClaims})`}</label>
      </div>
      <div className={OpenClaimTableStyle.claimTableContainer}>
        <CustomReactTable
          table={table}
          totalDataCount={totalClaims}
          pageLimit={pageLimit}
          loader={tableLoader}
          tableDataErrorMsg={claimErrorMsg}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({
  urgentclaimdata: { urgentClaimListData, currentPageNumber, totalClaims, claimErrorMsg },
}: RootState) => ({
  claimListData: urgentClaimListData,
  currentPageNumber,
  totalClaims,
  claimErrorMsg,
});

const connector = connect(mapStateToProps, null);
type connectorType = ConnectedProps<typeof connector>;
export default connector(UrgentClaimTable);
