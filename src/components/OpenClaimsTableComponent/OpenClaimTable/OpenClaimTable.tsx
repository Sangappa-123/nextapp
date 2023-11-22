import React from "react";
import OpenClaimTableStyle from "./OpenClaimTable.module.scss";
import { connect } from "react-redux";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

const OpenClaimTable: React.FC = (props) => {
  const [claimResult, setClaimResult] = React.useState(props.claimListData);

  type ClaimData = {
    claimNumber: string;
    status: string;
    noOfItems: number;
    noOfItemsPriced: number;
    policyHoldersName: string;
    claimDate: string;
    lastActive: string;
    lastUpdated: string;
  };
  React.useEffect(() => {
    const defaultData: ClaimData[] = [...props.claimListData];
    setClaimResult([...defaultData]);
  }, [props.claimListData]);

  const columnHelper = createColumnHelper<ClaimData>();

  const columns = [
    columnHelper.accessor("claimNumber", {
      header: () => `Claim #`,
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor((row) => row.status, {
      id: "Status",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Status</span>,
      enableSorting: false,
    }),
    columnHelper.accessor("noOfItems", {
      header: () => `# of Items`,
      cell: (info) => info.renderValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("noOfItemsPriced", {
      header: () => `# of Items Priced`,
      cell: (info) => info.renderValue(),
      enableSorting: false,
    }),
    columnHelper.accessor("policyHoldersName", {
      header: () => <span>{`PolicyHolder's Name`}</span>,
      enableSorting: false,
    }),
    columnHelper.accessor("claimDate", {
      header: "Claim Date",
      enableSorting: true,
    }),
    columnHelper.accessor("lastActive", {
      header: "Last Active",
      enableSorting: false,
    }),
    columnHelper.accessor("lastUpdated", {
      header: "Last Updated",
      enableSorting: false,
    }),
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: claimResult,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <div className={OpenClaimTableStyle.claimTableContainer}>
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
    </div>
  );
};

const mapStateToProps = ({ claimdata }) => ({
  claimListData: claimdata.claimListData,
});
export default connect(mapStateToProps, null)(OpenClaimTable);
