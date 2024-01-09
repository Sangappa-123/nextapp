import React from "react";
import orginalItemFormStyle from "./orginalItemForm.module.scss";
import clsx from "clsx";
import GenericInput from "@/components/common/GenericInput";
import GenericSelect from "@/components/common/GenericSelect";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "@/store/store";
import { Controller } from "react-hook-form";
import EnumStoreSlice from "@/reducers/EnumStoreSlice";
import { fetchSubCategory } from "@/reducers/LineItemDetail/LineItemThunkService";
import {
  updateLineItem,
  updateOnCategoryChange,
  updateOnSubCategoryChange,
} from "@/reducers/LineItemDetail/LineItemDetailSlice";
import useDebounce from "@/hooks/useDebounce";
import { unknownObjectType } from "@/constants/customTypes";

interface propType {
  register: any;
  control: any;
  getValues: any;
  setValue: any;
}

const OrginalItemForm: React.FC<propType & connectorType> = (props) => {
  const {
    lineItem,
    category,
    subCategory,
    condition,
    room,
    retailer,
    paymentTypes,
    register,
    control,
    getValues,
    setValue,
    fetchSubCategory,
    updateOnCategoryChange,
    updateOnSubCategoryChange,
    updateLineItem,
  } = props;

  const debounce = useDebounce(updateLineItem, 500);

  const { onChange: quantityOnChange, ...quantityRegister } = register("quantity");
  const { onChange: insuredPriceOnChange, ...insuredPriceRegister } =
    register("insuredPrice");

  const updateTotalStatedAmount = () => {
    const [insuredPrice, quantity] = getValues(["insuredPrice", "quantity"]);
    setValue("totalStatedAmount", (insuredPrice ?? 0) * (quantity ?? 0));
  };

  return (
    <div className={orginalItemFormStyle.root}>
      <div className={orginalItemFormStyle.heading}>Original Item</div>
      <div className={orginalItemFormStyle.formContainer}>
        <div className={clsx(orginalItemFormStyle.formGroup, orginalItemFormStyle.row1)}>
          <label htmlFor="itemDesc" className={orginalItemFormStyle.label}>
            Original Item Description
          </label>
          <textarea
            id="itemDesc"
            className={orginalItemFormStyle.textarea}
            placeholder="Description"
            {...register("description")}
            onChange={(e: React.FocusEvent<HTMLInputElement>) =>
              debounce({ description: e.target.value ?? "" })
            }
          />
        </div>
        <div
          className={clsx(
            orginalItemFormStyle.formGroup,
            orginalItemFormStyle.row1,
            orginalItemFormStyle.categoryDiv
          )}
        >
          <div className={orginalItemFormStyle.categorySelect}>
            <div className={orginalItemFormStyle.formControl}>
              <label htmlFor="category" className={orginalItemFormStyle.label}>
                Category
              </label>
              <GenericSelect
                menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                id="category"
                value={
                  lineItem?.category
                    ? {
                        categoryId: lineItem?.category?.id,
                        categoryName: lineItem?.category?.name,
                      }
                    : null
                }
                options={category}
                getOptionLabel={(option: { categoryName: any }) => option.categoryName}
                getOptionValue={(option: { categoryId: any }) => option.categoryId}
                onChange={(e: {
                  categoryId: number;
                  categoryName: string;
                  noOfItems: number;
                }) => {
                  if (e !== null) {
                    fetchSubCategory(e.categoryId);
                  }
                  updateOnCategoryChange(e);
                }}
              />
            </div>
            <div className={orginalItemFormStyle.formControl}>
              <label htmlFor="subCategory" className={orginalItemFormStyle.label}>
                Sub-Category
              </label>
              <GenericSelect
                menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                id="subCategory"
                value={lineItem.subCategory}
                options={subCategory}
                getOptionLabel={(option: { name: string }) => option.name}
                getOptionValue={(option: { id: number }) => option.id}
                onChange={(
                  e: {
                    id: number;
                    name: string;
                  } | null
                ) => {
                  updateOnSubCategoryChange(e);
                }}
              />
            </div>
          </div>
          <div className={orginalItemFormStyle.standardReplacement}>
            <div>Standard Replacement</div>
            <div>$0.00</div>
          </div>
        </div>
        <div className={orginalItemFormStyle.formGroup}>
          <label htmlFor="cost_per_unit" className={orginalItemFormStyle.label}>
            Cost Per Unit
          </label>
          <GenericInput
            id="cost_per_unit"
            labelClassname={orginalItemFormStyle.label}
            placeholder="Stated Value(per unit)"
            onChange={(e: any) => {
              insuredPriceOnChange(e);
              updateTotalStatedAmount();
              debounce({ insuredPrice: +(e.target.value ?? 0) });
            }}
            {...insuredPriceRegister}
          />
        </div>
        <div className={orginalItemFormStyle.formGroup}>
          <label htmlFor="qty_lost" className={orginalItemFormStyle.label}>
            Qty Lost / Damaged
          </label>
          <GenericInput
            id="qty_lost"
            labelClassname={orginalItemFormStyle.label}
            placeholder="Quantity"
            onChange={(e: React.FocusEvent<HTMLInputElement>) => {
              quantityOnChange(e);
              updateTotalStatedAmount();
            }}
            {...quantityRegister}
          />
        </div>
        <div className={orginalItemFormStyle.formGroup}>
          <label htmlFor="total_lost" className={orginalItemFormStyle.label}>
            Total Cost
          </label>
          <GenericInput
            id="total_lost"
            labelClassname={orginalItemFormStyle.label}
            disabled={true}
            {...register("totalStatedAmount")}
          />
        </div>
        <div className={clsx(orginalItemFormStyle.itemAge)}>
          <label className={orginalItemFormStyle.label}>Age of Item</label>
          <div className={orginalItemFormStyle.itemAgeFormGroup}>
            <GenericInput
              label="(Years)"
              formControlClassname={orginalItemFormStyle.itemAgeFormControl}
              inputFieldWrapperClassName={orginalItemFormStyle.inputFieldWrapper}
              {...register("ageYears")}
              onChange={(e: React.FocusEvent<HTMLInputElement>) =>
                debounce({ ageYears: +(e.target.value ?? 0) })
              }
            />
            <GenericInput
              label="(Months)"
              type="number"
              formControlClassname={orginalItemFormStyle.itemAgeFormControl}
              inputFieldWrapperClassName={orginalItemFormStyle.inputFieldWrapper}
              {...register("ageMonths")}
              onChange={(e: React.FocusEvent<HTMLInputElement>) => {
                const month = e.target.value;
                debounce({ ageMonths: +(month ?? 0) });
              }}
            />
          </div>
        </div>
        <div className={orginalItemFormStyle.tax}>
          <label className={orginalItemFormStyle.label}>
            Apply Taxes({lineItem?.taxRate}%)
          </label>
          <div className={orginalItemFormStyle.taxFormGroup}>
            <GenericInput
              type="radio"
              label="Yes"
              value="yes"
              name="applyTax"
              checked={lineItem?.applyTax}
              formControlClassname={orginalItemFormStyle.radioFormControl}
              inputFieldWrapperClassName={orginalItemFormStyle.inputWrapper}
            />
            <GenericInput
              type="radio"
              label="No"
              value="no"
              name="applyTax"
              checked={!lineItem?.applyTax}
              formControlClassname={orginalItemFormStyle.radioFormControl}
              inputFieldWrapperClassName={orginalItemFormStyle.inputWrapper}
            />
          </div>
        </div>
        <div className={orginalItemFormStyle.formGroup}>
          <GenericInput
            label="Brand / Manufacturer"
            placeholder="Brand"
            labelClassname={orginalItemFormStyle.label}
            {...register("brand")}
          />
        </div>
        <div className={orginalItemFormStyle.formGroup}>
          <GenericInput
            label="Model"
            labelClassname={orginalItemFormStyle.label}
            placeholder="Model"
            {...register("model")}
          />
        </div>
        <div
          className={clsx(
            orginalItemFormStyle.formGroup,
            orginalItemFormStyle.startFromCol1
          )}
        >
          <label htmlFor="purchasedFrom" className={orginalItemFormStyle.label}>
            Purchased From
          </label>
          <Controller
            name="originallyPurchasedFrom"
            control={control}
            render={({ field }: any) => (
              <GenericSelect
                menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                id="originallyPurchasedFrom"
                options={retailer}
                getOptionLabel={(option: { name: string }) => option.name}
                getOptionValue={(option: { id: number }) => option.id}
                {...field}
              />
            )}
          />
        </div>
        <div className={orginalItemFormStyle.formGroup}>
          <label htmlFor="purchasedMethod" className={orginalItemFormStyle.label}>
            Purchased Method
          </label>
          <Controller
            name="purchaseMethod"
            control={control}
            render={({ field }: any) => (
              <GenericSelect
                menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                id="purchaseMethod"
                options={paymentTypes}
                {...field}
              />
            )}
          />
        </div>
        <div
          className={clsx(
            orginalItemFormStyle.formGroup,
            orginalItemFormStyle.startFromCol1
          )}
        >
          <label htmlFor="condition" className={orginalItemFormStyle.label}>
            Condition
          </label>
          <GenericSelect
            menuPortalTarget={typeof window !== "undefined" ? document.body : null}
            id="condition"
            value={lineItem?.condition}
            options={condition}
            getOptionLabel={(option: { conditionName: any }) => option.conditionName}
            getOptionValue={(option: { conditionId: any }) => option.conditionId}
            onChange={(e: unknownObjectType) => {
              updateLineItem({ condition: e });
            }}
          />
        </div>
        <div className={orginalItemFormStyle.formGroup}>
          <label htmlFor="room" className={orginalItemFormStyle.label}>
            Room
          </label>
          <Controller
            name="room"
            control={control}
            render={({ field }: any) => (
              <GenericSelect
                menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                id="room"
                options={room}
                getOptionLabel={(option: { roomName: any }) => option.roomName}
                getOptionValue={(option: { id: any }) => option.id}
                {...field}
              />
            )}
          />
        </div>
        <div
          className={clsx(
            orginalItemFormStyle.formGroup,
            orginalItemFormStyle.scheduledItem
          )}
        >
          <label className={orginalItemFormStyle.label}>Scheduled Item</label>
          <div className={orginalItemFormStyle.scheduledItemFormGroup}>
            <GenericInput
              type="radio"
              label="Yes"
              value="yes"
              name="scheduledItem"
              checked={lineItem?.isScheduledItem}
              formControlClassname={orginalItemFormStyle.radioFormControl}
              inputFieldWrapperClassName={orginalItemFormStyle.inputWrapper}
            />
            <GenericInput
              type="radio"
              label="No"
              value="no"
              name="scheduledItem"
              checked={!lineItem?.isScheduledItem}
              formControlClassname={orginalItemFormStyle.radioFormControl}
              inputFieldWrapperClassName={orginalItemFormStyle.inputWrapper}
            />
          </div>
        </div>
        <div
          className={clsx(
            orginalItemFormStyle.formGroup,
            orginalItemFormStyle.startFromCol1
          )}
        >
          <label className={orginalItemFormStyle.label}>Pictures, Recipts etc.</label>
          <a href="#">Click to add attachment(s)</a>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  lineItem: state[EnumStoreSlice.LINE_ITEM_DETAIL]?.lineItem,
  category: state[EnumStoreSlice.LINE_ITEM_DETAIL].category,
  condition: state[EnumStoreSlice.LINE_ITEM_DETAIL].condition,
  subCategory: state[EnumStoreSlice.LINE_ITEM_DETAIL].subCategory,
  room: state[EnumStoreSlice.LINE_ITEM_DETAIL].room,
  retailer: state[EnumStoreSlice.LINE_ITEM_DETAIL].retailer,
  paymentTypes: state[EnumStoreSlice.LINE_ITEM_DETAIL].paymentTypes,
});

const mapDispatchToProps = {
  fetchSubCategory,
  updateOnCategoryChange,
  updateLineItem,
  updateOnSubCategoryChange,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(OrginalItemForm);
