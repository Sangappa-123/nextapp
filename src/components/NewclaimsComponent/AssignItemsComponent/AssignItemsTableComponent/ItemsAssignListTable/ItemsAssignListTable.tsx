"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import {
  setSelectedItems,
  setTotalValue,
  setSelectedItemsUUIDs,
  updateVendorAssignmentPayload,
} from "@/reducers/UploadCSV/AddItemsTableCSVSlice";
import { useDispatch } from "react-redux";
import CustomReactTable from "@/components/common/CustomReactTable";
import TableListStyle from "./itemsAssignListTable.module.scss";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "@/store/store";
import clsx from "clsx";
import Modal from "@/components/common/ModalPopups";
import ItemsToAssignTable from "@/components/ItemsToAssignTable";

interface ItemsAssignListTableProps {
  selectedItems: any[];
  selectedRows: any[];
  setSelectedItems: (items: any[]) => void;
}
const ItemsAssignListTable: React.FC<ItemsAssignListTableProps & connectorType> = ({
  selectedItems,
  setSelectedItems,
}) => {
  type AssignItemsData = {
    id: number;
    itemNumber: string;
    description: string;
    status: { status: string };
    qty: string;
    category: { name: string };
    ageMonths: number;
    select: boolean;
    quantity: string;
    totalStatedAmount: string;
    individualLimitAmount: string;
    scheduledItem: string;
  };
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [totalStatedValue, setTotalStatedValue] = useState<number>(0);
  const dispatch = useDispatch();
  const updateTotalStatedValue = (items: AssignItemsData[]) => {
    const totalValue = items
      .filter((item) => item.select && !isNaN(parseFloat(item.totalStatedAmount)))
      .reduce((acc, item) => acc + parseFloat(item.totalStatedAmount), 0);
    setTotalStatedValue(totalValue);
  };

  useEffect(() => {
    updateTotalStatedValue(selectedItems);
  }, [selectedItems]);

  const handleHeaderCheckboxChange = () => {
    const areAllChecked = selectedItems.every((item) => item.select);

    const updatedSelectedItems = selectedItems.map((item) => ({
      ...item,
      select: !areAllChecked,
    }));

    setSelectedItems(updatedSelectedItems);
  };

  const handleRowSelect = (itemId: number) => {
    const updatedSelectedItems = selectedItems.map((item) =>
      item.id === itemId ? { ...item, select: !item.select } : item
    );

    const updatedSelectedUUIDs = updatedSelectedItems
      .filter((item) => item.select)
      .map((item) => item.uuid);

    updateTotalStatedValue(updatedSelectedItems);
    setSelectedItems(updatedSelectedItems);
    dispatch(setSelectedItemsUUIDs(updatedSelectedUUIDs));
    dispatch(updateVendorAssignmentPayload({ claimedItems: updatedSelectedUUIDs }));
  };

  useEffect(() => {
    const areAllChecked =
      selectedItems.length === 0 || selectedItems.every((item) => item.select === true);
    if (!areAllChecked) {
      const updatedSelectedItems = selectedItems.map((item) => ({
        ...item,
        select: true,
      }));
      setSelectedItems(updatedSelectedItems);
    }
  }, []);

  const columnHelper = createColumnHelper<AssignItemsData>();
  const checkboxAccessor = (data: AssignItemsData) => data.select;
  const columns = [
    columnHelper.accessor(checkboxAccessor, {
      header: () => (
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleHeaderCheckboxChange();
          }}
        >
          <input
            type="checkbox"
            className={TableListStyle.checkbox}
            // checked={true}
            checked={
              selectedItems.length > 0 && selectedItems.every((item) => item.select)
            }
            onChange={(e) => {
              e.stopPropagation();
              handleHeaderCheckboxChange();
            }}
          />
        </div>
      ),
      meta: {
        headerClass: TableListStyle.checkHeader,
      },
      id: "check",
      enableColumnFilter: false,
      cell: ({ row }) => (
        <div
          className="d-flex justify-content-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <input
            type="checkbox"
            className={TableListStyle.checkbox}
            checked={row.original.select}
            onChange={(e) => {
              e.stopPropagation();
              handleRowSelect(row.original.id);
            }}
          />
        </div>
      ),
    }),
    columnHelper.accessor("itemNumber", {
      header: () => "Item #",
      cell: (info: any) => info.getValue(),
      enableSorting: false,
    }),
    columnHelper.accessor("description", {
      header: () => "Description",
      cell: (info: any) => info.getValue(),
      enableSorting: false,
    }),
    columnHelper.accessor("quantity", {
      header: () => "Quantity",
      cell: (info: any) => info.getValue(),
      enableSorting: false,
    }),
    columnHelper.accessor("totalStatedAmount", {
      header: () => "Stated Value",
      id: "totalStatedAmount",
      cell: (info: any) => info.getValue(),
      enableSorting: false,
    }),
    columnHelper.accessor("ageMonths", {
      header: () => "Age",
      cell: (info) => info.renderValue(),
      enableSorting: false,
    }),
    // columnHelper.accessor((data) => data?.category?.category, {
    //   header: () => "Category",
    //   id: "category",
    //   cell: (info: any) => info.getValue(),
    //   enableSorting: false,
    // }),
    columnHelper.accessor((data) => data.category?.name, {
      header: () => "Category",
      id: "category",
      cell: (info: any) => info.getValue(),
      enableSorting: false,
    }),
    columnHelper.accessor("individualLimitAmount", {
      header: () => "Individual Limit",
      cell: (info: any) => info.getValue(),
      enableSorting: false,
    }),
    columnHelper.accessor("scheduledItem", {
      header: () => "Scheduled Item",
      cell: (info: any) => info.getValue(),
      enableSorting: false,
    }),
    columnHelper.accessor((data) => data?.status?.status, {
      header: () => "Status",
      id: "status",
      cell: (info: any) => info.getValue(),
      enableSorting: false,
    }),
  ];

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const categoriesNameAll = Array.from(
    new Set(selectedItems.map((item) => item.category?.name))
  );
  const categoriesText = categoriesNameAll.join(", ");

  const defaultItemsToShow = 10;
  const tableDataWithoutDuplicates = Array.from(
    new Set(selectedItems.slice(0, defaultItemsToShow))
  );

  const table = useReactTable({
    columns,
    data: tableDataWithoutDuplicates,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: true,
    enableColumnFilters: false,
  });

  return (
    <>
      <div className={TableListStyle.addListTableContainer}>
        <div className="col-12">
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            childComp={
              <ItemsToAssignTable
                closeModal={closeModal}
                handleRowSelect={handleRowSelect}
              />
            }
            headingName="Items to Assign"
            overlayClassName={TableListStyle.modalContainer}
            modalWidthClassName={TableListStyle.modalWidth}
          ></Modal>
        </div>

        <CustomReactTable table={table} key={JSON.stringify(selectedItems)} />
        {selectedItems.length > defaultItemsToShow && (
          <div className={clsx(TableListStyle.textAlignCenter, "row")}>
            <a onClick={handleClick}>View all items</a>
          </div>
        )}
      </div>
      <div className={TableListStyle.bakgroundColorStyle}>
        <div className="row mb-2">
          <label className={TableListStyle.labelStyles}>Item(s) Summary</label>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-6 col-12 mb-1">
            <label className={TableListStyle.labelStyles}>
              Total Item(s) Selected:
              <span className={TableListStyle.spanStyle}>{selectedItems.length}</span>
            </label>
          </div>
          <div className="col-md-4 col-sm-6 col-12">
            <label className={TableListStyle.labelStyles}>
              Selected Items Categories:
              <span className={TableListStyle.spanStyle}>{categoriesText}</span>
            </label>
          </div>
        </div>
        <div className="row">
          <label className={TableListStyle.labelStyles}>
            Total Stated Value:
            <span className={TableListStyle.spanStyle}>
              {totalStatedValue.toFixed(2)}
            </span>
          </label>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  addItemsTableData: state.addItemsTable.addItemsTableData,
  selectedItems: state.addItemsTable.selectedItems,
  selectedRows: state.addItemsTable.selectedRows,
  totalValue: state.addItemsTable.totalValue,
  selectedItemsUUIDs: state.addItemsTable.selectedItemsUUIDs,
});

const mapDispatchToProps = {
  setSelectedItems,
  setTotalValue,
  setSelectedItemsUUIDs,
  updateVendorAssignmentPayload,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(ItemsAssignListTable);
