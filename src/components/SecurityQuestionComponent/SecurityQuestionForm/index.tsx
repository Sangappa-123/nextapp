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
import { saveSecurityQuestion } from "@/services/MyProfileService";
import { useRouter } from "next/navigation";
import { addNotification } from "@/reducers/Notification/NotificationSlice";
import { useAppDispatch } from "@/hooks/reduxCustomHook";
import useTranslation from "@/hooks/useTranslation";
import { securityQuestionTranslateType } from "@/translations/securityQuestionTranslate/en";
import CustomLoader from "@/components/common/CustomLoader";

interface TypedProp<T> {
  selectOptions: OptionTypedList<T>;
}

function SecurityQuestionForm<T extends object>({ selectOptions }: TypedProp<T>) {
  const {
    loading,
    translate,
  }: { loading: boolean; translate: securityQuestionTranslateType | undefined } =
    useTranslation("securityQuestionTranslate");
  const { options } = useSelectOption(selectOptions);
  const router = useRouter();
  const dispatch = useAppDispatch();

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

  const { register, handleSubmit, formState, setValue, control } = useCustomForm(schema);

  const { errors, isValid } = formState;

  const submitHandler = async (data: Output<typeof schema>) => {
    const questionAnswerList = {
      userId: localStorage.getItem("userId"),
      questionAnswerList: [
        {
          questionId: data.question1.value,
          answer: data.answer1,
        },
        {
          questionId: data.question2.value,
          answer: data.answer2,
        },
        {
          questionId: data.question3.value,
          answer: data.answer3,
        },
      ],
    };

    const resp: any = await saveSecurityQuestion(questionAnswerList);
    if (resp.status === 200) {
      router.replace("/adjuster-dashboard");
    } else if (resp?.errorMessage) {
      dispatch(
        addNotification({
          message: resp?.errorMessage,
          id: "security-question",
          status: "error",
        })
      );
    }
  };

  if (loading) {
    return (
      <div className="col-12 d-flex flex-column position-relative">
        <CustomLoader loaderType="spinner2" />
      </div>
    );
  }

  return (
    <form className="col-12 d-flex flex-column" onSubmit={handleSubmit(submitHandler)}>
      <div className={securityQuestionFormStyle.formContainer}>
        <div>{translate?.heading}</div>
        <SecurityQuestionPoints translate={translate} />
        <div className={securityQuestionFormStyle.formGroups}>
          <SecurityFieldComponent
            control={control}
            options={options}
            errors={errors}
            register={register}
            setValue={setValue}
            inputData={{
              selectName: "question1",
              selectLabel: translate?.inputFields?.question1?.label,
              selectPlaceholder: translate?.inputFields?.question1?.placeholder,
              inputPlaceholder: translate?.inputFields?.anwser?.placeholder,
              inputLabel: translate?.inputFields?.anwser?.label,
              inputId: "answer1",
              inputName: "answer1",
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
              selectLabel: translate?.inputFields?.question2?.label,
              selectPlaceholder: translate?.inputFields?.question2?.placeholder,
              inputPlaceholder: translate?.inputFields?.anwser?.placeholder,
              inputLabel: translate?.inputFields?.anwser?.label,
              inputId: "answer2",
              inputName: "answer2",
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
              selectLabel: translate?.inputFields?.question3?.label,
              selectPlaceholder: translate?.inputFields?.question3?.placeholder,
              inputPlaceholder: translate?.inputFields?.anwser?.placeholder,
              inputLabel: translate?.inputFields?.anwser?.label,
              inputId: "answer3",
              inputName: "answer3",
            }}
          />
        </div>
      </div>
      <GenericButton
        label={translate?.inputFields?.submitBtn ?? ""}
        btnClassname={clsx("my-3", securityQuestionFormStyle.actionBtn)}
        disabled={!isValid}
        type="submit"
      />
    </form>
  );
}

export default SecurityQuestionForm;
