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
import { addSelectedClaimDetails } from "@/reducers/ClaimData/ClaimSlice";

const ContentListTable: React.FC = (props) => {
  const contentListData = React.useMemo(() => {
    return [
      {
        acv: null,
        acvTax: null,
        acvTotal: null,
        description: "Test",
        ageMonths: 0,
        ageYears: 1,
        category: {
          aggregateLimit: null,
          annualDepreciation: null,
          description: null,
          id: 2,
          name: "Art",
          usefulYears: null,
          specialCase: null,
          depreciation: null,
          firstYearDepreciation: null,
          correspondYearDepreciation: null,
          maxDepreciation: null,
          flatDepreciation: null,
          minPricePoint: null,
          maxPricePoint: null,
          associateSubCat: null,
          categoryId: null,
        },
        claimId: null,
        claimNumber: null,
        id: 585673,
        itemName: null,
        itemNumber: 1,
        itemType: null,
        itemUID: "365EE5573985",
        quantity: 1,
        rcv: null,
        rcvTotal: null,
        status: {
          id: 2,
          status: "ASSIGNED",
        },
        subCategory: {
          aggregateLimit: null,
          annualDepreciation: null,
          description: null,
          id: 12,
          name: "Objects of Art, Sculptures, Figurines Etc. Over $100 Value",
          usefulYears: null,
          specialCase: null,
          depreciation: null,
          firstYearDepreciation: null,
          correspondYearDepreciation: null,
          maxDepreciation: null,
          flatDepreciation: null,
          minPricePoint: null,
          maxPricePoint: null,
          associateSubCat: null,
          categoryId: null,
        },
        taxRate: 3,
        contentService: {
          description: null,
          id: 1,
          isAvailable: null,
          isDefault: null,
          isminimumServiceFee: null,
          service: "Quote With Contact",
          serviceCharge: null,
          subServices: null,
        },
        totalStatedAmount: 20,
        associate: null,
        vendorName: "Artigem",
        adjusterDescription: null,
        quoteDate: null,
        quotedBy: null,
        unitCost: 20,
        subItems: null,
        attachments: null,
        cashPayoutExposure: null,
        noOfUnreadComment: null,
        totalNoOfComments: null,
        applyTax: true,
        standardCost: null,
        standardDescription: null,
        standardItemRetailer: null,
        standardItemSource: null,
        holdOverPaid: null,
        holdOverRemaining: null,
        replacementExposure: null,
        cashPaid: null,
        replacedItemPrice: null,
        itemTag: null,
        condition: {
          conditionId: 3,
          conditionName: "Average",
        },
        replacementQty: null,
        individualLimitAmount: null,
        replaced: false,
        approved: false,
        scheduledItem: false,
      },
      {
        acv: null,
        acvTax: null,
        acvTotal: null,
        description: "Test item no schedule",
        ageMonths: 0,
        ageYears: 0,
        category: null,
        claimId: null,
        claimNumber: null,
        id: 585674,
        itemName: null,
        itemNumber: 2,
        itemType: null,
        itemUID: "759F6B884437",
        quantity: 2,
        rcv: null,
        rcvTotal: null,
        status: {
          id: 2,
          status: "ASSIGNED",
        },
        subCategory: null,
        taxRate: 3,
        contentService: {
          description: null,
          id: 1,
          isAvailable: null,
          isDefault: null,
          isminimumServiceFee: null,
          service: "Quote With Contact",
          serviceCharge: null,
          subServices: null,
        },
        totalStatedAmount: 40,
        associate: null,
        vendorName: "Artigem",
        adjusterDescription: null,
        quoteDate: null,
        quotedBy: null,
        unitCost: 20,
        subItems: null,
        attachments: null,
        cashPayoutExposure: null,
        noOfUnreadComment: null,
        totalNoOfComments: null,
        applyTax: true,
        standardCost: null,
        standardDescription: null,
        standardItemRetailer: null,
        standardItemSource: null,
        holdOverPaid: null,
        holdOverRemaining: null,
        replacementExposure: null,
        cashPaid: null,
        replacedItemPrice: null,
        itemTag: null,
        condition: {
          conditionId: 3,
          conditionName: "Average",
        },
        replacementQty: null,
        individualLimitAmount: null,
        replaced: false,
        approved: false,
        scheduledItem: false,
      },
    ];
  }, []);
  const [claimResult, setClaimResult] = React.useState(contentListData);

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
    const defaultData: ClaimData[] = [...contentListData];
    setClaimResult([...defaultData]);
  }, [contentListData]);

  const columnHelper = createColumnHelper<ClaimData>();

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
    pageIndex: props.currentPageNumber - 1,
    pageSize: pageLimit,
  });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const handleSorting = async (sortingUpdater) => {
    props.setTableLoader(true);

    const newSortVal = sortingUpdater(sorting);
    setSorting(newSortVal);

    if (newSortVal.length > 0) {
      const orderBy = newSortVal[0].desc ? "desc" : "asc";
      const sortBy = newSortVal[0].id;
      const result = await fetchClaimList(1, pageLimit, sortBy, orderBy);
      if (result) {
        props.setTableLoader(false);
      }
    } else if (newSortVal.length === 0 && props.claimListData.length > 0) {
      const result = await fetchClaimList();
      if (result) {
        props.setTableLoader(false);
      }
    }
  };
  const handlePagination = async (updaterFunction) => {
    props.setTableLoader(true);

    const newPaginationValue = updaterFunction(pagination);
    setPagination(newPaginationValue);
    const pageNumber = newPaginationValue.pageIndex + 1;

    if (sorting.length > 0) {
      const orderBy = sorting[0].desc ? "desc" : "asc";
      const sortBy = sorting[0].id;
      const result = await fetchClaimList(pageNumber, pageLimit, sortBy, orderBy);
      if (result) {
        props.setTableLoader(false);
      }
    } else if (sorting.length === 0 && props.claimListData.length > 0) {
      const result = await fetchClaimList(pageNumber);
      if (result) {
        props.setTableLoader(false);
      }
    }
  };

  const table = useReactTable({
    data: claimResult,
    columns,
    pageCount: Math.ceil(props.totalClaims / pageLimit),
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
        totalDataCount={props.totalClaims}
        pageLimit={props.totalClaims > 20 ? pageLimit : null}
        loader={props.tableLoader}
        tableDataErrorMsg={props.claimErrorMsg}
      />
    </div>
  );
};

const mapStateToProps = ({ claimdata }) => ({
  claimListData: claimdata.claimListData,
  currentPageNumber: claimdata.currentPageNumber,
  totalClaims: claimdata.totalClaims,
  claimErrorMsg: claimdata.claimErrorMsg,
  sortedIds: claimdata.statusIds,
});
const mapDispatchToProps = {
  addSelectedClaimDetails,
};
export default connect(mapStateToProps, mapDispatchToProps)(ContentListTable);
