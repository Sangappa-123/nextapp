"use client";
import React from "react";
import ServiceRequestTableStyle from "./ServiceRequestTable.module.scss";
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
import CustomReactTable from "@/components/common/CustomReactTable/index";

const ServiceRequestTable: React.FC = (props) => {
  const {
    currentPageNumber,
    setTableLoader,
    totalClaims,
    tableLoader,
    claimErrorMsg,
  }: any = props;

  const serviceData = React.useMemo(() => {
    return [
      {
        assignedDate: null,
        claimNumber: "EVLINS19THMAY2023",
        companyDetails: {
          address: {
            city: "Lindenhurst",
            completeAddress: "9020 South Lawrence Dr., Lindenhurst, WA, 98607",
            id: 2855,
            state: {
              id: 48,
              state: "WA",
              stateName: null,
              taxRate: null,
              timeZone: null,
              noOfZipcodesWrtState: null,
              premiumValueWrtState: null,
              hoPolicyTypes: null,
              noOfHOPolicyTypeState: null,
            },
            streetAddressOne: "9020 South Lawrence Dr.",
            streetAddressTwo: null,
            zipcode: "98607",
          },
          createdDate: null,
          crn: null,
          id: 1,
          modifiedDate: null,
          name: "Evolution Insurance Company",
          branchDetails: null,
          companyPhoneNumber: null,
          fax: null,
        },
        createDate: "11-17-2023T07:21:10Z",
        description: "test",
        isDelete: false,
        serviceRequestId: 47,
        serviceRequestInvoices: null,
        status: null,
        targetDate: "11-01-2023T00:00:00Z",
        vendorDetails: null,
        serviceNumber: "7499143E8A3F",
        invoiceNumber: null,
        policyHolder: null,
      },
    ];
  }, []);
  const [claimResult, setClaimResult] = React.useState(serviceData);

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
    const defaultData: ClaimData[] = [...serviceData];
    setClaimResult([...defaultData]);
  }, [serviceData]);

  const columnHelper = createColumnHelper<ClaimData>();

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
    columnHelper.accessor((row) => row.status, {
      id: "Status",
      header: () => <span>Status</span>,
      enableSorting: true,
      size: 100,
    }),
    columnHelper.accessor(null, {
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
      const result = await fetchClaimList(1, pageLimit, sortBy, orderBy);
      if (result) {
        setTableLoader(false);
      }
    } else if (newSortVal.length === 0 && serviceData.length > 0) {
      const result = await fetchClaimList();
      if (result) {
        setTableLoader(false);
      }
    }
  };
  const handlePagination = async (updaterFunction: any) => {
    setTableLoader(true);

    const newPaginationValue = updaterFunction(pagination);
    setPagination(newPaginationValue);
    const pageNumber = newPaginationValue.pageIndex + 1;

    if (sorting.length > 0) {
      const orderBy = sorting[0].desc ? "desc" : "asc";
      const sortBy = sorting[0].id;
      const result = await fetchClaimList(pageNumber, pageLimit, sortBy, orderBy);
      if (result) {
        setTableLoader(false);
      }
    } else if (sorting.length === 0 && serviceData.length > 0) {
      const result = await fetchClaimList(pageNumber);
      if (result) {
        setTableLoader(false);
      }
    }
  };

  const table = useReactTable({
    data: claimResult,
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
        pageLimit={totalClaims > 20 ? pageLimit : null}
        loader={tableLoader}
        tableDataErrorMsg={claimErrorMsg}
      />
    </div>
  );
};

const mapStateToProps = ({ claimdata }: any) => ({
  claimListData: claimdata.claimListData,
  currentPageNumber: claimdata.currentPageNumber,
  totalClaims: claimdata.totalClaims,
  claimErrorMsg: claimdata.claimErrorMsg,
  sortedIds: claimdata.statusIds,
});

export default connect(mapStateToProps, null)(ServiceRequestTable);
