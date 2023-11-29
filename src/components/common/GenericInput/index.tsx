import React, { forwardRef } from "react";
import { clsx } from "clsx";

import inputStyle from "./genericInput.module.scss";

export enum inputTheme {
  normal = "normal-input",
  default = "",
}

type propsType = {
  placeholder?: string;
  showError?: boolean;
  errorMsg?: string;
  formControlClassname?: string;
  errorMsgClassname?: string;
  inputFieldClassname?: string;
  label?: string;
  labelClassname?: string;
  theme?: keyof typeof inputTheme;
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
    theme = "default",
    isFixedError = false,
    inputFieldWrapperClassName = "",
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
      <div
        className={clsx({
          [inputFieldWrapperClassName]: inputFieldWrapperClassName,
        })}
      >
        <input
          type="text"
          ref={ref}
          placeholder={placeholder}
          autoComplete="false"
          className={clsx({
            [inputStyle["input-field"]]: true,
            [inputFieldClassname]: inputFieldClassname,
            // [inputStyle["error-field"]]: showError,
            [inputStyle[inputTheme[theme]]]: true,
          })}
          {...rest}
        />
        <div
          className={clsx({
            [inputStyle["error-msg"]]: true,
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

export default forwardRef(GenericInput);
