"use client";
import React, { useEffect } from "react";
import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import CustomReactTable from "@/components/common/CustomReactTable/index";
import CoverageSummaryListStyle from "../CoverageSummaryList.module.scss";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "@/store/store";
import { fetchCoverageSummaryAction } from "../../../../../reducers/ContentsEvaluation/DetailedInventorySlice";

type CoverageSummaryProps = {
  listData: any;
  fetchCoverageSummaryAction: any;
};

interface coverageSummaryData {
  [key: string | number]: any;
}

function CoverageSummaryTable(props: CoverageSummaryProps): React.FC<connectorType> {
  const columnHelper = createColumnHelper<coverageSummaryData>();
  const { listData, fetchCoverageSummaryAction } = props;

  const claimNumber = sessionStorage.getItem("claimNumber") || "";

  useEffect(() => {
    fetchCoverageSummaryAction({
      claimNumber: claimNumber,
    });
  }, [claimNumber, fetchCoverageSummaryAction]);

  const columns = [
    columnHelper.accessor("categoryName", {
      cell: (info) => info.getValue(),
      header: () => "Category",
    }),
    columnHelper.accessor("categoryAggregateLimit", {
      cell: (info) => <span>{`$${Number.parseFloat(info.getValue()).toFixed(2)}`}</span>,
      header: () => "Aggregate Limit",
    }),
    columnHelper.accessor("categoryIndividualItemLimit", {
      cell: (info) => <span>{`$${Number.parseFloat(info.getValue()).toFixed(2)}`}</span>,
      header: () => "Item Limit",
    }),
    columnHelper.accessor("totalItems", {
      cell: (info) => info.getValue(),
      header: () => "# Items Claimed",
    }),
    columnHelper.accessor("noOfItemsAboveLimit", {
      cell: (info) => info.getValue(),
      header: () => "# Items Over Limit",
    }),
    columnHelper.accessor("actualsRCV", {
      cell: (info) => <span>{`$${Number.parseFloat(info.getValue()).toFixed(2)}`}</span>,
      header: () => "Total Replacement Cost",
    }),
    columnHelper.accessor("actualsACV", {
      cell: (info) => <span>{`$${Number.parseFloat(info.getValue()).toFixed(2)}`}</span>,
      header: () => "Total ACV",
    }),
    columnHelper.accessor("totalOverage", {
      cell: (info) => <span>{`$${Number.parseFloat(info.getValue()).toFixed(2)}`}</span>,
      header: () => "Total Overage",
    }),
    columnHelper.accessor("totalCashExposure", {
      cell: (info) => <span>{`$${Number.parseFloat(info.getValue()).toFixed(2)}`}</span>,
      header: () => "Total Cash Exposure",
    }),
    columnHelper.accessor("totalAmountPaid", {
      cell: (info) => <span>{`$${Number.parseFloat(info.getValue()).toFixed(2)}`}</span>,
      header: () => "Total Holdover Paid",
    }),
    columnHelper.accessor("totalSettlementValue", {
      cell: (info) => <span>{`$${Number.parseFloat(info.getValue()).toFixed(2)}`}</span>,
      header: () => "Total Settlement Value",
    }),
  ];

  const table = useReactTable({
    data: listData?.claimCategoryDetails,
    columns,
    pageCount: 20,
    state: {},
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    manualSorting: true,
    manualPagination: true,
    enableSorting: true,
    enableColumnFilters: false,
  });

  // const [tableLoader, setTableLoader] = React.useState<boolean>(false);

  return (
    <div>
      <div className={CoverageSummaryListStyle.detailListContainer}>
        <div
          className={`row col-12 ${CoverageSummaryListStyle.detailListContentContainer}`}
        ></div>
      </div>
      {listData?.claimCategoryDetails && (
        <div>
          <CustomReactTable table={table} />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  listData: state.detailedInventorydata?.coverageSummaryListDataFull,
});

const mapDispatchToProps = {
  fetchCoverageSummaryAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
// @typescript-eslint/no-unused-vars
type connectorType = ConnectedProps<typeof connector>;

export default connector(CoverageSummaryTable);
