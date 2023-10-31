import React, { forwardRef } from "react";
import { clsx } from "clsx";

import "./genericInput.modules.scss";

type propsType = {
  placeholder?: string;
  showError?: boolean;
  errorMsg?: string;
  formControlClassname?: string;
  errorMsgClassname?: string;
  inputFieldClassname?: string;
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
    ...rest
  } = props;
  return (
    <div
      className={clsx({
        "form-control": true,
        [formControlClassname]: formControlClassname,
      })}
    >
      <input
        type="text"
        ref={ref}
        placeholder={placeholder}
        className={clsx({
          "input-field": true,
          [inputFieldClassname]: inputFieldClassname,
          "error-field": showError,
        })}
        {...rest}
      />
      <div
        className={clsx({
          "error-msg": true,
          "d-none": !showError,
          [errorMsgClassname]: errorMsgClassname,
        })}
      >
        {errorMsg}
      </div>
    </div>
  );
}

export default forwardRef(GenericInput);
