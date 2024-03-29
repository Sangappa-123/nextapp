"use client";
import React from "react";
import receiptMapperStyle from "../../../receiptMapperComponent.module.scss";
import { ConnectedProps, connect } from "react-redux";
import { clsx } from "clsx";
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
import { getUSDCurrency } from "@/utils/utitlity";
import { convertToCurrentTimezone } from "@/utils/helper";

interface typeProps {
  [key: string | number]: any;
}

const ClaimedItemsTable: React.FC<connectorType & typeProps> = (props) => {
  const {
    claimedItemsList,
    tableLoader,
    claimedItemsErrorMsg,
    setTableLoader,
    clearFilter,
  } = props;
  const [claimResult, setClaimResult] = React.useState(claimedItemsList);
  const [filterSelected, setFilterSelected] = React.useState([]);

  interface ClaimData {
    [key: string | number]: any;
    subRows?: ClaimData[];
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
      meta: {
        footerClass: receiptMapperStyle.footerStyles,
        footercolSpan: 4,
      },
      enableSorting: false,
    }),
    columnHelper.accessor("receiptValue", {
      header: () => "Receipt Value",
      cell: (info: any) => (
        <div className={receiptMapperStyle.alignRight}>{`${getUSDCurrency(
          info.getValue()
        )}`}</div>
      ),
      footer: () => {
        const sum = claimResult.reduce(
          (acc: number, dataItem: any) => acc + dataItem.receiptValue,
          0
        );
        return <span>{`${getUSDCurrency(sum)}`}</span>;
      },
      meta: {
        footerClass: receiptMapperStyle.footerStyles,
      },
      enableSorting: true,
      enableColumnFilter: false,
    }),
    columnHelper.accessor("quantity", {
      header: () => "Qty Replaced",
      cell: (info: any) => (
        <div className={receiptMapperStyle.alignRight}>{`${
          info.row.original.totalQuantityReplaced
        }(${info.getValue()})`}</div>
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
    columnHelper.accessor("replacementExposure", {
      header: () => "Max. Replacement $",
      cell: (info: any) => (
        <div className={receiptMapperStyle.alignRight}>{`${getUSDCurrency(
          info.getValue()
        )}`}</div>
      ),
      footer: () => {
        const sum = claimResult.reduce(
          (acc: number, dataItem: any) => acc + dataItem.replacementExposure,
          0
        );
        return <span>{`${getUSDCurrency(sum)}`}</span>;
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
        <div className={receiptMapperStyle.alignRight}>{`${getUSDCurrency(
          info.getValue()
        )}`}</div>
      ),
      footer: () => {
        const sum = claimResult.reduce(
          (acc: number, dataItem: any) => acc + dataItem.cashPaid,
          0
        );
        return <span>{`${getUSDCurrency(sum)}`}</span>;
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
        <div className={receiptMapperStyle.alignRight}>{`${getUSDCurrency(
          info.getValue()
        )}`}</div>
      ),
      footer: () => {
        const sum = claimResult.reduce(
          (acc: number, dataItem: any) => acc + dataItem.holdOverDue,
          0
        );
        return <span>{`${getUSDCurrency(sum)}`}</span>;
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
        <div className={receiptMapperStyle.alignRight}>{`${getUSDCurrency(
          info.getValue()
        )}`}</div>
      ),
      footer: () => {
        const sum = claimResult.reduce(
          (acc: number, dataItem: any) => acc + dataItem.holdOverPaymentPaidAmount,
          0
        );
        return <span>{`${getUSDCurrency(sum)}`}</span>;
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

  const filterFn = async (
    currentValue: any,
    columnId: string,
    currentTypeofFilter: string
  ) => {
    setTableLoader(true);
    const newfilterArr: any = [...filterSelected];

    const columnIndex = newfilterArr.findIndex((item: any) =>
      Object.prototype.hasOwnProperty.call(item, columnId)
    );

    if (columnIndex !== -1) {
      newfilterArr[columnIndex][columnId] = {
        currentValue,
        typeofFilter: newfilterArr[columnIndex][columnId].typeofFilter,
      };
    } else {
      newfilterArr.push({
        [columnId]: { currentValue, typeofFilter: currentTypeofFilter },
      });
    }

    setFilterSelected(newfilterArr);

    let filterArr = claimedItemsList;

    await newfilterArr.forEach((filterItem: any) => {
      const colId = Object.keys(filterItem)[0];

      const values = filterItem[colId].currentValue;
      const typeofFilter = filterItem[colId].typeofFilter;

      if (typeofFilter !== "number") {
        filterArr = filterArr.filter((item: any) => {
          if (item[colId] === null && values.includes("BLANK")) {
            return true;
          } else if (item[colId] === null && !values.includes("BLANK")) {
            return false;
          } else if (
            values.some((val: any) => item[colId].toUpperCase() === val.toUpperCase())
          ) {
            return true;
          }
          return false;
        });
      }
    });

    setClaimResult([...filterArr]);
    setTableLoader(false);
  };
  const handleRowClick = async (rowData: any) => {
    console.log(rowData);
  };

  const renderSubComponent = ({ row }: any) => {
    return (
      <>
        {row.original.subRows.map((subRow: any) => (
          <tr
            key={subRow.itemNumber}
            onClick={() => handleRowClick(subRow)}
            className={clsx("text-right", {
              [receiptMapperStyle.subtotalRow]: subRow.totalRow,
            })}
          >
            <td
              colSpan={4}
              className={clsx({
                "text-center": !subRow.totalRow,
              })}
            >
              {subRow.totalRow
                ? "Total"
                : convertToCurrentTimezone(subRow.createDate, "MMM DD YYYY hh:mm A")}
            </td>
            {row.getVisibleCells().map((cell: any, index: number) => {
              if (subRow[cell.column.id] !== undefined) {
                return (
                  <td key={index}>
                    {cell.column.id !== "quantity"
                      ? getUSDCurrency(subRow[cell.column.id])
                      : subRow.totalRow
                        ? `${row.original.totalQuantityReplaced}(${
                            subRow[cell.column.id]
                          })`
                        : subRow[cell.column.id]}
                  </td>
                );
              }
            })}
            <td></td>
          </tr>
        ))}
      </>
    );
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
    enableSorting: true,
  });

  return (
    <div>
      <CustomReactTable
        table={table}
        totalDataCount={claimedItemsList?.length}
        loader={tableLoader}
        tableDataErrorMsg={claimedItemsErrorMsg}
        handleRowClick={handleRowClick}
        filterFn={filterFn}
        showFooter={true}
        tableCustomClass={receiptMapperStyle.tableContainer}
        renderSubComponent={renderSubComponent}
        clearFilter={clearFilter}
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
