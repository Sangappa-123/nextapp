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
import {
  updateClaimContentListData,
  clearFilter,
} from "@/reducers/ClaimData/ClaimContentSlice";
import ConfirmModal from "@/components/common/ConfirmModal/ConfirmModal";

interface typeProps {
  [key: string | number]: any;
}
const ContentListTable: React.FC<connectorType & typeProps> = (props) => {
  const {
    claimContentListData,
    totalClaims,
    tableLoader,
    claimErrorMsg,
    updateClaimContentListData,
    clearFilter,
  } = props;
  const router = useRouter();

  interface ContentListData {
    [key: string | number]: any;
  }

  const [claimResult, setClaimResult] = React.useState(claimContentListData);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  // const [filterSelected, setFilterSelected] = React.useState();
  const [showDelete, setShowDelete] = React.useState(false);
  const pageLimit = 20;
  const fetchSize = 20;

  React.useEffect(() => {
    const defaultData: ContentListData[] = [...claimContentListData];
    setClaimResult([...defaultData.slice(0, fetchSize)]);
  }, [claimContentListData]);

  const handleClearAllFilter = () => {
    clearFilter();
  };
  const columnHelper = createColumnHelper<ContentListData>();

  const columns = [
    columnHelper.group({
      header: () => (
        <span>
          <a href="" onClick={handleClearAllFilter}>
            Clear All Filter
          </a>
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
        columnHelper.accessor("status", {
          header: () => "Status", // filter option true should have same id as value
          id: "status",
        }),
        columnHelper.accessor("category", {
          header: () => "Catogory", // filter option true should have same id as value
          id: "category",
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
          id: "totalStatedAmount", // filter option true should have same id as value
        }),
        columnHelper.accessor("itemTag", {
          header: () => "Item Tag",
          id: "itemTag", // filter option true should have same id as value
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
          cell: () => (
            <div onClick={deleteAction}>
              <RiDeleteBin5Fill color="grey" size="17px" />
            </div>
          ),
          enableColumnFilter: false,
        }),
      ],
    }),
  ];

  const deleteAction = (e) => {
    e.stopPropagation();
    setShowDelete(true);
  };
  const handleDeleteClose = () => {
    setShowDelete(false);
  };

  const handleDelete = () => {
    setShowDelete(false);
  };
  const fetchNextPage = () => {
    const nextPageData = claimContentListData.slice(
      claimResult.length,
      claimResult.length + fetchSize
    );
    setClaimResult([...claimResult, ...nextPageData]);

    return true;
  };
  const filterFn = async (currentValue: any, columnId: string) => {
    const newCLaim = claimContentListData.filter((item: any) => {
      if (item[columnId] === null && currentValue.includes("BLANK")) {
        return item;
      } else if (item[columnId] === null && !currentValue.includes("BLANK")) {
        return;
      } else if (currentValue.some((row: any) => item[columnId].includes(row)))
        return item;
    });

    await updateClaimContentListData({ claimContentList: newCLaim });
    setClaimResult([...newCLaim.slice(0, fetchSize)]);
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
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    enableSorting: false,
    manualFiltering: true,
  });

  return (
    <>
      {showDelete && (
        <div>
          <ConfirmModal
            showConfirmation={true}
            closeHandler={handleDeleteClose}
            submitBtnText="Yes"
            closeBtnText="No"
            descText="Are you sure you want to delete this item? Please Confirm!"
            modalHeading="Delete Lost/Damaged Item"
            submitHandler={handleDelete}
          />
        </div>
      )}
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
          filterFn={filterFn}
          handleRowClick={handleRowClick}
        />
      </div>
    </>
  );
};

const mapStateToProps = ({ claimContentdata }: any) => ({
  claimContentListData: claimContentdata.claimContentListData,
  claimErrorMsg: claimContentdata.claimErrorMsg,
});
const mapDispatchToProps = {
  updateClaimContentListData,
  clearFilter,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(ContentListTable);
