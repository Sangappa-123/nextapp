import { createSelector } from "@reduxjs/toolkit";
import selectLineItem from "./selectLineItem";
import selectSubCategory from "./selectSubCategory";
import { unknownObjectType } from "@/constants/customTypes";

const selectSelectedSubCategory = createSelector(
  selectLineItem,
  selectSubCategory,
  (lineItem, subCategoryList) => {
    const category = subCategoryList?.filter(
      (item: unknownObjectType) => item?.id === lineItem.subCategory.id
    );
    return category?.[0] ?? null;
  }
);

export default selectSelectedSubCategory;
