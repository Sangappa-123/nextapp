"use client";
import React, { useEffect } from "react";
import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import CustomReactTable from "@/components/common/CustomReactTable/index";
import PolicyHolderTableListStyle from "./policyholderpayouts.module.scss";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "@/store/store";
import { fetchPolicySummaryTableAction } from "@/reducers/ContentsEvaluation/DetailedInventorySlice";
import GenericComponentHeading from "@/components/common/GenericComponentHeading/index";

type PolicyHolderTableProps = {
  listData: any;
  fetchPolicySummaryTableAction: any;
};

interface policyHolderData {
  [key: string | number]: any;
}

function PolicyHolderTable(props: PolicyHolderTableProps): React.FC<connectorType> {
  const columnHelper = createColumnHelper<policyHolderData>();
  const { listData, fetchPolicySummaryTableAction } = props;

  const claimNumber = sessionStorage.getItem("claimNumber") || "";

  useEffect(() => {
    fetchPolicySummaryTableAction({
      claimNumber: claimNumber,
    });
  }, [claimNumber, fetchPolicySummaryTableAction]);

  const columns = [
    columnHelper.accessor("Payment Id	", {
      cell: (info) => info.getValue(),
      header: () => "Payment Id	",
      footer: () => <span>Total Paid </span>,
    }),
    columnHelper.accessor("Payment Amount	", {
      cell: (info) => <span>{`$${Number.parseFloat(info.getValue()).toFixed(2)}`}</span>,
      header: () => "Payment Amount	",
      footer: () => <span>$0.00</span>,
    }),
    columnHelper.accessor("Payment Date	", {
      cell: (info) => <span>{`$${Number.parseFloat(info.getValue()).toFixed(2)}`}</span>,
      header: () => "Payment Date	",
    }),
    columnHelper.accessor("Payment Mode	", {
      cell: (info) => info.getValue(),
      header: () => "Payment Mode	",
    }),
    columnHelper.accessor("Reference / Check #	", {
      cell: (info) => info.getValue(),
      header: () => "Reference / Check #	",
    }),
    columnHelper.accessor("Note", {
      cell: (info) => <span>{`$${Number.parseFloat(info.getValue()).toFixed(2)}`}</span>,
      header: () => "Note",
    }),
  ];
  const table = useReactTable({
    data: listData?.paymentSummaryDetails,
    columns,
    pageCount: 20,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    manualSorting: true,
    manualPagination: true,
    enableSorting: true,
    enableColumnFilters: false,
  });

  return (
    <div>
      <GenericComponentHeading
        title="Payment Summary"
        customHeadingClassname={PolicyHolderTableListStyle.policyHolderListHeader}
      />
      <div className={PolicyHolderTableListStyle.detailListContainer}>
        <div
          className={`row col-12 ${PolicyHolderTableListStyle.detailListContentContainer}`}
        ></div>
      </div>
      {listData?.paymentSummaryDetails && (
        <div>
          <CustomReactTable showFooter={true} table={table} />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  listData: state.detailedInventorydata?.policySummaryListDataFull,
});

const mapDispatchToProps = {
  fetchPolicySummaryTableAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;

export default connector(PolicyHolderTable);
