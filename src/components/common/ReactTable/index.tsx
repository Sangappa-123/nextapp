"use client";
import React from "react";
import ReactTableStyles from "./ReactTable.module.scss";

import { flexRender } from "@tanstack/react-table";

const ReactTable: React.FC = (props) => {
  const { table, totalClaims } = props;
  return (
    <div className={ReactTableStyles.reactTable}>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-2" />
      <span>
        Showing {table.getState().pagination.pageIndex * 20 + 1} to{" "}
        {totalClaims > table.getState().pagination.pageIndex * 20 + 1 + 20 - 1
          ? table.getState().pagination.pageIndex * 20 + 1 + 20 - 1
          : props.totalClaims}{" "}
        of {props.totalClaims} Claims
      </span>
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>

        {Array(table.getPageCount())
          .fill()
          .map((value, index) => {
            if (index < 5) {
              return (
                <button
                  key={value}
                  className="border rounded p-1"
                  onClick={() => table.setPageIndex(index)}
                >
                  {index + 1}
                </button>
              );
            }
          })}
        {table.getPageCount() > 5 && (
          <>
            <button className="border rounded p-1">...</button>
            <button
              className="border rounded p-1"
              onClick={() => table.setPageIndex(table.getPageCount())}
            >
              {table.getPageCount()}
            </button>
          </>
        )}
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount())}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default ReactTable;
