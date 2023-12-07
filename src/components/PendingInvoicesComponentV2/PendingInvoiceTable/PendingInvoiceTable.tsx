"use client";
import React, { useMemo, useState } from "react";
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
import pendingInvoiceStyle from "./pendingInvoiceTable.module.scss";
import { TABLE_LIMIT_20 } from "@/constants/constants";
import PendingInvoiceSearchBox from "../PendingInvoiceSearchBox";

const pathList = [
  {
    name: "Home",
    path: "/adjuster-dashboard",
  },
  {
    name: "Pending Vendor Invoices",
    path: "/login",
    active: true,
  },
];

type typedProp = {
  tableLoader: boolean;
  setTableLoader: any;
};

const PendingInvoiceTable: React.FC<typedProp & connectorType> = (props) => {
  const {
    claimListData,
    currentPageNumber,
    totalinvoice,
    claimErrorMsg,
    tableLoader,
    setTableLoader,
  } = props;
  const pageLimit = TABLE_LIMIT_20;

  type ClaimData = {
    claimNumber: string;
    invoiceNumber: string;
    vendorName: string;
    createdBy: string;
    amount: number;
    createDate: string;
    status: unknownObjectType;
  };

  const columnHelper = createColumnHelper<ClaimData>();
  const columns = [
    columnHelper.accessor("claimNumber", {
      header: "Claim #",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("invoiceNumber", {
      header: "Invoice Number",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("vendorName", {
      header: "Vendor",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("createdBy", {
      header: "Created By",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("amount", {
      header: "Invoice Amount",
      cell: (info) => <span>{`$${info.getValue().toFixed(2)}`}</span>,
      enableSorting: true,
    }),
    columnHelper.accessor("createDate", {
      header: "Invoice Date",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("status", {
      header: "Status Days",
      cell: (info) => info.getValue()?.name,
      enableSorting: true,
    }),
    // columnHelper.accessor("claimStatus", {
    //   id: "Claim_Status",
    //   header: `Status`,
    //   cell: (status) => {
    //     return (
    //       <div style={{ width: "80px" }}>
    //         <span
    //           className={`badge badge-secondary
    //                   ${status.getValue() === "Created" && "badge-info"}
    //                   ${status.getValue() === "3rd Party Vendor" && "badge-primaryCustom"}
    //                   ${status.getValue() === "Work In Progress" && "badge-warning"}
    //                   ${status.getValue() === "Supervisor Approval" && "badge-success"}
    //                   `}
    //         >
    //           {status.getValue() as React.ReactNode}
    //         </span>
    //       </div>
    //     );
    //   },
    //   enableSorting: true,
    // }),
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
    pageCount: Math.ceil(totalinvoice / pageLimit),
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
      <hr className={pendingInvoiceStyle.divider} />
      <div
        className={clsx(
          "col-lg-12 col-md-12 col-12 m-2",
          pendingInvoiceStyle.tableHeading
        )}
      >
        <label>{`Pending Vendor Invoices (${totalinvoice})`}</label>
      </div>
      <div className={pendingInvoiceStyle.claimContainer}>
        <div className={`row ${pendingInvoiceStyle.claimContentContainer}`}>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12 ms-auto">
            <PendingInvoiceSearchBox setTableLoader={setTableLoader} />
          </div>
        </div>
      </div>
      <div className={pendingInvoiceStyle.claimTableContainer}>
        <CustomReactTable
          table={table}
          totalDataCount={totalinvoice}
          pageLimit={pageLimit}
          loader={tableLoader}
          tableDataErrorMsg={claimErrorMsg}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({
  pendingInvoice: {
    pendingInvoiceListData,
    currentPageNumber,
    totalinvoice,
    claimErrorMsg,
  },
}: RootState) => ({
  claimListData: pendingInvoiceListData,
  currentPageNumber,
  totalinvoice,
  claimErrorMsg,
});

const connector = connect(mapStateToProps, null);
type connectorType = ConnectedProps<typeof connector>;
export default connector(PendingInvoiceTable);
