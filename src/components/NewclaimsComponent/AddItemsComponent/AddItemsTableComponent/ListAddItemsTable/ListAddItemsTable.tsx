"use client";
import React, { useEffect, useState } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import CustomReactTable from "@/components/common/CustomReactTable";
import ConfirmModal from "@/components/common/ConfirmModal/ConfirmModal";
import TableLisStyle from "./listAddItems.module.scss";
import { fetchItemDetails } from "@/services/AddItemContentService";
// import { fetchClaimContentActionnn } from "@/services/ClaimService";
import { ConnectedProps, connect } from "react-redux";
import {
  setAddItemsTableData,
  setSelectedItems,
  setSelectedCategory,
  setCategories,
  setSearchKeyword,
  deleteCategoryListItem,
  setPreviousSelectedItems,
  // setEditItemDetail,
} from "@/reducers/UploadCSV/AddItemsTableCSVSlice";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { deleteCategoryItem } from "@/services/ClaimService";
import { addNotification } from "@/reducers/Notification/NotificationSlice";

interface ListAddItemsTableProps {
  addItemsTableData: any[];
  onCheckboxChange: (item: any) => void;
  selectedCategory: string;
  searchKeyword: string;
  setEditItem: (rowData: any) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setTableLoader: React.Dispatch<React.SetStateAction<boolean>>;
  tableLoader: any;
  selectedItems: any[];
}

