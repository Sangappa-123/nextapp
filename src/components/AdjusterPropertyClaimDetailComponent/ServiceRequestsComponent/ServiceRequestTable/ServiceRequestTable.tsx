"use client";
import React from "react";
import ServiceRequestTableStyle from "./ServiceRequestTable.module.scss";
import { ConnectedProps, connect } from "react-redux";
import { fetchServiceRequestList } from "@/services/ClaimServiceRequestListService";
import { convertToCurrentTimezone } from "@/utils/helper";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";
import CustomReactTable from "@/components/common/CustomReactTable/index";
import { TABLE_LIMIT_5 } from "@/constants/constants";

interface typeProps {
  setTableLoader: React.SetStateAction<any>;
  tableLoader: boolean;
}
const ServiceRequestTable: React.FC<connectorType & typeProps> = (props) => {
  const {
    currentPageNumber = 1,
    setTableLoader,
    totalClaims,
    tableLoader,
    claimErrorMsg,
    claimServiceRequestList,
  }: React.SetStateAction<any> = props;

  // const claimServiceRequestListData = React.useMemo(() => {
  //   return claimServiceRequestList;
  // }, []);
  // const [claimResult, setClaimResult] = React.useState(claimServiceRequestList);

  const pageLimit = TABLE_LIMIT_5;

  interface ServiceRequestData {
    [key: string | number]: any;
  }

  // React.useEffect(() => {
  //   const defaultData: ServiceRequestData[] = [...claimServiceRequestList];
  //   setClaimResult([...defaultData]);
  // }, [claimServiceRequestList]);

  const columnHelper = createColumnHelper<ServiceRequestData>();

  const columns = [
    columnHelper.accessor("serviceNumber", {
      id: "serviceNumber",
      header: () => `Service Number`,
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),

    columnHelper.accessor("description", {
      id: "description",
      header: () => `Request Description`,
      cell: (info) => info.renderValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("vendorDetails", {
      header: () => `Vendor`,
      cell: (info) => info.renderValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("assignedDate", {
      id: "assignedDate",
      header: () => `Assign Date`,
      cell: (info) => {
        if (info.renderValue()) {
          const unixDate = Date.parse(info.renderValue().replace("T", " "));
          const formatedDate = convertToCurrentTimezone(unixDate, "MM/DD/YYYY h:mm A");
          return formatedDate;
        }
        return info.renderValue();
      },
      enableSorting: true,
    }),
    columnHelper.accessor("targetDate", {
      id: "targetDate",
      header: "Target Completion Date",
      cell: (info) => {
        if (info.renderValue()) {
          const unixDate = Date.parse(info.renderValue().replace("T", " "));
          const formatedDate = convertToCurrentTimezone(unixDate, "MM/DD/YYYY h:mm A");
          return formatedDate;
        }
        return info.renderValue();
      },
      enableSorting: true,
    }),
    columnHelper.accessor((row) => row.status.statusName, {
      id: "Status",
      header: () => <span>Status</span>,
      enableSorting: true,
      size: 100,
    }),
    columnHelper.accessor("", {
      id: "Action",
      header: "Action",

      enableSorting: false,
    }),
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: currentPageNumber - 1,
    pageSize: pageLimit,
  });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const handleSorting = async (sortingUpdater: any) => {
    setTableLoader(true);

    const newSortVal = sortingUpdater(sorting);
    setSorting(newSortVal);

    if (newSortVal.length > 0) {
      const orderBy = newSortVal[0].desc ? "desc" : "asc";
      const sortBy = newSortVal[0].id;
      const result = await fetchServiceRequestList(
        pagination.pageIndex,
        pageLimit,
        sortBy,
        orderBy
      );
      if (result) {
        setTableLoader(false);
      }
    } else if (newSortVal.length === 0 && claimServiceRequestList.length > 0) {
      const result = await fetchServiceRequestList(pagination.pageIndex, pageLimit);
      if (result) {
        setTableLoader(false);
      }
    }
  };
  const handlePagination = async (updaterFunction: any) => {
    setTableLoader(true);

    const newPaginationValue = updaterFunction(pagination);
    setPagination(newPaginationValue);
    const pageNumber = newPaginationValue.pageIndex;

    if (sorting.length > 0) {
      const orderBy = sorting[0].desc ? "desc" : "asc";
      const sortBy = sorting[0].id;
      const result = await fetchServiceRequestList(
        pageNumber,
        pageLimit,
        sortBy,
        orderBy
      );
      if (result) {
        setTableLoader(false);
      }
    } else if (sorting.length === 0 && claimServiceRequestList.length > 0) {
      const result = await fetchServiceRequestList(pageNumber, pageLimit);
      if (result) {
        setTableLoader(false);
      }
    }
  };

  const table = useReactTable({
    data: claimServiceRequestList,
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
    enableColumnFilters: false,
  });

  return (
    <div className={ServiceRequestTableStyle.claimTableContainer}>
      <CustomReactTable
        table={table}
        totalDataCount={totalClaims}
        pageLimit={totalClaims > 5 ? pageLimit : null}
        loader={tableLoader}
        tableDataErrorMsg={claimErrorMsg}
      />
    </div>
  );
};

const mapStateToProps = ({ claimServiceRequestdata }: any) => ({
  claimServiceRequestListTotalData:
    claimServiceRequestdata.claimServiceRequestListTotalData,
  claimServiceRequestList: claimServiceRequestdata.claimServiceRequestList,
  totalClaims: claimServiceRequestdata.totalClaims,
  claimErrorMsg: claimServiceRequestdata.claimErrorMsg,
});

const connector = connect(mapStateToProps, null);
type connectorType = ConnectedProps<typeof connector>;
export default connector(ServiceRequestTable);
