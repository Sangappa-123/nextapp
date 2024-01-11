"use client";
import React from "react";
import receiptMapperStyle from "../receiptMapperComponent.module.scss";
import { ConnectedProps, connect } from "react-redux";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";
import CustomReactTable from "@/components/common/CustomReactTable/index";

interface typeProps {
  [key: string | number]: any;
}
function convertToDollar(value: any) {
  if (value) return `$${Number.parseFloat(value).toFixed(2)}`;
  else {
    return "$0.00";
  }
}
const ClaimedItemsTable: React.FC<connectorType & typeProps> = (props) => {
  const {
    claimedItemsList,
    tableLoader,
    claimedItemsErrorMsg,
    // setTableLoader,
  } = props;
  const [claimResult, setClaimResult] = React.useState(claimedItemsList);

  interface ClaimData {
    [key: string | number]: any;
  }
  React.useEffect(() => {
    const defaultData: ClaimData[] = [...claimedItemsList];
    setClaimResult([...defaultData]);
  }, [claimedItemsList]);

  const columnHelper = createColumnHelper<ClaimData>();

  const columns = [
    columnHelper.accessor("itemNumber", {
      id: "item_number",
      header: () => "Item #",
      cell: (info) => info.getValue(),
      enableColumnFilter: false,
      enableSorting: true,
    }),
    columnHelper.accessor("description", {
      header: () => "Description",
      cell: (info) => info.getValue(),
      enableColumnFilter: false,
      enableSorting: true,
    }),
    columnHelper.accessor("categoryFilter", {
      header: () => "Catogory",
      cell: (info) => info.getValue(),

      enableSorting: false,
    }),

    columnHelper.accessor("statusFilter", {
      header: () => "Status",
      cell: (info) => info.getValue(),
      footer: () => {
        return <span>Total</span>;
      },
      colSpan: 4,
      meta: {
        footerClass: receiptMapperStyle.footerStyles,
      },
      enableSorting: false,
    }),
    columnHelper.accessor("receiptValue", {
      header: () => "Receipt Value",
      cell: (info: any) => (
        <div className={receiptMapperStyle.alignRight}>{`${convertToDollar(
          info.getValue()
        )}`}</div>
      ),
      footer: () => {
        const sum = claimResult.reduce(
          (acc: number, dataItem: any) => acc + dataItem.receiptValue,
          0
        );
        return <span>{`${convertToDollar(sum)}`}</span>;
      },
      meta: {
        footerClass: receiptMapperStyle.footerStyles,
      },
      enableSorting: true,
      enableColumnFilter: false,
    }),
    columnHelper.accessor("totalQuantityReplaced", {
      header: () => "Qty Replaced",
      cell: (info: any) => (
        <div className={receiptMapperStyle.alignRight}>{`${info.getValue()}(${
          info.row.original.quantity
        })`}</div>
      ),
      footer: () => {
        const Replacedsum = claimResult.reduce(
          (acc: number, dataItem: any) => acc + dataItem.totalQuantityReplaced,
          0
        );
        const sum = claimResult.reduce(
          (acc: number, dataItem: any) => acc + dataItem.quantity,
          0
        );
        return <span>{`${Replacedsum}(${sum})`}</span>;
      },
      meta: {
        footerClass: receiptMapperStyle.footerStyles,
      },
      enableSorting: true,
      enableColumnFilter: false,
    }),
    columnHelper.accessor("totalStatedAmount", {
      header: () => "Max. Replacement $",
      cell: (info: any) => (
        <div className={receiptMapperStyle.alignRight}>{`${convertToDollar(
          info.getValue()
        )}`}</div>
      ),
      footer: () => {
        const sum = claimResult.reduce(
          (acc: number, dataItem: any) => acc + dataItem.totalStatedAmount,
          0
        );
        return <span>{`${convertToDollar(sum)}`}</span>;
      },
      meta: {
        footerClass: receiptMapperStyle.footerStyles,
      },
      enableSorting: true,
      enableColumnFilter: false,
    }),
    columnHelper.accessor("cashPaid", {
      header: () => "Cash Paid",
      cell: (info: any) => (
        <div className={receiptMapperStyle.alignRight}>{`${convertToDollar(
          info.getValue()
        )}`}</div>
      ),
      footer: () => {
        const sum = claimResult.reduce(
          (acc: number, dataItem: any) => acc + dataItem.cashPaid,
          0
        );
        return <span>{`${convertToDollar(sum)}`}</span>;
      },
      meta: {
        footerClass: receiptMapperStyle.footerStyles,
      },
      enableSorting: true,
      enableColumnFilter: false,
    }),
    columnHelper.accessor("holdOverDue", {
      header: () => "Holdover Due",
      cell: (info: any) => (
        <div className={receiptMapperStyle.alignRight}>{`${convertToDollar(
          info.getValue()
        )}`}</div>
      ),
      footer: () => {
        const sum = claimResult.reduce(
          (acc: number, dataItem: any) => acc + dataItem.holdOverDue,
          0
        );
        return <span>{`${convertToDollar(sum)}`}</span>;
      },
      meta: {
        footerClass: receiptMapperStyle.footerStyles,
      },
      enableSorting: true,
      enableColumnFilter: false,
    }),
    columnHelper.accessor("holdOverPaymentPaidAmount", {
      header: () => "Holdover Paid",
      cell: (info: any) => (
        <div className={receiptMapperStyle.alignRight}>{`${convertToDollar(
          info.getValue()
        )}`}</div>
      ),
      footer: () => {
        const sum = claimResult.reduce(
          (acc: number, dataItem: any) => acc + dataItem.holdOverPaymentPaidAmount,
          0
        );
        return <span>{`${convertToDollar(sum)}`}</span>;
      },
      meta: {
        footerClass: receiptMapperStyle.footerStyles,
      },
      enableSorting: true,
      enableColumnFilter: false,
    }),
    columnHelper.accessor("Action", {
      header: () => "Action",
      cell: (info) => info.getValue(),
      footer: () => {
        return <span></span>;
      },
      meta: {
        footerClass: receiptMapperStyle.footerStyles,
      },
      enableSorting: false,
      enableColumnFilter: false,
    }),
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  // const handleSorting = async (sortingUpdater: any) => {
  //   setTableLoader(true);

  //   const newSortVal = sortingUpdater(sorting);
  //   setSorting(newSortVal);

  //   if (newSortVal.length > 0) {
  //     const sortById = newSortVal[0].id;
  //     let sortedData : any = []
  //     if(newSortVal[0].desc){
  //       sortedData = sortBy(claimedItemsList, sortById).reverse();
  //     }else{
  //       sortedData= sortBy(claimedItemsList, sortById);
  //     }

  //     setClaimResult([...sortedData]);
  //       setTableLoader(false);
  //   } else if (newSortVal.length === 0 && claimedItemsList.length > 0) {
  //     setClaimResult([...claimedItemsList]);
  //     setTableLoader(false);

  //   }
  // };

  const handleRowClick = async (rowData: any) => {
    console.log(rowData);
  };

  const table = useReactTable({
    data: claimResult,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    debugTable: true,
    // manualSorting: true,
    enableSorting: true,
  });

  return (
    <div>
      <CustomReactTable
        table={table}
        totalDataCount={claimedItemsList.length}
        // pageLimit={pageLimit}
        // showStatusColor={true}
        loader={tableLoader}
        tableDataErrorMsg={claimedItemsErrorMsg}
        handleRowClick={handleRowClick}
        // filterFn={filterFn}
        // customFilterValues={customFilterValues}
      />
    </div>
  );
};

const mapStateToProps = ({ claimedItems }: any) => ({
  claimedItemsList: claimedItems.claimedItemsList,

  claimedItemsErrorMsg: claimedItems.claimedItemsErrorMsg,
});

const connector = connect(mapStateToProps, null);
type connectorType = ConnectedProps<typeof connector>;
export default connector(ClaimedItemsTable);
