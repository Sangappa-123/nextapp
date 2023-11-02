import React, { forwardRef } from "react";
import { clsx } from "clsx";

import inputStyle from "./genericInput.module.scss";

type propsType = {
  placeholder?: string;
  showError?: boolean;
  errorMsg?: string;
  formControlClassname?: string;
  errorMsgClassname?: string;
  inputFieldClassname?: string;
  label?: string;
  labelClassname?: string;
  [rest: string]: any;
};

function GenericInput(props: propsType, ref: any) {
  const {
    placeholder = "",
    showError = false,
    formControlClassname = "",
    errorMsgClassname = "",
    inputFieldClassname = "",
    errorMsg = "",
    label = "",
    labelClassname = "",
    ...rest
  } = props;
  return (
    <div
      className={clsx({
        [inputStyle["form-control"]]: true,
        [formControlClassname]: formControlClassname,
      })}
    >
      <label
        htmlFor={rest.id}
        className={clsx({
          [labelClassname]: labelClassname,
        })}
      >
        {label}
      </label>
      <div>
        <input
          type="text"
          ref={ref}
          placeholder={placeholder}
          className={clsx({
            [inputStyle["input-field"]]: true,
            [inputFieldClassname]: inputFieldClassname,
            [inputStyle["error-field"]]: showError,
          })}
          {...rest}
        />
        <div
          className={clsx({
            [inputStyle["error-msg"]]: true,
            "d-none": !showError,
            [errorMsgClassname]: errorMsgClassname,
          })}
        >
          {errorMsg}
        </div>
      </div>
    </div>
  );
}

export default forwardRef(GenericInput);
