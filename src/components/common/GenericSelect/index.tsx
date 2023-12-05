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

function GenericSelect<T extends object>(props: TypedProps<T>) {
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
    isMulti = false,
    customStyles = "",
    customMenuWithClear = false,
    selected = null,
    isManditaory = true,
    hideSelectedOptions = true,
    handleSelectChange,
    handleClear,
    ...rest
  } = props;

  const CustomMenuWithClear = ({ innerRef, innerProps, isDisabled, children }: any) =>
    !isDisabled ? (
      <div ref={innerRef} {...innerProps} className={selectStyle.menu}>
        {customMenuWithClear && (
          <a className={selectStyle.clearAllAnchor} onClick={handleClear}>
            Clear All
          </a>
        )}
        {children}
      </div>
    ) : null;
  return (
    <div
      className={clsx({
        [selectStyle["form-control"]]: true,
        [formControlClassname]: formControlClassname,
      })}
    >
      {labelText && (
        <label
          className={clsx({
            [labelClassname]: labelClassname,
            "d-none": !isManditaory,
          })}
        >
          <span style={{ color: "red" }}>*</span> {labelText}
        </label>
      )}

      <div>
        <ReactSelect
          classNames={selectStyle.reactSelectContainer}
          styles={customStyles}
          components={{ Menu: CustomMenuWithClear }}
          value={selected}
          onChange={handleSelectChange}
          options={options}
          placeholder={placeholder}
          isClearable={true}
          isSearchable={true}
          hideSelectedOptions={hideSelectedOptions}
          isMulti={isMulti}
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
