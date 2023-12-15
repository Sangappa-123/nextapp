import React from "react";
import orginalItemFormStyle from "./orginalItemForm.module.scss";
import clsx from "clsx";
import GenericInput from "@/components/common/GenericInput";
import GenericSelect from "@/components/common/GenericSelect";

function OrginalItemForm() {
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
              <GenericSelect id="subCategory" />
            </div>
            <div className={orginalItemFormStyle.formControl}>
              <label htmlFor="subCategory" className={orginalItemFormStyle.label}>
                Sub-Category
              </label>
              <GenericSelect id="subCategory" />
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
          />
        </div>
        <div className={orginalItemFormStyle.formGroup}>
          <label htmlFor="total_lost" className={orginalItemFormStyle.label}>
            Total Cost
          </label>
          <GenericInput id="total_lost" labelClassname={orginalItemFormStyle.label} />
        </div>
        <div className={clsx(orginalItemFormStyle.itemAge)}>
          <label className={orginalItemFormStyle.label}>Age of Item</label>
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
          <label className={orginalItemFormStyle.label}>Apply Taxes(10%)</label>
          <div className={orginalItemFormStyle.taxFormGroup}>
            <GenericInput
              type="radio"
              label="Yes"
              value="yes"
              name="applyTax"
              checked={true}
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
          <GenericInput
            label="Brand / Manufacturer"
            placeholder="Brand"
            labelClassname={orginalItemFormStyle.label}
          />
        </div>
        <div className={orginalItemFormStyle.formGroup}>
          <GenericInput
            label="Model"
            labelClassname={orginalItemFormStyle.label}
            placeholder="Model"
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
          <GenericSelect id="purchasedFrom" />
        </div>
        <div className={orginalItemFormStyle.formGroup}>
          {/* <GenericInput
            label="Purchase Method"
            labelClassname={orginalItemFormStyle.label}
          /> */}
          <label htmlFor="purchasedMethod" className={orginalItemFormStyle.label}>
            Purchased Method
          </label>
          <GenericSelect id="purchasedMethod" />
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
          <GenericSelect id="condition" />
        </div>
        <div className={orginalItemFormStyle.formGroup}>
          {/* <GenericInput label="Room" labelClassname={orginalItemFormStyle.label} /> */}
          <label htmlFor="room" className={orginalItemFormStyle.label}>
            Room
          </label>
          <GenericSelect id="room" />
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
              checked={true}
              formControlClassname={orginalItemFormStyle.radioFormControl}
              inputFieldWrapperClassName={orginalItemFormStyle.inputWrapper}
            />
            <GenericInput
              type="radio"
              label="No"
              value="no"
              name="scheduledItem"
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
}

export default OrginalItemForm;
