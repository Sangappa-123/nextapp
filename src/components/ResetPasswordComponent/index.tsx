"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import ResetPasswordComponentStyle from "./ResetPasswordComponent.module.scss";
import GenericInput from "@/components/common/GenericInput";
import GenericButton from "@/components/common/GenericButton";

interface FormData {
  answer: string;
}
function ResetPasswordComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [answer, setAnswer] = useState("");

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    console.log("Form data submitted:", formData);
  };

  const isButtonDisabled = answer.length === 0;

  return (
    <form
      className={clsx({
        "col-md-6": true,
        "col-12": true,
        "d-flex": true,
        "flex-column": true,
      })}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={ResetPasswordComponentStyle.formContainer}>
        <div className={ResetPasswordComponentStyle.questionContainer}>
          <label htmlFor="answer" className={ResetPasswordComponentStyle.label}>
            Question
          </label>
          <h3>In what city or town did your mother and father meet?</h3>
        </div>
        <div className={ResetPasswordComponentStyle.answerContainer}>
          <label htmlFor="answer" className={ResetPasswordComponentStyle.label}>
            Answer
          </label>
          <GenericInput
            placeholder="Enter Answer"
            showError={errors.answer}
            errorMsg={errors.answer?.message}
            isFixedError={true}
            {...register("answer", { required: "Answer is required" })}
            value={answer}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAnswer(e.target.value)
            }
          />
        </div>
      </div>
      <GenericButton
        label="Verify Answer"
        btnClassname={clsx("my-3", ResetPasswordComponentStyle.actionBtn)}
        type="submit"
        disabled={isButtonDisabled}
      />
    </form>
  );
}

export default ResetPasswordComponent;
