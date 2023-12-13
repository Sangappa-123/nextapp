"use client";
import React from "react";
import ContentListTableStyle from "./ContentListTable.module.scss";
import { ConnectedProps, connect } from "react-redux";
// import { fetchClaimList } from "@/services/ClaimService";
import {
  createColumnHelper,
  getCoreRowModel,
  // getSortedRowModel,
  // SortingState,
  useReactTable,
  // PaginationState,
  getFilteredRowModel,
  ColumnFiltersState,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { RiDeleteBin5Fill } from "react-icons/ri";

import CustomReactTable from "@/components/common/CustomReactTable/index";

interface typeProps {
  [key: string | number]: any;
}
const ContentListTable: React.FC<connectorType & typeProps> = (props) => {
  const { claimContentListData, totalClaims, tableLoader, claimErrorMsg } = props;
  const router = useRouter();

  const [claimResult, setClaimResult] = React.useState(claimContentListData);

  const pageLimit = 20;
  const fetchSize = 20;

  interface ContentListData {
    [key: string | number]: any;
  }
  React.useEffect(() => {
    const defaultData: ContentListData[] = [...claimContentListData];
    setClaimResult([...defaultData.slice(0, fetchSize)]);
  }, [claimContentListData]);

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
        columnHelper.accessor("", {
          header: () => (
            <input type="checkbox" className={ContentListTableStyle.checkbox} />
          ),
          meta: {
            headerClass: ContentListTableStyle.checkHeader,
          },
          id: "check",
          enableColumnFilter: false,
          cell: () => (
            <div className="d-flex justify-content-center">
              <input type="checkbox" className={ContentListTableStyle.checkbox} />
            </div>
          ),
        }),
        columnHelper.accessor((row, i) => i + 1, {
          header: () => "Item #",
          id: "item",
          enableColumnFilter: false,
        }),
        columnHelper.accessor((row) => (row.status ? row.status.status : null), {
          header: () => "Status",
          id: "status",
          // filterFn: (rows: any, columnIds: string[], filterValues: string[]) => {
          //   console.log("filterUpdater",filterValues);
          //   if (!filterValues || filterValues.length === 0) {
          //     return rows;
          //   }
          //   return rows.filter(row => filterValues.includes(row.values[columnIds[0]]));
          // },
          // cell: (info) =>{
          //   if (info.renderValue()) {
          //     return info.renderValue().status;
          //   }
          //   return null;
          // }
        }),
        columnHelper.accessor((row) => (row.category ? row.category.name : null), {
          header: () => "Catogory",
          id: "catogory",
          // cell: (info) =>{
          //   if (info.renderValue()) {
          //     return info.renderValue().name;
          //   }
          //   return null;
          // }
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
        columnHelper.accessor("description", {
          header: () => "Description",
          id: "Description",
          enableColumnFilter: false,
        }),
        columnHelper.accessor("quantity", {
          header: () => "Qty",
          id: "qty",
          enableColumnFilter: false,
        }),
        columnHelper.accessor("totalStatedAmount", {
          header: () => "Total Price",
          id: "total-price",
        }),
        columnHelper.accessor("itemTag", {
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
        columnHelper.accessor("vendorName", {
          header: () => "Vendor",
          id: "vendor",
          enableColumnFilter: false,
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
        columnHelper.accessor("adjusterDescription", {
          header: () => "Replacment Description",
          id: "Replacement_Description",
          enableColumnFilter: false,
        }),
        columnHelper.accessor("rcvTotal", {
          header: () => "Replacment Cost",
          id: "replacment",
          enableColumnFilter: false,
        }),
        columnHelper.accessor("cashPayoutExposure", {
          header: () => "Cash Exposure",
          id: "cash-exposure",
          enableColumnFilter: false,
        }),
      ],
    }),
    columnHelper.group({
      header: "",
      id: "actionItem",
      columns: [
        columnHelper.accessor("Action", {
          header: () => "Action",
          id: "Action",
          cell: () => <RiDeleteBin5Fill color="grey" size="17px" />,
          enableColumnFilter: false,
        }),
      ],
    }),
  ];

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const fetchNextPage = () => {
    const nextPageData = claimContentListData.slice(
      claimResult.length,
      claimResult.length + fetchSize
    );
    setClaimResult([...claimResult, ...nextPageData]);

    return true;
  };
  const filterApiCall = (currentValue: any) => {
    // console.log("columnFilters",columnFilters);

    // console.log("columnFilters currentValue",currentValue);

    const newCLaim = claimResult.filter((item: any) => {
      if (currentValue.some((row: any) => item.status.status.includes(row))) return item;
    });
    console.log("columnFilters newCLaim", newCLaim);

    setClaimResult(newCLaim);
  };
  const handleFilter = async (filterUpdater: any) => {
    const newVal = filterUpdater(columnFilters);

    console.log("filterUpdater newVal", newVal);
    setColumnFilters(newVal);
  };
  const handleRowClick = (rowData: any) => {
    router.push(`/adjuster-line-item-detail/${rowData?.claimId}/${rowData.itemId}`);
  };
  const table = useReactTable({
    data: claimResult,
    columns,
    pageCount: Math.ceil(totalClaims / pageLimit),
    state: {
      columnFilters,
    },

    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    manualSorting: true,
    manualPagination: true,
    onColumnFiltersChange: handleFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    enableSorting: false,
    manualFiltering: true,
  });

  return (
    <div className={ContentListTableStyle.claimTableContainer}>
      <CustomReactTable
        table={table}
        totalDataCount={totalClaims}
        pageLimit={totalClaims > 20 ? pageLimit : null}
        loader={tableLoader}
        tableDataErrorMsg={claimErrorMsg}
        fetchNextPage={fetchNextPage}
        totalFetched={claimResult.length}
        totalDBRowCount={claimContentListData.length}
        filterApiCall={filterApiCall}
        handleRowClick={handleRowClick}
      />
    </div>
  );
};

const mapStateToProps = ({ claimContentdata }: any) => ({
  claimContentListData: claimContentdata.claimContentListData,
  claimErrorMsg: claimContentdata.claimErrorMsg,
});
const connector = connect(mapStateToProps, null);
type connectorType = ConnectedProps<typeof connector>;
export default connector(ContentListTable);
