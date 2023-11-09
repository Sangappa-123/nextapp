import React, { forwardRef } from "react";
import ReactSelect from "react-select";
import clsx from "clsx";
import selectStyle from "./genericSelect.module.scss";

interface TypedProps<T> {
  options: T[];
  labelText: string;
  placeholder?: string;
  showError?: boolean;
  errorMsg?: string;
  errorMsgClassname?: string;
  formControlClassname?: string;
  labelClassname?: string;
  isFixedError?: string;
  [rest: string]: any;
}

function GenericSelect<T extends {}>(props: TypedProps<T>, ref: any) {
  const {
    labelText,
    options,
    placeholder = "Select",
    showError = false,
    errorMsg = "",
    isFixedError = false,
    errorMsgClassname = "",
    formControlClassname = "",
    labelClassname = "",
    ...rest
  } = props;
  return (
    <div
      className={clsx({
        [selectStyle["form-control"]]: true,
        [formControlClassname]: formControlClassname,
      })}
    >
      <label
        className={clsx({
          [labelClassname]: labelClassname,
        })}
      >
        <span style={{ color: "red" }}>*</span> {labelText}
      </label>
      <div>
        <ReactSelect
          options={options}
          placeholder={placeholder}
          isClearable={true}
          isSearchable={true}
          hideSelectedOptions={true}
          {...rest}
        />
        <div
          className={clsx({
            [selectStyle["error-msg"]]: true,
            "d-none": !showError,
            [errorMsgClassname]: errorMsgClassname,
            "position-absolute": isFixedError,
          })}
        >
          {errorMsg}
        </div>
      </div>
    </div>
  );
}

export default forwardRef(GenericSelect);
