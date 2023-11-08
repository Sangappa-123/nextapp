"use client";
import React from "react";
import securityQuestionFormStyle from "./securityQuestionForm.module.scss";
import clsx from "clsx";
import SecurityQuestionPoints from "./SecurityQuestionPoints";
import GenericInput from "@/components/common/GenericInput";
import GenericButton from "@/components/common/GenericButton";
import GenericSelect from "@/components/common/GenericSelect";
import useSelectOption from "@/hooks/useSelectOption";
import useCustomForm from "@/hooks/useCustomForm";
import { object, string, minLength, Output } from "valibot";

const FormValue = ({
  Controller,
  control,
  options,
  errors,
  register,
  inputData,
}: any) => {
  const {
    selectLabel,
    selectPlaceholder,
    inputPlaceholder,
    inputLabel,
    inputId,
    inputName,
    selectName,
  } = inputData;
  return (
    <div
      className={clsx(
        "d-flex flex-column",
        securityQuestionFormStyle.formGroup
      )}
    >
      <Controller
        control={control}
        name={selectName}
        render={({ field }: any) => (
          <GenericSelect
            labelText={selectLabel}
            placeholder={selectPlaceholder}
            options={options}
            showError={errors[selectName]}
            errorMsg={errors[selectName]?.message}
            name={selectName}
            {...field}
          />
        )}
      />
      <GenericInput
        placeholder={inputPlaceholder}
        label={inputLabel}
        id={inputId}
        showError={errors[inputName]}
        errorMsg={errors[inputName]?.message}
        isFixedError={true}
        {...register(inputName)}
      />
    </div>
  );
};

function SecurityQuestionForm() {
  const selectOptions = [
    { value: "q1", label: "This is question1" },
    { value: "q2", label: "This is question2" },
    { value: "q3", label: "This is question3" },
  ];
  const { options } = useSelectOption(selectOptions);

  const schema = object({
    question1: object({}, "Please select Question 1."),
    answer1: string("Fill the answer.", [minLength(1, "Fill the answer.")]),
    question2: object({}, "Please select Question 2."),
    answer2: string("Fill the answer.", [minLength(1, "Fill the answer.")]),
    question3: object({}, "Please select Question 2."),
    answer3: string("Fill the answer.", [minLength(1, "Fill the answer.")]),
  });

  const { register, handleSubmit, formState, Controller, control } =
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
          <FormValue
            Controller={Controller}
            control={control}
            options={options}
            errors={errors}
            register={register}
            inputData={{
              selectName: "question1",
              selectLabel: "Question 1",
              selectPlaceholder: "Select Question 1",
              inputPlaceholder: "Enter answer",
              inputLabel: "Answer",
              inputId: "answer1",
              inputName: "answer1",
            }}
          />
          <FormValue
            Controller={Controller}
            control={control}
            options={options}
            errors={errors}
            register={register}
            inputData={{
              selectName: "question2",
              selectLabel: "Question 2",
              selectPlaceholder: "Select Question 2",
              inputPlaceholder: "Enter answer",
              inputLabel: "Answer",
              inputId: "answer2",
              inputName: "answer2",
            }}
          />
          <FormValue
            Controller={Controller}
            control={control}
            options={options}
            errors={errors}
            register={register}
            inputData={{
              selectName: "question3",
              selectLabel: "Question 3",
              selectPlaceholder: "Select Question 3",
              inputPlaceholder: "Enter answer",
              inputLabel: "Answer",
              inputId: "answer3",
              inputName: "answer3",
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
