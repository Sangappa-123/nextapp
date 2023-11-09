"use client";
import React from "react";
import clsx from "clsx";
import SecurityQuestionPoints from "./SecurityQuestionPoints";
import GenericButton from "@/components/common/GenericButton";
import useSelectOption, { OptionTypedList } from "@/hooks/useSelectOption";
import useCustomForm from "@/hooks/useCustomForm";
import securityQuestionFormStyle from "./securityQuestionForm.module.scss";
import { object, string, minLength, Output, number } from "valibot";
import SecurityFieldComponent from "./SecurityFieldComponent";

interface TypedProp<T> {
  selectOptions: OptionTypedList<T>;
}

function SecurityQuestionForm<T extends object>({
  selectOptions,
}: TypedProp<T>) {
  const { options } = useSelectOption(selectOptions);

  const schema = object({
    question1: object({
      label: string("Select Question", [minLength(1, "Select Question")]),
      value: number("Select Question"),
    }),
    answer1: string("Fill the answer.", [minLength(1, "Fill the answer.")]),
    question2: object({
      label: string("Select Question", [minLength(1, "Select Question")]),
      value: number("Select Question"),
    }),
    answer2: string("Fill the answer.", [minLength(1, "Fill the answer.")]),
    question3: object({
      label: string("Select Question", [minLength(1, "Select Question")]),
      value: number("Select Question"),
    }),
    answer3: string("Fill the answer.", [minLength(1, "Fill the answer.")]),
  });

  const { register, handleSubmit, formState, setValue, control } =
    useCustomForm(schema);

  const { errors, isValid } = formState;

  const submitHandler = (data: Output<typeof schema>) => {
    console.log("Submit data", data);
  };

  return (
    <form
      className={clsx({
        "col-12": true,
        "d-flex": true,
        "flex-column": true,
      })}
      onSubmit={handleSubmit(submitHandler)}
    >
      <div
        className={clsx({
          [securityQuestionFormStyle.formContainer]: true,
        })}
      >
        <div>Security Questions</div>
        <SecurityQuestionPoints />
        <div className={securityQuestionFormStyle.formGroups}>
          <SecurityFieldComponent
            control={control}
            options={options}
            errors={errors}
            register={register}
            setValue={setValue}
            inputData={{
              selectName: "question1",
              selectLabel: "Question 1",
              selectPlaceholder: "Select Question 1",
              inputPlaceholder: "Enter answer",
              inputLabel: "Answer",
              inputId: "answer1",
              inputName: "answer1",
              valueField: "a",
            }}
          />
          <SecurityFieldComponent
            control={control}
            options={options}
            errors={errors}
            register={register}
            setValue={setValue}
            inputData={{
              selectName: "question2",
              selectLabel: "Question 2",
              selectPlaceholder: "Select Question 2",
              inputPlaceholder: "Enter answer",
              inputLabel: "Answer",
              inputId: "answer2",
              inputName: "answer2",
              valueField: "a",
            }}
          />
          <SecurityFieldComponent
            control={control}
            options={options}
            errors={errors}
            register={register}
            setValue={setValue}
            inputData={{
              selectName: "question3",
              selectLabel: "Question 3",
              selectPlaceholder: "Select Question 3",
              inputPlaceholder: "Enter answer",
              inputLabel: "Answer",
              inputId: "answer3",
              inputName: "answer3",
              valueField: "a",
            }}
          />
        </div>
      </div>
      <GenericButton
        label="I'm ready"
        btnClassname={clsx("my-3", {
          [securityQuestionFormStyle.actionBtn]: true,
        })}
        disabled={!isValid}
        type="submit"
      />
    </form>
  );
}

export default SecurityQuestionForm;
