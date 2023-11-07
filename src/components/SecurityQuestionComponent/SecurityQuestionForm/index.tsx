"use client";
import React from "react";
import securityQuestionFormStyle from "./securityQuestionForm.module.scss";
import clsx from "clsx";
import SecurityQuestionPoints from "./SecurityQuestionPoints";
import GenericInput from "@/components/common/GenericInput";
import ReactSelect from "react-select";
import GenericButton from "@/components/common/GenericButton";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

function SecurityQuestionForm() {
  return (
    <form
      className={clsx({
        "col-12": true,
        "d-flex": true,
        "flex-column": true,
      })}
    >
      <div
        className={clsx({
          [securityQuestionFormStyle.formContainer]: true,
        })}
      >
        <div>Security Questions</div>
        <SecurityQuestionPoints />
        <div className={securityQuestionFormStyle.formGroup}>
          <div className={clsx("d-flex flex-column")}>
            <div>
              <label>
                <span style={{ color: "red" }}>*</span> Question 1
              </label>
              <ReactSelect options={options} />
            </div>
            <GenericInput placeholder="Answer" label="Answer" />
          </div>
          <div className={clsx("d-flex flex-column")}>
            <div>
              <label>
                <span style={{ color: "red" }}>*</span> Question 2
              </label>
              <ReactSelect options={options} />
            </div>
            <GenericInput placeholder="Answer" label="Answer" />
          </div>
          <div className={clsx("d-flex flex-column")}>
            <div>
              <label>
                <span style={{ color: "red" }}>*</span> Question 3
              </label>
              <ReactSelect options={options} />
            </div>
            <GenericInput placeholder="Answer" label="Answer" />
          </div>
        </div>
      </div>
      <GenericButton label="I'm ready" theme="normal" btnClassname="mt-3" />
    </form>
  );
}

export default SecurityQuestionForm;
