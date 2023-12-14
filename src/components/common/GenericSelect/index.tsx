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
  disabled?: boolean;
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
    disabled = false,
    ...rest
  } = props;

  const colourStyles: StylesConfig<ColourOption> = {
    control: (styles: any) => ({ ...styles, backgroundColor: "white" }),
    option: () => {
      return {
        fontSize: "13px",
        padding: "7px",
      };
    },
    input: (styles: any) => ({ ...styles, fontSize: "13px" }),
    placeholder: (styles: any) => ({ ...styles, fontSize: "12px" }),
    singleValue: (styles: any) => ({ ...styles, fontSize: "13px" }),
    ...customStyles,
  };

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
          // classNames={selectStyle.reactSelectContainer}
          // classNames={"abc"}
          styles={colourStyles}
          components={{ Menu: CustomMenuWithClear }}
          value={selected}
          onChange={handleSelectChange}
          options={options}
          placeholder={placeholder}
          isClearable={true}
          isSearchable={true}
          hideSelectedOptions={hideSelectedOptions}
          isMulti={isMulti}
          classNames={{
            container: () => selectStyle.reactSelectContainer,
            control: () => (disabled ? selectStyle.disabled : ""),
          }}
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
