"use client";
import React, { useEffect, useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "@/store/store";
import CustomReactTable from "@/components/common/CustomReactTable/index";
import AssignmentContentListStyle from "./AssignmentContentListStyle.module.scss";
import { fetchAssignmentContentListAction } from "@/reducers/VendorAssignment/AssignmentContentListSlice";
import CustomLoader from "@/components/common/CustomLoader";
import { contentsEvaluationTranslateType } from "@/translations/contentsEvaluationTranslate/en";
import useTranslation from "@/hooks/useTranslation";
import DescriptionSearch from "./DescriptionSearch";

type AssignmentContentListProps = {
  listData: Array<object>;
  fetchAssignmentContentListAction: any;
  detailedInventorySummaryData: any;
  isfetching: boolean;
  searchKeyword: string;
};

interface detailedInventoryData {
  [key: string | number]: any;
}

function convertToDollar(value: any) {
  if (value) return `$${Number.parseFloat(value).toFixed(2)}`;
  else {
    return "$0.00";
  }
}

interface listData {
  [key: string | number]: any;
}

const AssignmentContentList: React.FC<connectorType> = (
  props: AssignmentContentListProps
) => {
  const columnHelper = createColumnHelper<detailedInventoryData>();
  const claimNumber = sessionStorage.getItem("claimNumber") || "";
  const {
    listData,
    fetchAssignmentContentListAction,
    detailedInventorySummaryData,
    isfetching,
    searchKeyword,
  } = props;
  const [newData, setData] = useState<Array<typeof listData>>();
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const pageLimit = 20;
  const fetchSize = 20;
  const {
    loading,
    translate,
  }: { loading: boolean; translate: contentsEvaluationTranslateType | undefined } =
    useTranslation("contentsEvaluationTranslate");
  useEffect(() => {
    fetchAssignmentContentListAction({
      pageNo: 1,
      recordPerPage: 10,
      claimNum: claimNumber,
      sortBy: "",
      orderBy: "",
      q: "",
    });
  }, [claimNumber, fetchAssignmentContentListAction]);

  const handleSorting = async (sortingUpdater: any) => {
    setTableLoader(true);

    const newSortVal = sortingUpdater(sorting);
    setSorting(newSortVal);

    if (newSortVal.length > 0) {
      const orderBy = newSortVal[0].desc ? "desc" : "asc";
      const sortBy = newSortVal[0].id;
      console.log("orderBy, sortBy", orderBy, sortBy);
      const result = await fetchAssignmentContentListAction({
        pageNo: 1,
        recordPerPage: 10,
        claimNum: claimNumber,
        sortBy: sortBy,
        orderBy: orderBy,
        q: "",
      });
      if (result) {
        setTableLoader(false);
      }
    } else if (newSortVal.length === 0 && listData.length > 0) {
      const result = await fetchAssignmentContentListAction();
      if (result) {
        setTableLoader(false);
      }
    }
  };

  useEffect(() => {
    fetchAssignmentContentListAction({
      pageNo: 1,
      recordPerPage: 10,
      claimNum: claimNumber,
      sortBy: "",
      orderBy: "",
      q: searchKeyword,
    });
  }, [searchKeyword, fetchAssignmentContentListAction]);

  React.useEffect(() => {
    if (listData) {
      const defaultData: listData[] = [...listData];
      const recvData: any = [...defaultData.slice(0, fetchSize)];
      setData(recvData);
    }
  }, [listData]);

  const fetchNextPage = () => {
    if (newData) {
      const nextPageData = listData.slice(newData?.length, newData?.length + fetchSize);
      const recvData: any = [...newData, ...nextPageData];
      setData(recvData);
    }
    return true;
  };

  const columns = [
    columnHelper.accessor("itemNumber", {
      header: () => "Item #",
      cell: (info: any) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("room.roomName", {
      header: () => "Description",
      cell: (info: any) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("originalItemDescription", {
      header: () => "Status",
      cell: (info: any) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("ageInYears", {
      header: () => "Category",
      cell: (props) => (
        <span>{`${
          props.row.original?.ageInYears ? `${props.row.original?.ageInYears}yr` : `0yr`
        } ${
          props.row.original?.ageInMonths ? `${props.row.original?.ageInMonths}m` : `0m`
        }`}</span>
      ),
      enableSorting: true,
    }),
    columnHelper.accessor("quantity", {
      header: () => "Age",
      cell: (info: any) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("totalPrice", {
      header: () => "Qty",
      cell: (info: any) => <span>{`${convertToDollar(info.getValue())}`}</span>,
      footer: () => (
        <span>{`${convertToDollar(detailedInventorySummaryData.totalPrice)}`}</span>
      ),
      enableSorting: true,
    }),
    columnHelper.accessor("categoryDetails.name", {
      header: () => "Total Value",
      cell: (info: any) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("status.status", {
      header: () => "Assigned To",
      cell: (info: any) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("itemLimit", {
      header: () => "Replacement Description",
      cell: (info: any) => <span>{`${convertToDollar(info.getValue())}`}</span>,
      enableSorting: true,
    }),
    columnHelper.accessor("replacementItemDescription", {
      header: () => "Replacement Cost",
      cell: (info: any) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("webSource", {
      header: () => "Depreciation",
      cell: (info: any) => <a href={info.getValue()}>{info.getValue()}</a>,
      enableSorting: true,
    }),
    columnHelper.accessor("replacementTotalCost", {
      header: () => "ACV",
      cell: (info: any) => <span>{`${convertToDollar(info.getValue())}`}</span>,
      footer: () => (
        <span>{`${convertToDollar(
          detailedInventorySummaryData.totalReplacementCost
        )}`}</span>
      ),
      enableSorting: true,
    }),
    columnHelper.accessor("replacementExposure", {
      header: () => "MER",
      cell: (info: any) => <span>{`${convertToDollar(info.getValue())}`}</span>,
      footer: () => (
        <span>{`${convertToDollar(
          detailedInventorySummaryData.totalReplacementExposure
        )}`}</span>
      ),
      enableSorting: true,
    }),
  ];

  const table = useReactTable({
    data: newData || [],
    columns,
    pageCount: Math.ceil(listData?.length / pageLimit),
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    onSortingChange: handleSorting,
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    manualPagination: true,
    enableSorting: true,
    enableColumnFilters: false,
  });

  const [tableLoader, setTableLoader] = React.useState<boolean>(false);
  if (loading) {
    return (
      <div className="col-12 d-flex flex-column position-relative">
        <CustomLoader loaderType="spinner2" />
      </div>
    );
  }
  return (
    <div>
      <div className={AssignmentContentListStyle.detailListContainer}>
        <div
          className={`row col-12 ${AssignmentContentListStyle.detailListContentContainer}`}
        >
          <div className="col-md-9 col-sm-12 col-xs-12 col-lg-9 d-flex ps-0 mx-3">
            <div className="col-lg-4 col-md-6 col-sm-12 col-12 align-items-center">
              <DescriptionSearch setTableLoader={setTableLoader} />
            </div>
          </div>
        </div>
      </div>
      <div className={AssignmentContentListStyle.AssignmentContentListScrollContainer}>
        {isfetching ? (
          <CustomLoader />
        ) : (
          <CustomReactTable
            table={table}
            totalDataCount={listData?.length}
            loader={tableLoader}
            tableDataErrorMsg={!listData && translate?.detailedInventory?.noRecords}
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
  searchKeyword: state.detailedInventorydata.searchKeyword,
});

const mapDispatchToProps = {
  fetchAssignmentContentListAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(AssignmentContentList);
