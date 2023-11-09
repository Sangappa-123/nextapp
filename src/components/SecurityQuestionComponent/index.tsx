import React from "react";
import SecurityQuestionForm from "./SecurityQuestionForm";
import { fetchSecurityQuestions } from "@/services/MyProfileService";

async function SecurityQuestionComponent() {
  // const selectOptions = [{value: 1, label: "This is question1"}] // must be on this format
  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZGp1c3RlcjJAc2FraGFnbG9iYWwuY29tIiwiYXVkaWVuY2UiOiJ3ZWIiLCJjcmVhdGVkIjoxNjk5NTA2MDcyMzg0LCJleHAiOjE3MDAxMTA4NzJ9.hd-WeLMo9IMlWoK8I7NINhu-UxOurj0xDeGBbxlmMbTcifxW0LRdFP1H7b8oaS6ziYVbn2plDDClNz4mSHIjZQ";
  const result = await fetchSecurityQuestions(token);
  const { data = [], error }: any = result;
  let selectOptions = [];
  if (!error && data) {
    selectOptions = data?.map((option: typeof data) => ({
      value: option.id,
      label: option.questionName,
    }));
  }
  return (
    <div className="col-md-6">
      <SecurityQuestionForm selectOptions={selectOptions} />
    </div>
  );
}

export default SecurityQuestionComponent;
