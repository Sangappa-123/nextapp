"use client";
import React from "react";
import ReactTableStyles from "./ReactTable.module.scss";
import { clsx } from "clsx";
import { MdExpandLess } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import CustomLoader from "@/components/common/CustomLoader";
import { flexRender } from "@tanstack/react-table";

const ReactTable: React.FC = (props) => {
  const {
    table,
    totalDataCount = null,
    pageLimit = null,
    showStatusColor = null,
    loader = null,
    tableDataErrorMsg = null,
    handleRowClick = null,
  } = props;

  return (
    <div className={ReactTableStyles.reactTable}>
      {loader && <CustomLoader loaderType="spinner1" />}

      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    width: header.getSize() !== 150 ? header.getSize() : undefined,
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: (
                          <span>
                            {" "}
                            <MdExpandLess />
                          </span>
                        ),
                        desc: (
                          <span>
                            {" "}
                            <MdExpandMore />
                          </span>
                        ),
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableDataErrorMsg ? (
            <tr>
              <td colspan="100" className="text-center text-danger">
                {tableDataErrorMsg}
              </td>
            </tr>
          ) : (
            <>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  {...(handleRowClick
                    ? {
                        onClick: () => {
                          handleRowClick(row.original);
                        },
                      }
                    : {})}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <td
                      key={cell.id}
                      className={
                        showStatusColor && index === 0
                          ? clsx({
                              [ReactTableStyles.All_Items_Priced]:
                                row.original.noOfItems == row.original.noOfItemsPriced,
                              [ReactTableStyles.Partial_Items_Priced]:
                                row.original.noOfItemsPriced != 0 &&
                                row.original.noOfItems > row.original.noOfItemsPriced,
                              [ReactTableStyles.No_Items_Priced]:
                                row.original.noOfItemsPriced == 0 &&
                                row.original.noOfItems != 0,
                            })
                          : undefined
                      }
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      <div className="h-2" />
      {!tableDataErrorMsg && pageLimit && (
        <div className={ReactTableStyles.paginationContainer}>
          <span className={ReactTableStyles.paginationText}>
            Showing {table.getState().pagination.pageIndex * pageLimit + 1} to{" "}
            {totalDataCount >
            table.getState().pagination.pageIndex * pageLimit + 1 + pageLimit - 1
              ? table.getState().pagination.pageIndex * pageLimit + 1 + pageLimit - 1
              : props.totalDataCount}{" "}
            of {props.totalDataCount} Claims
          </span>
          <div className="flex items-center gap-2">
            <button
              className={`${ReactTableStyles.paginationButton} ${ReactTableStyles.paginationIcon}`}
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              className={`${ReactTableStyles.paginationButton} ${ReactTableStyles.paginationIcon}`}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>

            {Array(table.getPageCount())
              .fill()
              .map((value, index) => {
                if (index < 10) {
                  return (
                    <button
                      key={value + "-" + index}
                      className={clsx({
                        [ReactTableStyles.paginationButton]: true,
                        [ReactTableStyles.active]:
                          index == table.getState().pagination.pageIndex,
                      })}
                      onClick={() => table.setPageIndex(index)}
                    >
                      {index + 1}
                    </button>
                  );
                }
              })}
            {table.getPageCount() > 10 && (
              <>
                <button className={ReactTableStyles.paginationButton}>...</button>
                <button
                  className={ReactTableStyles.paginationButton}
                  onClick={() => table.setPageIndex(table.getPageCount())}
                >
                  {table.getPageCount()}
                </button>
              </>
            )}
            <button
              className={`${ReactTableStyles.paginationButton} ${ReactTableStyles.paginationIcon}`}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            <button
              className={`${ReactTableStyles.paginationButton} ${ReactTableStyles.paginationIcon}`}
              onClick={() => table.setPageIndex(table.getPageCount())}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactTable;
