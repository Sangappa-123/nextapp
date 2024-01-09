import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddItemsTableState {
  addItemsTableData: any[];
  selectedItems: any[];
  isAnyItemSelected: boolean;
  selectedRows: any[];
  categories: any[];
  selectedCategory: string;
  searchKeyword: string;
  categoryRows: any[];
  editItemDetail: object;
  previousItem: boolean;
  nextItem: boolean;
}

const initialState: AddItemsTableState = {
  addItemsTableData: [],
  selectedItems: [],
  isAnyItemSelected: false,
  selectedRows: [],
  categories: [],
  selectedCategory: "",
  searchKeyword: "",
  categoryRows: [],
  editItemDetail: {},
  previousItem: false,
  nextItem: false,
};

const AddItemsTableCSVSlice = createSlice({
  name: "addItemsTable",
  initialState,
  reducers: {
    setAddItemsTableData: (state, action: PayloadAction<any[]>) => {
      state.addItemsTableData = action.payload;
    },
    setSelectedItems: (state, action: PayloadAction<any[]>) => {
      state.selectedItems = action.payload;
      state.isAnyItemSelected = action.payload.length > 0;
    },
    setSelectedRows: (state, action: PayloadAction<any[]>) => {
      state.selectedRows = [...state.selectedRows, ...action.payload];
    },
    setCategoryRows: (state, action: PayloadAction<any[]>) => {
      state.categoryRows = [...action.payload];
    },
    setCategories: (state, action: PayloadAction<any[]>) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
    },
    deleteCategoryListItem: (state, action: PayloadAction<any>) => {
      const itemIdToDelete = action.payload.id;
      state.addItemsTableData = state.addItemsTableData.filter(
        (item) => item.id !== itemIdToDelete
      );
    },
    addEditItemDetails(state, action) {
      const { payload } = action;
      console.log("sssssssssssssssssss", payload);
      const { itemDetailData, previousItem, nextItem } = payload;
      const itemData = {
        claimId: itemDetailData.claimId,
        itemId: itemDetailData.id,
        itemUID: itemDetailData.itemUID,
        itemNumber: itemDetailData.itemNumber,
        description: itemDetailData.description,
        quantity: itemDetailData.quantity,
        insuredPrice: itemDetailData.insuredPrice,
        category: itemDetailData.category
          ? {
              categoryId: itemDetailData.category?.id,
              categoryName: itemDetailData.category?.name,
            }
          : null,
        subCategory: itemDetailData.subCategory,
        ageYears: itemDetailData.ageYears,
        ageMonths: itemDetailData.ageMonths,
        applyTax: itemDetailData.applyTax,
        room: itemDetailData.room,
        condition: itemDetailData.condition,
        originallyPurchasedFrom: itemDetailData.originallyPurchasedFrom,
        isScheduledItem: itemDetailData.isScheduledItem,
        scheduleAmount: itemDetailData.scheduleAmount,
        attachments: itemDetailData.attachments,
      };
      console.log("ssssssssssssssss", itemData);
      state.editItemDetail = itemData;
      state.previousItem = previousItem;
      state.nextItem = nextItem;
    },
    // addEditItemDetaill(state, action) {
    //   const { payload } = action;
    //   const { itemDetailData, previousItem, nextItem } = payload;

    //   const itemData = {
    //     claimId: itemDetailData.claimId,
    //     itemId: itemDetailData.id,
    //     itemUID: itemDetailData.itemUID,
    //     itemNumber: itemDetailData.itemNumber,
    //     description: itemDetailData.description,
    //     quantity: itemDetailData.quantity,
    //     insuredPrice: itemDetailData.insuredPrice,
    //     category: itemDetailData.category
    //       ? {
    //           categoryId: itemDetailData.category?.id,
    //           categoryName: itemDetailData.category?.name,
    //         }
    //       : null,
    //     subCategory: itemDetailData.subCategory,
    //     ageYears: itemDetailData.ageYears,
    //     ageMonths: itemDetailData.ageMonths,
    //     applyTax: itemDetailData.applyTax,
    //     room: itemDetailData.room,
    //     condition: itemDetailData.condition,
    //     originallyPurchasedFrom: itemDetailData.originallyPurchasedFrom,
    //     isScheduledItem: itemDetailData.isScheduledItem,
    //     scheduleAmount: itemDetailData.scheduleAmount,
    //     attachments: itemDetailData.attachments,
    //     selected: false,
    //   };
    //   state.editItemDetail = itemData;
    //   state.previousItem = previousItem;
    //   state.nextItem = nextItem;
    // },
  },
});

export const {
  setAddItemsTableData,
  setSelectedItems,
  setSelectedRows,
  setSearchKeyword,
  deleteCategoryListItem,
  setCategoryRows,
  setCategories,
  setSelectedCategory,
  addEditItemDetails,
  // addEditItemDetaill
} = AddItemsTableCSVSlice.actions;
export default AddItemsTableCSVSlice;
