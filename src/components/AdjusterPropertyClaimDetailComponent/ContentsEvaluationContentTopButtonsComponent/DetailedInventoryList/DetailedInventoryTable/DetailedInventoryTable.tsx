"use client";
import React, { useEffect, useState } from "react";
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
import { fetchDetailedInventoryAction } from "@/reducers/ContentsEvaluation/DetailedInventorySlice";
import { Tooltip } from "react-tooltip";
import {
  exportDetailedInventory,
  exportDetailedInventoryToPDF,
  sendDetailedInventory,
} from "../DetailedInventoryFucn";
import CustomLoader from "@/components/common/CustomLoader";
import { addNotification } from "@/reducers/Notification/NotificationSlice";
import { useAppDispatch } from "@/hooks/reduxCustomHook";

type DetailedInventoryProps = {
  listData: Array<object>;
  fetchDetailedInventoryAction: any;
  detailedInventorySummaryData: any;
  isfetching: boolean;
};

interface detailedInventoryData {
  [key: string | number]: any;
}

function convertToDollar(value) {
  if (value) return `$${Number.parseFloat(value).toFixed(2)}`;
  else {
    return "$0.00";
  }
}

interface listData {
  [key: string | number]: any;
}

const DetailedInventoryTable: React.FC<connectorType> = (
  props: DetailedInventoryProps
) => {
  const columnHelper = createColumnHelper<detailedInventoryData>();
  const claimNumber = sessionStorage.getItem("claimNumber") || "";
  const {
    listData,
    fetchDetailedInventoryAction,
    detailedInventorySummaryData,
    isfetching,
  } = props;
  const [newData, setData] = useState();
  const pageLimit = 20;
  const fetchSize = 20;
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchDetailedInventoryAction({
      pageNo: 1,
      recordPerPage: 10,
      claimNum: claimNumber,
    });
  }, [claimNumber, fetchDetailedInventoryAction]);

  React.useEffect(() => {
    if (listData) {
      const defaultData: listData[] = [...listData];
      const recvData = [...defaultData.slice(0, fetchSize)];
      setData(recvData);
    }
  }, [listData]);

  const fetchNextPage = () => {
    if (newData) {
      const nextPageData = listData.slice(newData?.length, newData?.length + fetchSize);
      const recvData = [...newData, ...nextPageData];
      setData(recvData);
    }
    return true;
  };

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
      cell: (info) => <span>{`${convertToDollar(info.getValue())}`}</span>,
      footer: () => (
        <span>{`${convertToDollar(detailedInventorySummaryData.totalPrice)}`}</span>
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
      cell: (info) => <span>{`${convertToDollar(info.getValue())}`}</span>,
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
      cell: (info) => <span>{`${convertToDollar(info.getValue())}`}</span>,
      footer: () => (
        <span>{`${convertToDollar(
          detailedInventorySummaryData.totalReplacementCost
        )}`}</span>
      ),
    }),
    columnHelper.accessor("replacementExposure", {
      header: () => "Replacement Exposure",
      cell: (info) => <span>{`${convertToDollar(info.getValue())}`}</span>,
      footer: () => (
        <span>{`${convertToDollar(
          detailedInventorySummaryData.totalReplacementExposure
        )}`}</span>
      ),
    }),
    columnHelper.accessor("depreciationPercent", {
      header: () => "Annual Dep%",
      cell: (info) =>
        info.getValue() && <span>{`{convertToDollar(info.getValue())}%`}</span>,
    }),
    columnHelper.accessor("depreciationAmount", {
      header: () => "Depreciation $",
      cell: (info) =>
        info.getValue() && <span>{`${convertToDollar(info.getValue())}`}</span>,
      footer: () => (
        <span>{`${convertToDollar(
          detailedInventorySummaryData.totalDepreciationAmount
        )}`}</span>
      ),
    }),
    columnHelper.accessor("cashPayoutExposure", {
      header: () => "Cash Exposure",
      cell: (info) => <span>{`${convertToDollar(info.getValue())}`}</span>,
      footer: () => (
        <span>{`${convertToDollar(
          detailedInventorySummaryData.totalCashPayoutExposure
        )}`}</span>
      ),
    }),
    columnHelper.accessor("maxHoldover", {
      header: () => "Max. Recoverable Depreciation",
      cell: (info) => <span> {`${convertToDollar(info.getValue())}`} </span>,
      footer: () => (
        <span>{`${convertToDollar(
          detailedInventorySummaryData.totalMaxRecoverableDepreciation
        )}`}</span>
      ),
    }),
    columnHelper.accessor("itemOverage", {
      header: () => "Item Overage",
      cell: (info) => <span>{`${convertToDollar(info.getValue())}`}</span>,
      footer: () => (
        <span>{`${convertToDollar(detailedInventorySummaryData.totalItemOverage)}`}</span>
      ),
    }),
    columnHelper.accessor("settlementExposure", {
      header: () => "Settlement Exposure",
      cell: (info) => <span>{`${convertToDollar(info.getValue())}`}</span>,
      footer: () => (
        <span>{`${convertToDollar(
          detailedInventorySummaryData.totalSettlementExposure
        )}`}</span>
      ),
    }),
    columnHelper.accessor("settlementComment", {
      header: () => "Comment(s)",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("holdOverPaid", {
      header: () => "Holdover Paid",
      cell: (info) => <span>{`${convertToDollar(info.getValue())}`}</span>,
      footer: () => (
        <span>
          {`${convertToDollar(detailedInventorySummaryData.totalHoldOverPaid)}`}
        </span>
      ),
    }),
    columnHelper.accessor("settlementValue", {
      header: () => "Amount Paid",
      cell: (info) => <span>{`${convertToDollar(info.getValue())}`}</span>,
      footer: () => (
        <span>{`${convertToDollar(detailedInventorySummaryData.paidToInsured)}`}</span>
      ),
    }),
    columnHelper.accessor("holdOverDue", {
      header: () => "Holdover Due",
      cell: (info) => <span>{`${convertToDollar(info.getValue())}`}</span>,
      footer: () => (
        <span>{`${convertToDollar(detailedInventorySummaryData.totalHoldOverDue)}`}</span>
      ),
    }),
  ];

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

  const [tableLoader, setTableLoader] = React.useState<boolean>(false);
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
                    onClick={async () => {
                      const status = await exportDetailedInventory(claimNumber, "excel");
                      if (status === "success") {
                        dispatch(
                          addNotification({
                            message: "Successfully download the excel!",
                            id: "good",
                            status: "success",
                          })
                        );
                      } else if (status === "error") {
                        dispatch(
                          addNotification({
                            message: "Failed to export the details. Please try again..",
                            id: "good",
                            status: "error",
                          })
                        );
                      }
                    }}
                  >
                    Excel
                  </div>
                  <div
                    className={DetailListComponentStyle.dropDownInnerDiv}
                    onClick={async () => {
                      const status = await exportDetailedInventoryToPDF(claimNumber);
                      if (status === "success") {
                        dispatch(
                          addNotification({
                            message: "Successfully download the PDF!",
                            id: "good",
                            status: "success",
                          })
                        );
                      } else if (status === "error") {
                        dispatch(
                          addNotification({
                            message: "Failed to export the details. Please try again..",
                            id: "good",
                            status: "error",
                          })
                        );
                      }
                    }}
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
                onClick={async () => {
                  const data = await sendDetailedInventory(claimNumber);
                  if (data.status === 200) {
                    dispatch(
                      addNotification({
                        message: data.message,
                        id: "good",
                        status: "success",
                      })
                    );
                  } else {
                    dispatch(
                      addNotification({
                        message: "Failed to send the PDF!",
                        id: "good",
                        status: "error",
                      })
                    );
                  }
                }}
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
        {isfetching ? (
          <CustomLoader />
        ) : (
          <CustomReactTable
            table={table}
            totalDataCount={listData?.length}
            loader={tableLoader}
            tableDataErrorMsg={!listData && "No Record Found"}
            fetchNextPage={fetchNextPage}
            totalFetched={newData?.length}
            totalDBRowCount={listData?.length}
            showFooter={true}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  listData: state.detailedInventorydata?.detailedInventoryListDataFull,
  isfetching: state.detailedInventorydata?.detailedInventoryfetching,
  detailedInventorySummaryData: state.detailedInventorydata?.detailedInventorySummaryData,
});

const mapDispatchToProps = {
  fetchDetailedInventoryAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(DetailedInventoryTable);
