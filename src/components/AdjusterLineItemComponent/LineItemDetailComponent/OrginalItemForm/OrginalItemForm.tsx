import React from "react";
import orginalItemFormStyle from "./orginalItemForm.module.scss";
import clsx from "clsx";
import GenericInput from "@/components/common/GenericInput";
import GenericSelect from "@/components/common/GenericSelect";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "@/store/store";
import { Controller } from "react-hook-form";

interface originalItemTyped {
  register: any;
  control: any;
}

const OrginalItemForm: React.FC<connectorType & originalItemTyped> = (props) => {
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
  } = props;

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
            // value={lineItem?.description}
            {...register("description")}
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
              <Controller
                name="category"
                control={control}
                render={({ field }: any) => (
                  <GenericSelect
                    id="category"
                    options={category}
                    getOptionLabel={(option: { categoryName: any }) =>
                      option.categoryName
                    }
                    getOptionValue={(option: { categoryId: any }) => option.categoryId}
                    {...field}
                  />
                )}
              />
              {/* <GenericSelect
                id="subCategory"
                options={category}
                getOptionLabel={(option: { categoryName: any }) => option.categoryName}
                getOptionValue={(option: { categoryId: any }) => option.categoryId}
                selected={{
                  categoryId: lineItem?.category?.id,
                  categoryName: lineItem?.category?.name,
                }}
              /> */}
            </div>
            <div className={orginalItemFormStyle.formControl}>
              <label htmlFor="subCategory" className={orginalItemFormStyle.label}>
                Sub-Category
              </label>
              <Controller
                name="subCategory"
                control={control}
                render={({ field }: any) => (
                  <GenericSelect
                    id="subCategory"
                    options={subCategory}
                    getOptionLabel={(option: { name: string }) => option.name}
                    getOptionValue={(option: { id: number }) => option.id}
                    {...field}
                  />
                )}
              />
              {/* <GenericSelect
                id="subCategory"
                options={subCategory}
                getOptionLabel={(option: { name: string }) => option.name}
                getOptionValue={(option: { id: number }) => option.id}
                selected={{
                  id: lineItem?.subCategory?.id,
                  name: lineItem?.subCategory?.name,
                }}
              /> */}
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
            // value={lineItem?.insuredPrice}
            {...register("insuredPrice")}
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
            {...register("quantity")}
          />
        </div>
        <div className={orginalItemFormStyle.formGroup}>
          <label htmlFor="total_lost" className={orginalItemFormStyle.label}>
            Total Cost
          </label>
          <GenericInput
            id="total_lost"
            labelClassname={orginalItemFormStyle.label}
            // value={lineItem?.totalStatedAmount}

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
              // value={lineItem?.ageYears}
              {...register("ageYears")}
            />
            <GenericInput
              label="(Months)"
              formControlClassname={orginalItemFormStyle.itemAgeFormControl}
              inputFieldWrapperClassName={orginalItemFormStyle.inputFieldWrapper}
              // value={lineItem?.ageMonths}
              {...register("ageMonths")}
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
            // value={lineItem?.brand}
            {...register("brand")}
          />
        </div>
        <div className={orginalItemFormStyle.formGroup}>
          <GenericInput
            label="Model"
            labelClassname={orginalItemFormStyle.label}
            placeholder="Model"
            // value={lineItem?.model}
            {...register("model")}
          />
        </div>
        <div
          className={clsx(
            orginalItemFormStyle.formGroup,
            orginalItemFormStyle.startFromCol1
          )}
        >
          {/* <GenericInput
            label="Purchased From"
            labelClassname={orginalItemFormStyle.label}
          /> */}
          <label htmlFor="purchasedFrom" className={orginalItemFormStyle.label}>
            Purchased From
          </label>
          <Controller
            name="originallyPurchasedFrom"
            control={control}
            render={({ field }: any) => (
              <GenericSelect
                id="originallyPurchasedFrom"
                options={retailer}
                getOptionLabel={(option: { name: string }) => option.name}
                getOptionValue={(option: { id: number }) => option.id}
                {...field}
              />
            )}
          />
          {/* <GenericSelect
            id="purchasedFrom"
            options={retailer}
            getOptionLabel={(option: { name: any }) => option.name}
            getOptionValue={(option: { id: any }) => option.id}
          /> */}
        </div>
        <div className={orginalItemFormStyle.formGroup}>
          {/* <GenericInput
            label="Purchase Method"
            labelClassname={orginalItemFormStyle.label}
          /> */}
          <label htmlFor="purchasedMethod" className={orginalItemFormStyle.label}>
            Purchased Method
          </label>
          <Controller
            name="purchaseMethod"
            control={control}
            render={({ field }: any) => (
              <GenericSelect id="purchaseMethod" options={paymentTypes} {...field} />
            )}
          />
          {/* <GenericSelect id="purchasedMethod" options={paymentTypes} /> */}
        </div>
        <div
          className={clsx(
            orginalItemFormStyle.formGroup,
            orginalItemFormStyle.startFromCol1
          )}
        >
          {/* <GenericInput label="Condition" labelClassname={orginalItemFormStyle.label} /> */}
          <label htmlFor="condition" className={orginalItemFormStyle.label}>
            Condition
          </label>
          <Controller
            name="condition"
            control={control}
            render={({ field }: any) => (
              <GenericSelect
                id="condition"
                options={condition}
                getOptionLabel={(option: { conditionName: any }) => option.conditionName}
                getOptionValue={(option: { conditionId: any }) => option.conditionId}
                {...field}
              />
            )}
          />
          {/* <GenericSelect
            id="condition"
            options={condition}
            getOptionLabel={(option: { conditionName: any }) => option.conditionName}
            getOptionValue={(option: { conditionId: any }) => option.conditionId}
            selected={{
              conditionId: lineItem?.condition?.conditionId,
              conditionName: lineItem?.condition?.conditionName,
            }}
          /> */}
        </div>
        <div className={orginalItemFormStyle.formGroup}>
          {/* <GenericInput label="Room" labelClassname={orginalItemFormStyle.label} /> */}
          <label htmlFor="room" className={orginalItemFormStyle.label}>
            Room
          </label>
          <Controller
            name="room"
            control={control}
            render={({ field }: any) => (
              <GenericSelect
                id="room"
                options={room}
                getOptionLabel={(option: { roomName: any }) => option.roomName}
                getOptionValue={(option: { id: any }) => option.id}
                {...field}
              />
            )}
          />
          {/* <GenericSelect
            id="room"
            placeholder="Select"
            options={room}
            getOptionLabel={(option: { roomName: any }) => option.roomName}
            getOptionValue={(option: { id: any }) => option.id}
            selected={
              lineItem?.room
                ? {
                    id: lineItem?.room?.id,
                    roomName: lineItem?.room?.roomName,
                  }
                : null
            }
          /> */}
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
  lineItem: state.lineItemDetail?.lineItem,
  category: state.lineItemDetail.category,
  condition: state.lineItemDetail.condition,
  subCategory: state.lineItemDetail.subCategory,
  room: state.lineItemDetail.room,
  retailer: state.lineItemDetail.retailer,
  paymentTypes: state.lineItemDetail.paymentTypes,
});

const connector = connect(mapStateToProps, null);
type connectorType = ConnectedProps<typeof connector>;
export default connector(OrginalItemForm);
