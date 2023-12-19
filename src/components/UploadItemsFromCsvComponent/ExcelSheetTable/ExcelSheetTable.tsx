"use client";
import React, { useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  // getSortedRowModel,
  // SortingState,
  useReactTable,
  // PaginationState,
} from "@tanstack/react-table";
// import { useDispatch } from "react-redux";
// import { TABLE_LIMIT_20 } from "@/constants/constants";
import { ConnectedProps, connect } from "react-redux";
// import { useSelector } from "react-redux";
import ExcelSheetTableStyle from "./ExcelSheetTable.module.scss";
import { RootState } from "@/store/store";
import { setExcelCsvUploadData } from "@/services/excelCsvUploadSlice";
import CustomReactTable from "@/components/common/CustomReactTable";

interface ExcelSheetTableProps {
  postLossItemDetails: any[];
  // failedItems: any[];
  // failedItems: FailedItem[];
}

const ExcelSheetTable: React.FC<ExcelSheetTableProps & connectorType> = (props) => {
  // const dispatch = useDispatch();
  const { postLossItemDetails, setExcelCsvUploadData } = props;
  console.log("postLossItemDetails", postLossItemDetails);
  // const [editedIdRowData, setEditedIdRowData] = useState<any>({});
  const [editedBrandRowData, setEditedBrandRowData] = useState<any>({});
  const [editedModelRowData, setEditedModelRowData] = useState<any>({});
  const [editedDescRowData, setEditedDescRowData] = useState<any>({});
  const [editedAgeYearRowData, setEditedAgeYearRowData] = useState<any>({});
  const [editedRowData, setEditedRowData] = useState<any>({});
  const [editedConditionRowData, setEditedConditionRowData] = useState<any>({});
  const [editedPurchaseFromRowData, setEditedPurchaseFromRowData] = useState<any>({});
  const [editedPurchaseMethRowData, setEditedPurchaseMethRowData] = useState<any>({});
  const [editedQuantityRowData, setEditedQuantityIdRowData] = useState<any>({});
  const [editedStatedValRowData, setEditedStatedValRowData] = useState<any>({});
  const [editedRoomNameRowData, setEditedRoomNameRowData] = useState<any>({});
  const [editedRoomTypeRowData, setEditedRoomTypeRowData] = useState<any>({});
  const [editedTotalCostRowData, setEditedTotalCostRowData] = useState<any>({});
  const [editedCategoryRowData, setEditedCategoryRowData] = useState<any>({});
  const [editedSubCatRowData, setEditedSubCatRowData] = useState<any>({});
  const [editableRowId, setEditableRowId] = useState<number | null>(null);

  type ExcelTableData = {
    id: number;
    brand: string | null;
    model: string | null;
    description: string;
    ageInYear: number | null;
    ageInMonth: number | null;
    condition: string | null;
    purchasedFrom: string | null;
    purchasedMethod: string | null;
    quantity: string | null;
    statedValue: number;
    roomType: string | null;
    roomName: string | null;
    totalCost: number;
    category: string | null;
    subCategory: string | null;
    action: () => void;
  };

  // useEffect(() => {
  //   console.log('Updated:', postLossItemDetails);
  // }, [postLossItemDetails]);
  // const handleEditRowClick = (rowId: number) => {
  //   // const rowToEdit = postLossItemDetails.find((row) => row.id === rowId);
  //   setEditableRowId(rowId);
  // };

  const handleSaveRow = () => {
    // const rowId = editableRowId  ;
    console.log("Beforeeeeeee", {
      editedBrandRowData,
      editedAgeYearRowData,
      editedRowData,
    });
    console.log("editabeeeeeeeeee", editableRowId);
    const updatedPostLossItemDetails = postLossItemDetails.map((row) =>
      editableRowId === row.id
        ? {
            // ...row,
            id: row.id,
            // editableRowId,
            brand: editedBrandRowData.brand || row.brand,
            ageInYear: editedAgeYearRowData.ageInYear || row.ageInYear,
            ageInMonth: editedRowData.ageInMonth || row.ageInMonth,
            model: editedModelRowData.model || row.model,
            description: editedDescRowData.description || row.description,
            condition: editedConditionRowData.condition || row.condition,
            purchasedFrom: editedPurchaseFromRowData.purchasedFrom || row.purchasedFrom,
            purchasedMethod:
              editedPurchaseMethRowData.purchasedMethod || row.purchasedMethod,
            quantity: editedQuantityRowData.quantity || row.quantity,
            statedValue: editedStatedValRowData.statedValue || row.statedValue,
            roomType: editedRoomTypeRowData.roomType || row.roomType,
            roomName: editedRoomNameRowData.roomName || row.roomName,
            totalCost: editedTotalCostRowData.totalCost || row.totalCost,
            category: editedCategoryRowData.category || row.category,
            subCategory: editedSubCatRowData.subCategory || row.subCategory,
          }
        : row
    );
    console.log("Afterrrrrrrrrrrr", updatedPostLossItemDetails);
    setExcelCsvUploadData({
      postLossItemDetails: updatedPostLossItemDetails,
      rowsProcessed: 0,
      message: "",
      status: 0,
    });
    setEditableRowId(null);
    setEditedBrandRowData({});
    setEditedAgeYearRowData({});
    setEditedCategoryRowData({});
    setEditedConditionRowData({});
    setEditedDescRowData({});
    setEditedModelRowData({});
    setEditedPurchaseFromRowData({});
    setEditedPurchaseMethRowData({});
    setEditedQuantityIdRowData({});
    setEditedRoomNameRowData({});
    setEditedRoomTypeRowData({});
    setEditedStatedValRowData({});
    setEditedSubCatRowData({});
    setEditedTotalCostRowData({});
  };

  const handleEditRowClick = (rowId: number) => {
    setEditableRowId(rowId);
  };

  const columnHelper = createColumnHelper<ExcelTableData>();

  const columns = [
    // columnHelper.accessor("id", {
    //   header: "Sl No #",
    //   cell: (info) => {
    //     return editableRowId === info.row.original.id ? (
    //       <input
    //         type="text"
    //         style={{ width: "60px", height: "25px" }}
    //         // disabled
    //         readOnly
    //         value={
    //             info.row.original.id
    //         }
    //         // onChange={(e) =>
    //         //   setEditedIdRowData({ ...editedIdRowData, id: e.target.value })
    //         // }
    //       />
    //     ) : (
    //       info.getValue()
    //     );
    //   },
    //   enableSorting: true,
    // }),
    columnHelper.accessor("id", {
      // id: "Claim_Number",
      header: "Sl No #",
      cell: (info) => info.getValue(),
      enableSorting: true,
      enableColumnFilter: false,
    }),
    columnHelper.accessor("brand", {
      header: "Brand",
      cell: (info) => {
        console.log("editableRowId:", editableRowId);
        console.log("info.row.original.id:", info.row.original.id);

        return editableRowId === info.row.original.id ? (
          <input
            type="text"
            style={{ width: "60px", height: "25px" }}
            value={
              editedBrandRowData.brand !== undefined
                ? editedBrandRowData.brand
                : info.row.original.brand || ""
            }
            onChange={(e) =>
              setEditedBrandRowData({ ...editedBrandRowData, brand: e.target.value })
            }
          />
        ) : (
          info.getValue()
        );
      },
      enableSorting: true,
    }),

    columnHelper.accessor("model", {
      header: "Model",
      cell: (info) => {
        console.log("editableRowId:", editableRowId);
        console.log("info.row.original.id:", info.row.original.id);

        return editableRowId === info.row.original.id ? (
          <input
            type="text"
            style={{ width: "60px", height: "25px" }}
            value={
              editedModelRowData.model !== undefined
                ? editedModelRowData.model
                : info.row.original.model || ""
            }
            onChange={(e) =>
              setEditedModelRowData({ ...editedModelRowData, model: e.target.value })
            }
          />
        ) : (
          info.getValue()
        );
      },
      enableSorting: true,
    }),

    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => {
        console.log("editableRowId:", editableRowId);
        console.log("info.row.original.id:", info.row.original.id);

        return editableRowId === info.row.original.id ? (
          <input
            type="text"
            style={{ width: "60px", height: "25px" }}
            value={
              editedDescRowData.description !== undefined
                ? editedDescRowData.description
                : info.row.original.description || ""
            }
            onChange={(e) =>
              setEditedDescRowData({ ...editedDescRowData, description: e.target.value })
            }
          />
        ) : (
          info.getValue()
        );
      },
      enableSorting: true,
    }),

    columnHelper.accessor("ageInYear", {
      header: "Age In Year",
      cell: (info) => {
        console.log("editableRowId:", editableRowId);
        console.log("info.row.original.id:", info.row.original.id);

        return editableRowId === info.row.original.id ? (
          <input
            type="text"
            style={{ width: "60px", height: "25px" }}
            value={
              editedAgeYearRowData.ageInYear !== undefined
                ? editedAgeYearRowData.ageInYear
                : info.row.original.ageInYear || ""
            }
            onChange={(e) =>
              setEditedAgeYearRowData({
                ...editedAgeYearRowData,
                ageInYear: e.target.value,
              })
            }
          />
        ) : (
          info.getValue()
        );
      },
      enableSorting: true,
    }),

    columnHelper.accessor("ageInMonth", {
      header: "Age In Month",
      cell: (info) => {
        console.log("editableRowId:", editableRowId);
        console.log("info.row.original.id:", info.row.original.id);

        return editableRowId === info.row.original.id ? (
          <input
            type="text"
            style={{ width: "60px", height: "25px" }}
            value={
              editedRowData.ageInMonth !== undefined
                ? editedRowData.ageInMonth
                : info.row.original.ageInMonth || ""
            }
            onChange={(e) =>
              setEditedRowData({ ...editedRowData, ageInMonth: e.target.value })
            }
          />
        ) : (
          info.getValue()
        );
      },
      enableSorting: true,
    }),
    columnHelper.accessor("condition", {
      header: "Condition",
      cell: (info) => {
        console.log("editableRowId:", editableRowId);
        console.log("info.row.original.id:", info.row.original.id);

        return editableRowId === info.row.original.id ? (
          <input
            type="text"
            style={{ width: "60px", height: "25px" }}
            value={
              editedConditionRowData.condition !== undefined
                ? editedConditionRowData.condition
                : info.row.original.condition || ""
            }
            onChange={(e) =>
              setEditedConditionRowData({
                ...editedConditionRowData,
                condition: e.target.value,
              })
            }
          />
        ) : (
          info.getValue()
        );
      },
      enableSorting: true,
    }),
    columnHelper.accessor("purchasedFrom", {
      header: "Purchased From",
      cell: (info) => {
        console.log("editableRowId:", editableRowId);
        console.log("info.row.original.id:", info.row.original.id);
        return editableRowId === info.row.original.id ? (
          <input
            type="text"
            style={{ width: "60px", height: "25px" }}
            value={
              editedPurchaseFromRowData.purchasedFrom !== undefined
                ? editedPurchaseFromRowData.purchasedFrom
                : info.row.original.purchasedFrom || ""
            }
            onChange={(e) =>
              setEditedPurchaseFromRowData({
                ...editedPurchaseFromRowData,
                purchasedFrom: e.target.value,
              })
            }
          />
        ) : (
          info.getValue()
        );
      },
      enableSorting: true,
    }),
    columnHelper.accessor("purchasedMethod", {
      header: "Purchased Method",
      cell: (info) => {
        console.log("editableRowId:", editableRowId);
        console.log("info.row.original.id:", info.row.original.id);

        return editableRowId === info.row.original.id ? (
          <input
            type="text"
            style={{ width: "60px", height: "25px" }}
            value={
              editedPurchaseMethRowData.purchasedMethod !== undefined
                ? editedPurchaseMethRowData.purchasedMethod
                : info.row.original.purchasedMethod || ""
            }
            onChange={(e) =>
              setEditedPurchaseMethRowData({
                ...editedPurchaseMethRowData,
                purchasedMethod: e.target.value,
              })
            }
          />
        ) : (
          info.getValue()
        );
      },
      enableSorting: true,
    }),
    columnHelper.accessor("quantity", {
      header: "Quantity",
      cell: (info) => {
        console.log("editableRowId:", editableRowId);
        console.log("info.row.original.id:", info.row.original.id);

        return editableRowId === info.row.original.id ? (
          <input
            type="text"
            style={{ width: "60px", height: "25px" }}
            value={
              editedQuantityRowData.quantity !== undefined
                ? editedQuantityRowData.quantity
                : info.row.original.quantity || ""
            }
            onChange={(e) =>
              setEditedQuantityIdRowData({
                ...editedQuantityRowData,
                quantity: e.target.value,
              })
            }
          />
        ) : (
          info.getValue()
        );
      },
      enableSorting: true,
    }),
    columnHelper.accessor("statedValue", {
      header: "Stated Value",
      cell: (info) => {
        console.log("editableRowId:", editableRowId);
        console.log("info.row.original.id:", info.row.original.id);
        return editableRowId === info.row.original.id ? (
          <input
            type="text"
            style={{ width: "60px", height: "25px" }}
            value={
              editedStatedValRowData.statedValue !== undefined
                ? editedStatedValRowData.statedValue
                : info.row.original.statedValue || ""
            }
            onChange={(e) =>
              setEditedStatedValRowData({
                ...editedStatedValRowData,
                statedValue: e.target.value,
              })
            }
          />
        ) : (
          info.getValue()
        );
      },
      enableSorting: true,
    }),
    columnHelper.accessor("roomType", {
      header: "Room Type",
      cell: (info) => {
        console.log("editableRowId:", editableRowId);
        console.log("info.row.original.id:", info.row.original.id);
        return editableRowId === info.row.original.id ? (
          <input
            type="text"
            style={{ width: "60px", height: "25px" }}
            value={
              editedRoomTypeRowData.roomType !== undefined
                ? editedRoomTypeRowData.roomType
                : info.row.original.roomType || ""
            }
            onChange={(e) =>
              setEditedRoomTypeRowData({
                ...editedRoomTypeRowData,
                roomType: e.target.value,
              })
            }
          />
        ) : (
          info.getValue()
        );
      },
      enableSorting: true,
    }),
    columnHelper.accessor("roomName", {
      header: "Room Name",
      cell: (info) => {
        console.log("editableRowId:", editableRowId);
        console.log("info.row.original.id:", info.row.original.id);

        return editableRowId === info.row.original.id ? (
          <input
            type="text"
            style={{ width: "60px", height: "25px" }}
            value={
              editedRoomNameRowData.roomName !== undefined
                ? editedRoomNameRowData.roomName
                : info.row.original.roomName || ""
            }
            onChange={(e) =>
              setEditedRoomNameRowData({
                ...editedRoomNameRowData,
                roomName: e.target.value,
              })
            }
          />
        ) : (
          info.getValue()
        );
      },
      enableSorting: true,
    }),
    columnHelper.accessor("totalCost", {
      header: "Total Cost",
      cell: (info) => {
        console.log("editableRowId:", editableRowId);
        console.log("info.row.original.id:", info.row.original.id);

        return editableRowId === info.row.original.id ? (
          <input
            type="text"
            style={{ width: "60px", height: "25px" }}
            value={
              editedTotalCostRowData.totalCost !== undefined
                ? editedTotalCostRowData.totalCost
                : info.row.original.totalCost || ""
            }
            onChange={(e) =>
              setEditedTotalCostRowData({
                ...editedTotalCostRowData,
                totalCost: e.target.value,
              })
            }
          />
        ) : (
          info.getValue()
        );
      },
      enableSorting: true,
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: (info) => {
        console.log("editableRowId:", editableRowId);
        console.log("info.row.original.id:", info.row.original.id);

        return editableRowId === info.row.original.id ? (
          <input
            type="text"
            style={{ width: "60px", height: "25px" }}
            value={
              editedCategoryRowData.category !== undefined
                ? editedCategoryRowData.category
                : info.row.original.category || ""
            }
            onChange={(e) =>
              setEditedCategoryRowData({
                ...editedCategoryRowData,
                category: e.target.value,
              })
            }
          />
        ) : (
          info.getValue()
        );
      },
      enableSorting: true,
    }),
    columnHelper.accessor("subCategory", {
      header: "Sub Category",
      cell: (info) => {
        console.log("editableRowId:", editableRowId);
        console.log("info.row.original.id:", info.row.original.id);

        return editableRowId === info.row.original.id ? (
          <input
            type="text"
            style={{ width: "60px", height: "25px" }}
            value={
              editedSubCatRowData.subCategory !== undefined
                ? editedSubCatRowData.subCategory
                : info.row.original.subCategory || ""
            }
            onChange={(e) =>
              setEditedSubCatRowData({
                ...editedSubCatRowData,
                subCategory: e.target.value,
              })
            }
          />
        ) : (
          info.getValue()
        );
      },
      enableSorting: true,
    }),
    columnHelper.accessor("action", {
      header: "Action",
      cell: (info) => {
        // const isEditable = editableRowId === info.row.original.id;

        return editableRowId === info.row.original.id ? (
          <>
            <button
              className={ExcelSheetTableStyle.saveButton}
              onClick={() => handleSaveRow()}
            >
              Save
            </button>
            <button
              className={ExcelSheetTableStyle.cancelButton}
              // onClick={() => handleCancelEdit()}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className={ExcelSheetTableStyle.removeButton}
              // onClick={() => handleRemoveRow(info.row.original.id)}
            >
              Remove
            </button>
          </>
        );
      },
      enableSorting: false,
    }),
  ];

  const data = React.useMemo(() => postLossItemDetails, [postLossItemDetails]);
  console.log("dddd", data);

  const table = useReactTable({
    data: postLossItemDetails,
    columns,
    enableColumnFilters: false,
    getCoreRowModel: getCoreRowModel<ExcelTableData>(),
  });

  return (
    <>
      <CustomReactTable table={table} handleEditRowClick={handleEditRowClick} />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  postLossItemDetails: state.excelCsvUpload.postLossItemDetails,
});

const mapDispatchToProps = {
  setExcelCsvUploadData,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(ExcelSheetTable);
