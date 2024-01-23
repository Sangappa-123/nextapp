import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { NumericFormat } from "react-number-format";
import { PatternFormat } from "react-number-format";

import inputStyle from "./genericInput.module.scss";

export enum inputTheme {
  normal = "normal-input",
  default = "",
}
enum inputSize {
  small = "small-input",
  medium = "medium-input",
  large = "large-input",
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
  size?: keyof typeof inputSize;
  priceFormatter?: boolean;
  phoneFormatter?: boolean;
  percentageFormatter?: boolean;
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
    size = "small",
    priceFormatter = false,
    phoneFormatter = false,
    percentageFormatter = false,
    ...rest
  } = props;

  const commonProps = {
    type: "text",
    ref,
    placeholder,
    autoComplete: "false",
    className: clsx({
      [inputStyle["input-field"]]: true,
      [inputFieldClassname]: inputFieldClassname,
      [inputStyle[inputTheme[theme]]]: true,
      [inputStyle[inputSize[size]]]: true,
      hideInputArrow: rest?.type === "number",
    }),
    ...rest,
  };
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
        {priceFormatter && (
          <NumericFormat
            {...commonProps}
            decimalScale={2}
            fixedDecimalScale
            thousandSeparator={","}
            prefix={"$"}
            type="text"
          />
        )}
        {phoneFormatter && (
          <PatternFormat {...commonProps} format="(###)-###-####" type="text" />
        )}
        {percentageFormatter && (
          <NumericFormat
            {...commonProps}
            decimalScale={2}
            fixedDecimalScale
            thousandSeparator={","}
            suffix={"%"}
            type="text"
          />
        )}
        {!priceFormatter && !phoneFormatter && !percentageFormatter && (
          <input {...commonProps} />
        )}

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
