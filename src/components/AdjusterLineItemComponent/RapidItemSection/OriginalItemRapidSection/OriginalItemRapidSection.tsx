import React, { useState } from "react";
import GenericSelect from "@/components/common/GenericSelect";
import originalItemRapidSectionStyle from "./originalItemRapidSection.module.scss";
import clsx from "clsx";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "@/store/store";
import selectRapidOriginalData from "@/reducers/LineItemDetail/Selectors/selectRapidOriginalData";
import EnumStoreSlice from "@/reducers/EnumStoreSlice";
import {
  updateOnCategoryChange,
  updateOnSubCategoryChange,
} from "@/reducers/LineItemDetail/LineItemDetailSlice";
import { OriginalItemRefType } from "../../LineItemDetailComponent/OrginalItemForm/OrginalItemForm";
import { fetchSubCategory } from "@/reducers/LineItemDetail/LineItemThunkService";

interface CategoryType {
  categoryId: number;
  categoryName: string;
}

interface subCategoryType {
  id: number;
  name: string;
}

interface propsType {
  originalItemRef: OriginalItemRefType | null;
}

const OriginalItemRapidSection: React.FC<connectorType & propsType> = (props) => {
  const {
    rapidData,
    category,
    subCategory,
    updateOnCategoryChange,
    originalItemRef,
    fetchSubCategory,
    updateOnSubCategoryChange,
  } = props;
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>({
    categoryId: rapidData?.selectedCategory?.id,
    categoryName: rapidData?.selectedCategory?.name,
  });
  const [selectedSubCategory, setSelectedSubCategory] = useState<subCategoryType | null>({
    id: rapidData?.selectedSubCategory?.id,
    name: rapidData?.selectedSubCategory?.name,
  });
  const handleCategorySelect = (e: CategoryType | null) => {
    if (e !== null) {
      fetchSubCategory(e.categoryId); //fetch new sub-category
    }
    setSelectedCategory(e);
    updateOnCategoryChange(e);
    setSelectedSubCategory(null);
    originalItemRef?.onRapidSubCategoryChange(null);
    originalItemRef?.onRapidCategoryChange(e);
  };
  const handleSubCategorySelect = (e: subCategoryType) => {
    setSelectedSubCategory(e);
    updateOnSubCategoryChange(e);
    originalItemRef?.onRapidSubCategoryChange(e);
  };

  return (
    <div className={originalItemRapidSectionStyle.root}>
      <h5 className={originalItemRapidSectionStyle.heading}>Original Item</h5>
      <div>{rapidData?.description}</div>
      <div className={originalItemRapidSectionStyle.content}>
        <div className={clsx(originalItemRapidSectionStyle.leftSideDiv)}>
          <label>Age</label>
          <div>{`${rapidData?.ageYears} Yrs ${rapidData?.ageMonths} Months`}</div>
          <label>Cost Per Unit</label>
          <div>${rapidData?.insuredPrice}</div>
        </div>
        <div className={originalItemRapidSectionStyle.rightSideDiv}>
          <div className={originalItemRapidSectionStyle.selectBox}>
            <label htmlFor="category">Category</label>
            <GenericSelect
              id="category"
              value={selectedCategory}
              options={category}
              getOptionLabel={(option: { categoryName: any }) => option.categoryName}
              getOptionValue={(option: { categoryId: any }) => option.categoryId}
              onChange={handleCategorySelect}
            />
          </div>
          <div className={originalItemRapidSectionStyle.selectBox}>
            <label htmlFor="subCategory">Sub-Category</label>
            <GenericSelect
              id="subCategory"
              value={selectedSubCategory}
              options={subCategory}
              getOptionLabel={(option: { name: string }) => option.name}
              getOptionValue={(option: { id: number }) => option.id}
              onChange={handleSubCategorySelect}
            />
          </div>
          <div className={originalItemRapidSectionStyle.selectBox}>
            <label htmlFor="category">Condition</label>
            <GenericSelect id="category" />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  rapidData: selectRapidOriginalData(state),
  category: state[EnumStoreSlice.LINE_ITEM_DETAIL].category,
  subCategory: state[EnumStoreSlice.LINE_ITEM_DETAIL].subCategory,
});

const mapDispatchToProps = {
  updateOnCategoryChange,
  fetchSubCategory,
  updateOnSubCategoryChange,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;

export default connector(OriginalItemRapidSection);
