import React from "react";
import clsx from "clsx";
import buttonStyle from "./genericButton.module.scss";

export enum btnThemes {
  lightBlue = "light-blue",
  darkBlue = "dark-blue",
}

type genericButtonType = {
  label: string;
  theme?: keyof typeof btnThemes;
  btnClassname?: string;
  disabled?: boolean;
  onClickHandler?: (value: any) => void;
  [rest: string | number]: any;
};

function GenericButton({
  label,
  btnClassname = "",
  theme = "lightBlue",
  disabled,
  onClickHandler,
  ...rest
}: genericButtonType) {
  return (
    <button
      className={clsx({
        [buttonStyle.genericBtn]: true,
        [btnClassname]: btnClassname,
        [buttonStyle[btnThemes[theme]]]: true,
      })}
      disabled={disabled}
      type="button"
      onClick={onClickHandler}
      {...rest}
    >
      {label}
    </button>
  );
}

export default GenericButton;