const ListAddItemsTable: React.FC<ListAddItemsTableProps & connectorType> = ({
  addItemsTableData,
  onCheckboxChange,
  selectedCategory,
  searchKeyword,
  setEditItem,
  setIsModalOpen,
  tableLoader,
  setTableLoader,
  selectedItems,
  previousSelectedItems,
}) => {
  const dispatch = useDispatch();
  const [deletePayload, setDelete] = React.useState<React.SetStateAction<any>>(null);
  const [checkedItems, setCheckedItems] = useState<any[]>(selectedItems);

  const editAction = async (rowData: any) => {
    const payload = {
      forEdit: true,
      itemId: rowData.id,
    };
    await fetchItemDetails(payload);
    setEditItem(rowData);
    setIsModalOpen(true);
  };

  const deleteAction = (rowData: any) => {
    const payload = {
      id: rowData.id,
      itemUID: rowData.itemUID,
    };
    console.log("Delete Payload", payload);
    setDelete(payload);
  };

  const handleDeleteClose = () => {
    setDelete(null);
  };

  const handleDelete = async () => {
    const id = deletePayload?.id;
    console.log("Deleting Item with ID", id);

    try {
      setTableLoader(true);

      const res = await deleteCategoryItem(deletePayload);
      console.log("Delete Response", res);

      if (res) {
        dispatch(
          addNotification({
            message: res ?? "Successfully deleted item.",
            id,
            status: "success",
          })
        );

        setTimeout(() => {
          setTableLoader(false);
        }, 6000);
        dispatch(deleteCategoryListItem({ id }));
      } else {
        dispatch(
          addNotification({
            message: "Something went wrong.",
            id,
            status: "error",
          })
        );
      }
    } catch (error) {
      console.error("Error while deleting item", error);
      dispatch(
        addNotification({
          message: "An error occurred while deleting the item.",
          id,
          status: "error",
        })
      );
    } finally {
      setDelete(null);
    }
  };

  // const handleCheckboxChange = (item: any) => {
  //   console.log("Selected Item", item);
  //   onCheckboxChange(item);
  // };

  // const handleCheckboxChange = (item: any) => {
  //   const updatedCheckedItems = [...checkedItems];
  //   if (updatedCheckedItems.includes(item)) {
  //     updatedCheckedItems.splice(updatedCheckedItems.indexOf(item), 1);
  //   } else {
  //     updatedCheckedItems.push(item);
  //   }

  //   setCheckedItems(updatedCheckedItems);
  //   onCheckboxChange(item);
  // };

  // const handleCheckboxChange = (item: any) => {
  //   const updatedCheckedItems = [...checkedItems];
  //   const isChecked = selectedItems.some((selectedItem) => selectedItem.id === item.id);
  //   if (isChecked) {
  //     if (!updatedCheckedItems.includes(item)) {
  //       updatedCheckedItems.push(item);
  //     }
  //   } else {
  //     if (updatedCheckedItems.includes(item)) {
  //       updatedCheckedItems.splice(updatedCheckedItems.indexOf(item), 1);
  //     } else {
  //       updatedCheckedItems.push(item);
  //     }
  //   }

  //   setCheckedItems(updatedCheckedItems);
  //   onCheckboxChange(item);
  // };
  // useEffect(() => {
  //   setCheckedItems(previousSelectedItems);
  // }, [previousSelectedItems]);

  const handleCheckboxChange = (item: any) => {
    const updatedCheckedItems = [...checkedItems];
    const isChecked = checkedItems.some((checkedItem) => checkedItem.id === item.id);

    if (isChecked) {
      return;
    }
    updatedCheckedItems.push(item);
    setCheckedItems(updatedCheckedItems);

    onCheckboxChange(updatedCheckedItems);
  };

  useEffect(() => {
    setCheckedItems(previousSelectedItems);
  }, [previousSelectedItems]);

  const pageLimit = 100;
  type AddItemsData = {
    id: any;
    itemNumber: number;
    description: string;
    status: { status: string };
    totalStatedAmount: number;
    quantity: string;
    category: { name: string };
    ageMonths: number;
    action: { edit: boolean; delete: boolean };
    select: boolean;
  };

  const columnHelper = createColumnHelper<AddItemsData>();
  const checkboxAccessor = (data: AddItemsData) => data.select;

  const columns = [
    columnHelper.accessor(checkboxAccessor, {
      header: () => (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <input
            type="checkbox"
            className={TableLisStyle.checkbox}
            // onChange={(e) => {
            //   e.stopPropagation();
            //   handleCheckboxChange(row.original);
            // }}
            // checked={checkedItems.some((item) => item.id === row.original)}
          />
        </div>
      ),
      meta: {
        headerClass: TableLisStyle.checkHeader,
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
            className={TableLisStyle.checkbox}
            checked={checkedItems.some(
              (checkedItem) => checkedItem.id === row.original.id
            )}
            onChange={() => handleCheckboxChange(row.original)}
          />
        </div>
      ),
    }),
    columnHelper.accessor("itemNumber", {
      header: () => "Item #",
      id: "itemNumber",
      enableColumnFilter: false,
    }),
    columnHelper.accessor("description", {
      header: () => "Description",
      id: "description",
      enableColumnFilter: false,
    }),
    columnHelper.accessor((data) => data.status.status, {
      header: () => "Status",
      id: "status",
    }),

    columnHelper.accessor("totalStatedAmount", {
      header: () => "Total Value",
      id: "totalStatedAmount",
    }),
    columnHelper.accessor("quantity", {
      header: () => "Qty",
      id: "quantity",
      enableColumnFilter: false,
    }),
    columnHelper.accessor((data) => data.category?.name, {
      header: () => "Category",
      id: "category",
    }),
    columnHelper.accessor("ageMonths", {
      header: () => "Age",
      id: "ageMonths",
    }),
    columnHelper.accessor("action", {
      header: () => `Action`,
      cell: ({ row }) => (
        <div className={TableLisStyle.actionButtons}>
          <button
            className={TableLisStyle.editButton}
            onClick={(e) => {
              e.stopPropagation();
              editAction(row.original);
            }}
          >
            Edit
          </button>
          <button
            className={TableLisStyle.deleteButton}
            onClick={(e) => {
              e.stopPropagation();
              deleteAction(row.original);
            }}
          >
            Delete
          </button>
        </div>
      ),
    }),
  ];

  const filteredData =
    selectedCategory?.label === "All"
      ? addItemsTableData.filter((item) =>
          JSON.stringify(item).toLowerCase().includes(searchKeyword.toLowerCase())
        )
      : selectedCategory?.label
        ? addItemsTableData
            .filter((item) => item.category?.name === selectedCategory?.label)
            .filter((item) =>
              JSON.stringify(item).toLowerCase().includes(searchKeyword.toLowerCase())
            )
        : addItemsTableData.filter((item) =>
            JSON.stringify(item).toLowerCase().includes(searchKeyword.toLowerCase())
          );

  console.log("Filtered Data", filteredData);

  const ModalMsg = () => {
    return (
      <div>
        Are you sure you want to delete this item?<b> Please Confirm!</b>
      </div>
    );
  };

  const table = useReactTable({
    columns,
    data: filteredData,
    enableColumnFilters: false,
    pageCount: Math.ceil(addItemsTableData.length / pageLimit),
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });
  console.log("Filtered Datassssssssssss", filteredData);

  return (
    <>
      {deletePayload && (
        <div>
          <ConfirmModal
            showConfirmation={true}
            closeHandler={handleDeleteClose}
            submitBtnText="Yes"
            closeBtnText="No"
            childComp={<ModalMsg />}
            modalHeading="Delete Item"
            submitHandler={handleDelete}
          />
        </div>
      )}
      <div className={TableLisStyle.addListTableContainer}>
        {filteredData.length > 0 ? (
          <CustomReactTable
            table={table}
            filteredData={filteredData}
            // loader={setTableLoader}
            loader={tableLoader}
          />
        ) : (
          <div className={TableLisStyle.noItemsStyle}>No items available</div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  addItemsTableData: state.addItemsTable.addItemsTableData,
  selectedItems: state.addItemsTable.selectedItems,
  isAnyItemSelected: state.addItemsTable.isAnyItemSelected,
  selectedCategory: state.addItemsTable.selectedCategory,
  categories: state.addItemsTable.categories,
  searchKeyword: state.addItemsTable.searchKeyword,
  previousSelectedItems: state.addItemsTable.previousSelectedItems,
  // editItemDetail: state.claimContentdata.editItemDetail,
});

const mapDispatchToProps = {
  setAddItemsTableData,
  setSelectedItems,
  setSelectedCategory,
  setCategories,
  setSearchKeyword,
  deleteCategoryListItem,
  setPreviousSelectedItems,
  // setEditItemDetail,
  // fetchAddItemsTableCSVData,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(ListAddItemsTable);
