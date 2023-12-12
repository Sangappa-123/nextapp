import React from "react";
import orginalItemFormStyle from "./orginalItemForm.module.scss";
import clsx from "clsx";
import GenericInput from "@/components/common/GenericInput";

function OrginalItemForm() {
  return (
    <div className={orginalItemFormStyle.root}>
      <div className={orginalItemFormStyle.heading}>Original Item</div>
      <div className={orginalItemFormStyle.formContainer}>
        <div className={clsx(orginalItemFormStyle.formGroup, orginalItemFormStyle.row1)}>
          <label htmlFor="itemDesc">Original Item Description</label>
          <textarea id="itemDesc" />
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
              <label htmlFor="category">Category</label>
              <textarea id="category" />
            </div>
            <div className={orginalItemFormStyle.formControl}>
              <label htmlFor="subCategory">Sub-Category</label>
              <textarea id="subCategory" />
            </div>
          </div>
          <div className={orginalItemFormStyle.standardReplacement}>
            <div>Standard Replacement</div>
            <div>$0.00</div>
          </div>
        </div>
        <div className={orginalItemFormStyle.formGroup}>
          <label htmlFor="cost_per_unit">Cost Per Unit</label>
          <GenericInput id="cost_per_unit" />
        </div>
        <div className={orginalItemFormStyle.formGroup}>
          <label htmlFor="qty_lost">Qty Lost / Damaged</label>
          <GenericInput id="qty_lost" />
        </div>
        <div className={orginalItemFormStyle.formGroup}>
          <label htmlFor="total_lost">Total Cost</label>
          <GenericInput id="total_lost" />
        </div>
        <div className={clsx(orginalItemFormStyle.itemAge)}>
          <label>Age of Item</label>
          <div className={orginalItemFormStyle.itemAgeFormGroup}>
            <GenericInput
              label="(Years)"
              formControlClassname={orginalItemFormStyle.itemAgeFormControl}
              inputFieldWrapperClassName={orginalItemFormStyle.inputFieldWrapper}
            />
            <GenericInput
              label="(Months)"
              formControlClassname={orginalItemFormStyle.itemAgeFormControl}
              inputFieldWrapperClassName={orginalItemFormStyle.inputFieldWrapper}
            />
          </div>
        </div>
        <div className={orginalItemFormStyle.tax}>
          <label>Apply Taxes(10%)</label>
          <div className={orginalItemFormStyle.taxFormGroup}>
            <GenericInput
              type="radio"
              label="Yes"
              value="yes"
              name="applyTax"
              formControlClassname={orginalItemFormStyle.radioFormControl}
              inputFieldWrapperClassName={orginalItemFormStyle.inputWrapper}
            />
            <GenericInput
              type="radio"
              label="No"
              value="no"
              name="applyTax"
              formControlClassname={orginalItemFormStyle.radioFormControl}
              inputFieldWrapperClassName={orginalItemFormStyle.inputWrapper}
            />
          </div>
        </div>
        <div className={orginalItemFormStyle.formGroup}>
          <GenericInput label="Brand / Manufacturer" />
        </div>
        <div className={orginalItemFormStyle.formGroup}>
          <GenericInput label="Model" />
        </div>
        <div
          className={clsx(
            orginalItemFormStyle.formGroup,
            orginalItemFormStyle.startFromCol1
          )}
        >
          <GenericInput label="Purchased From" />
        </div>
        <div className={orginalItemFormStyle.formGroup}>
          <GenericInput label="Purchase Method" />
        </div>
        <div
          className={clsx(
            orginalItemFormStyle.formGroup,
            orginalItemFormStyle.startFromCol1
          )}
        >
          <GenericInput label="Condition" />
        </div>
        <div className={orginalItemFormStyle.formGroup}>
          <GenericInput label="Room" />
        </div>
        <div
          className={clsx(
            orginalItemFormStyle.formGroup,
            orginalItemFormStyle.scheduledItem
          )}
        >
          <label>Scheduled Item</label>
          <div className={orginalItemFormStyle.scheduledItemFormGroup}>
            <GenericInput
              type="radio"
              label="Yes"
              value="yes"
              name="applyTax"
              formControlClassname={orginalItemFormStyle.radioFormControl}
              inputFieldWrapperClassName={orginalItemFormStyle.inputWrapper}
            />
            <GenericInput
              type="radio"
              label="No"
              value="no"
              name="applyTax"
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
          <label>Pictures, Recipts etc.</label>
          <a href="#">Click to add attachment(s)</a>
        </div>
      </div>
    </div>
  );
}

export default OrginalItemForm;
