"use client";
import React, { useEffect } from "react";
import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "@/store/store";
import CustomReactTable from "@/components/common/CustomReactTable/index";
import GenericButton from "@/components/common/GenericButton/index";
import DetailListComponentStyle from "../DetailedInventoryList.module.scss";
import DetailedInventorySearchBox from "../DetailedInventorySearchBox/DetailedInventorySearchBox";
import { fetchDetailedInventoryAction } from "../../../../../reducers/ContentsEvaluation/DetailedInventorySlice";
import { Tooltip } from "react-tooltip";
import {
  exportDetailedInventory,
  exportDetailedInventoryToPDF,
} from "../DetailedInventoryFucn";

type DetailedInventoryProps = {
  listData: Array<object>;
  fetchDetailedInventoryAction: any;
  detailedInventorySummaryData: any;
};

interface detailedInventoryData {
  [key: string | number]: any;
}

const DetailedInventoryTable: React.FC<connectorType> = (
  props: DetailedInventoryProps
) => {
  const columnHelper = createColumnHelper<detailedInventoryData>();
  const claimNumber = sessionStorage.getItem("claimNumber") || "";
  const { listData, fetchDetailedInventoryAction, detailedInventorySummaryData } = props;
  useEffect(() => {
    fetchDetailedInventoryAction({
      pageNo: 1,
      recordPerPage: 10,
      claimNum: claimNumber,
    });
  }, [claimNumber, fetchDetailedInventoryAction]);

  useEffect(() => {}, [detailedInventorySummaryData, listData]);

  const columns = [
    columnHelper.accessor("itemNumber", {
      header: () => "Item #",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("room.roomName", {
      header: () => "Room",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("originalItemDescription", {
      header: () => "Original Description",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("ageInYears", {
      header: () => "Age",
      cell: (props) => (
        <span>{`${
          props.row.original?.ageInYears ? `${props.row.original?.ageInYears}yr` : `0yr`
        } ${
          props.row.original?.ageInMonths ? `${props.row.original?.ageInMonths}m` : `0m`
        }`}</span>
      ),
    }),
    columnHelper.accessor("quantity", {
      header: () => "Quantity",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("totalPrice", {
      header: () => "Total Price",
      cell: (info) => <span>{`$${Number.parseFloat(info.getValue()).toFixed(2)}`}</span>,
      footer: () => (
        <span>
          {" "}
          {detailedInventorySummaryData.totalPrice
            ? `$${Number.parseFloat(detailedInventorySummaryData.totalPrice).toFixed(2)}`
            : `$0.00`}
        </span>
      ),
    }),
    columnHelper.accessor("categoryDetails.name", {
      header: () => "Category",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status.status", {
      header: () => "Status",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("itemLimit", {
      header: () => "Individual Limit",
      cell: (info) => <span>{`$${Number.parseFloat(info.getValue()).toFixed(2)}`}</span>,
    }),
    columnHelper.accessor("replacementItemDescription", {
      header: () => "Replacement Description",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("webSource", {
      header: () => "Source",
      cell: (info) => <a href={info.getValue()}>{info.getValue()}</a>,
    }),
    columnHelper.accessor("replacementTotalCost", {
      header: () => "Replacement Cost",
      cell: (info) => <span>{`$${Number.parseFloat(info.getValue()).toFixed(2)}`}</span>,
      footer: () => (
        <span>
          {" "}
          {detailedInventorySummaryData.totalReplacementCost
            ? `$${Number.parseFloat(
                detailedInventorySummaryData.totalReplacementCost
              ).toFixed(2)}`
            : `$0.00`}
        </span>
      ),
    }),
    columnHelper.accessor("replacementExposure", {
      header: () => "Replacement Exposure",
      cell: (info) => <span>{`$${Number.parseFloat(info.getValue()).toFixed(2)}`}</span>,
      footer: () => (
        <span>
          {" "}
          {detailedInventorySummaryData.totalReplacementExposure
            ? `$${Number.parseFloat(
                detailedInventorySummaryData.totalReplacementExposure
              ).toFixed(2)}`
            : `$0.00`}
        </span>
      ),
    }),
    columnHelper.accessor("depreciationPercent", {
      header: () => "Annual Dep%",
      cell: (info) =>
        info.getValue() && (
          <span>{`${Number.parseFloat(info.getValue()).toFixed(2)}%`}</span>
        ),
    }),
    columnHelper.accessor("depreciationAmount", {
      header: () => "Depreciation $",
      cell: (info) =>
        info.getValue() && (
          <span>{`$${Number.parseFloat(info.getValue()).toFixed(2)}`}</span>
        ),
      footer: () => (
        <span>
          {" "}
          {detailedInventorySummaryData.totalDepreciationAmount
            ? `$${Number.parseFloat(
                detailedInventorySummaryData.totalDepreciationAmount
              ).toFixed(2)}`
            : `$0.00`}
        </span>
      ),
    }),
    columnHelper.accessor("cashPayoutExposure", {
      header: () => "Cash Exposure",
      cell: (info) => <span>{`$${Number.parseFloat(info.getValue()).toFixed(2)}`}</span>,
      footer: () => (
        <span>
          {" "}
          {detailedInventorySummaryData.totalCashPayoutExposure
            ? `$${Number.parseFloat(
                detailedInventorySummaryData.totalCashPayoutExposure
              ).toFixed(2)}`
            : `$0.00`}
        </span>
      ),
    }),
    columnHelper.accessor("maxHoldover", {
      header: () => "Max. Recoverable Depreciation",
      cell: (info) => (
        <span>
          {" "}
          {info.getValue()
            ? `$${Number.parseFloat(info.getValue()).toFixed(2)}`
            : `$0.00`}
        </span>
      ),
      footer: () => (
        <span>
          {" "}
          {detailedInventorySummaryData.totalMaxRecoverableDepreciation
            ? `$${Number.parseFloat(
                detailedInventorySummaryData.totalMaxRecoverableDepreciation
              ).toFixed(2)}`
            : `$0.00`}
        </span>
      ),
    }),
    columnHelper.accessor("itemOverage", {
      header: () => "Item Overage",
      cell: (info) => <span>{`$${Number.parseFloat(info.getValue()).toFixed(2)}`}</span>,
      footer: () => (
        <span>
          {" "}
          {detailedInventorySummaryData.totalItemOverage
            ? `$${Number.parseFloat(
                detailedInventorySummaryData.totalItemOverage
              ).toFixed(2)}`
            : `$0.00`}
        </span>
      ),
    }),
    columnHelper.accessor("settlementExposure", {
      header: () => "Settlement Exposure",
      cell: (info) => <span>{`$${Number.parseFloat(info.getValue()).toFixed(2)}`}</span>,
      footer: () => (
        <span>
          {" "}
          {detailedInventorySummaryData.totalSettlementExposure
            ? `$${Number.parseFloat(
                detailedInventorySummaryData.totalSettlementExposure
              ).toFixed(2)}`
            : `$0.00`}
        </span>
      ),
    }),
    columnHelper.accessor("settlementComment", {
      header: () => "Comment(s)",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("holdOverPaid", {
      header: () => "Holdover Paid",
      cell: (info) => <span>{`$${Number.parseFloat(info.getValue()).toFixed(2)}`}</span>,
      footer: () => (
        <span>
          {" "}
          {detailedInventorySummaryData.totalHoldOverPaid
            ? `$${Number.parseFloat(
                detailedInventorySummaryData.totalHoldOverPaid
              ).toFixed(2)}`
            : `$0.00`}
        </span>
      ),
    }),
    columnHelper.accessor("settlementValue", {
      header: () => "Amount Paid",
      cell: (info) => <span>{`$${Number.parseFloat(info.getValue()).toFixed(2)}`}</span>,
      footer: () => (
        <span>{`$${Number.parseFloat(detailedInventorySummaryData.paidToInsured).toFixed(
          2
        )}`}</span>
      ),
    }),
    columnHelper.accessor("holdOverDue", {
      header: () => "Holdover Due",
      cell: (info) => <span>{`$${Number.parseFloat(info.getValue()).toFixed(2)}`}</span>,
      footer: () => (
        <span>
          {" "}
          {detailedInventorySummaryData.totalHoldOverDue
            ? `$${Number.parseFloat(
                detailedInventorySummaryData.totalHoldOverDue
              ).toFixed(2)}`
            : `$0.00`}
        </span>
      ),
    }),
  ];
  const table = useReactTable({
    data: listData,
    columns,
    pageCount: 20,
    state: {
      // columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    manualSorting: true,
    manualPagination: true,
    enableSorting: true,
    enableColumnFilters: false,
  });

  console.log("coverage", listData);

  const [tableLoader, setTableLoader] = React.useState<boolean>(false);

  console.log(props);
  return (
    <div>
      <div className={DetailListComponentStyle.detailListContainer}>
        <div
          className={`row col-12 ${DetailListComponentStyle.detailListContentContainer}`}
        >
          <div className="col-md-9 col-sm-12 col-xs-12 col-lg-9 d-flex ps-0 mx-3">
            <div
              className={`row col-11 ${DetailListComponentStyle.contentListButtonDiv}`}
            >
              <Tooltip
                anchorSelect="#export-as"
                place="bottom"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "0px",
                  zIndex: "999",
                  boxShadow: "2px 2px 2px 2px #888888",
                }}
                openOnClick={true}
                clickable={true}
              >
                <div className="p-0">
                  <div
                    className={DetailListComponentStyle.dropDownInnerDiv}
                    onClick={() => exportDetailedInventory(claimNumber, "excel")}
                  >
                    Excel
                  </div>

                  <div
                    className={DetailListComponentStyle.dropDownInnerDiv}
                    onClick={() => exportDetailedInventoryToPDF(claimNumber)}
                  >
                    PDF
                  </div>
                </div>
              </Tooltip>
              <GenericButton
                label="Export as"
                theme="normal"
                size="small"
                type="submit"
                btnClassname={DetailListComponentStyle.contentListBtn}
                id="export-as"
              />
              <GenericButton
                label="Email Policyholder"
                theme="normal"
                size="small"
                type="submit"
                btnClassname={DetailListComponentStyle.contentListBtn}
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-12 align-items-center">
              <DetailedInventorySearchBox setTableLoader={setTableLoader} />
            </div>
          </div>
        </div>
      </div>

      <div className={DetailListComponentStyle.DetailedInventoryTableScrollContainer}>
        {listData.length > 0 && (
          <CustomReactTable table={table} loader={tableLoader} showFooter={true} />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  listData: state.detailedInventorydata?.detailedInventoryListDataFull,
  detailedInventorySummaryData: state.detailedInventorydata?.detailedInventorySummaryData,
});

const mapDispatchToProps = {
  fetchDetailedInventoryAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(DetailedInventoryTable);
