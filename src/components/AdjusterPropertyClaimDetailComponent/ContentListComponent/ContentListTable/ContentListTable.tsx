"use client";
import React from "react";
import ContentListTableStyle from "./ContentListTable.module.scss";
import { connect } from "react-redux";
import { fetchClaimList } from "@/services/ClaimService";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";
import CustomReactTable from "@/components/common/CustomReactTable/index";

const ContentListTable: React.FC = (props) => {
  const {
    currentPageNumber,
    setTableLoader,
    totalClaims,
    tableLoader,
    claimErrorMsg,
  }: any = props;

  const contentListData = React.useMemo(() => {
    return [
      {
        description: "Test",

        category: {
          name: "Art",
        },

        quantity: 1,

        rcvTotal: null,
        status: {
          id: 2,
          status: "ASSIGNED",
        },

        totalStatedAmount: 20,
        vendorName: "Artigem",
        adjusterDescription: null,
        itemTag: null,

        cashPayoutExposure: null,
      },
      {
        description: "Test item no schedule",

        category: null,

        quantity: 2,
        rcvTotal: null,
        status: {
          id: 2,
          status: "ASSIGNED",
        },

        totalStatedAmount: 40,
        vendorName: "Artigem",
        adjusterDescription: null,

        itemTag: null,
        cashPayoutExposure: null,
      },
    ];
  }, []);
  const [claimResult, setClaimResult] = React.useState(contentListData);

  const pageLimit = 20;

  type ContentListData = {
    status: object | null;
    category: object | null;
    description: string | null;
    quantity: number | null;
    totalStatedAmount: number | null;
    itemTag: string | null;
    vendorName: string | null;
    adjusterDescription: string | null;
    rcvTotal: number | null;
    cashPayoutExposure: number | null;
  };

  React.useEffect(() => {
    const defaultData: ContentListData[] = [...contentListData];
    setClaimResult([...defaultData]);
  }, [contentListData]);

  const columnHelper = createColumnHelper<ContentListData>();

  const columns = [
    columnHelper.group({
      header: () => (
        <span>
          <a href="">Clear All Filter</a>
        </span>
      ),
      id: "clear",
      columns: [
        columnHelper.accessor(null, {
          header: () => "[]",
          id: "check",
        }),
        columnHelper.accessor(null, {
          header: () => "Item #",
          id: "item",
        }),
        columnHelper.accessor(null, {
          header: () => "Status",
          id: "status",
        }),
        columnHelper.accessor(null, {
          header: () => "Catogory",
          id: "catogory",
        }),
      ],
    }),
    columnHelper.group({
      header: () => "Original Item",
      id: "original_item",
      meta: {
        headerClass: ContentListTableStyle.originalItemHeader,
      },
      columns: [
        columnHelper.accessor(null, {
          header: () => "Description",
          id: "Description",
        }),
        columnHelper.accessor(null, {
          header: () => "Qty",
          id: "qty",
        }),
        columnHelper.accessor(null, {
          header: () => "Total Price",
          id: "total-price",
        }),
        columnHelper.accessor(null, {
          header: () => "Item Tag",
          id: "item-tag",
        }),
      ],
    }),
    columnHelper.group({
      header: "Vendor",
      id: "vendorId",
      meta: {
        headerClass: ContentListTableStyle.originalItemHeader,
      },
      columns: [
        columnHelper.accessor(null, {
          header: () => "Vendor",
          id: "vendor",
        }),
      ],
    }),
    columnHelper.group({
      header: "Replacment Item",
      id: "replacmentItem",
      meta: {
        headerClass: ContentListTableStyle.replacementItemHeader,
      },
      columns: [
        columnHelper.accessor(null, {
          header: () => "Replacment Description",
          id: "Replacement_Description",
        }),
        columnHelper.accessor(null, {
          header: () => "Replacment Cost",
          id: "replacment",
        }),
        columnHelper.accessor(null, {
          header: () => "Cash Exposure",
          id: "cash-exposure",
        }),
      ],
    }),
    columnHelper.group({
      header: "",
      id: "actionItem",
      columns: [
        columnHelper.accessor(null, {
          header: () => "Action",
          id: "Action",
        }),
      ],
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
    } else if (newSortVal.length === 0 && contentListData.length > 0) {
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
    } else if (sorting.length === 0 && contentListData.length > 0) {
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
  });

  return (
    <div className={ContentListTableStyle.claimTableContainer}>
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

export default connect(mapStateToProps, null)(ContentListTable);
