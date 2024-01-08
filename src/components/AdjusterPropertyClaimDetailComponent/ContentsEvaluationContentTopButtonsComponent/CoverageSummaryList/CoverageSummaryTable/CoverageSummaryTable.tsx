"use client";
import React, { useEffect, useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import CustomReactTable from "@/components/common/CustomReactTable/index";
import CoverageSummaryListStyle from "../CoverageSummaryList.module.scss";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "@/store/store";
import { fetchCoverageSummaryAction } from "@/reducers/ContentsEvaluation/DetailedInventorySlice";

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
  const [newData, setData] = useState();
  const pageLimit = 20;
  const fetchSize = 20;
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

  useEffect(() => {
    if (listData) {
      const defaultData: listData[] = [...listData];
      const recvData = [...defaultData.slice(0, fetchSize)];
      setData(recvData);
    }
  }, [listData]);

  const table = useReactTable({
    data: newData || [],
    columns,
    pageCount: Math.ceil(listData?.length / pageLimit),
    state: {},
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    manualSorting: true,
    manualPagination: true,
    enableSorting: true,
    enableColumnFilters: false,
  });

  const fetchNextPage = () => {
    if (newData) {
      const nextPageData = listData.slice(newData?.length, newData?.length + fetchSize);
      const recvData = [...newData, ...nextPageData];
      setData(recvData);
    }
    return true;
  };

  return (
    <div>
      <div className={CoverageSummaryListStyle.detailListContainer}>
        <div
          className={`row col-12 ${CoverageSummaryListStyle.detailListContentContainer}`}
        ></div>
      </div>
      <div>
        <CustomReactTable
          table={table}
          totalDataCount={listData?.length}
          tableDataErrorMsg={!listData && "No Record Found"}
          fetchNextPage={fetchNextPage}
          totalFetched={newData?.length}
          totalDBRowCount={listData?.length}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  listData:
    state.detailedInventorydata?.coverageSummaryListDataFull?.claimCategoryDetails,
});

const mapDispatchToProps = {
  fetchCoverageSummaryAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;

export default connector(CoverageSummaryTable);
