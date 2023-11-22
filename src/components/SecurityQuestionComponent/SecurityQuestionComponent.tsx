import React from "react";
import SecurityQuestionForm from "./SecurityQuestionForm";
import { fetchSecurityQuestions } from "@/services/MyProfileService";
import { cookies } from "next/headers";

async function SecurityQuestionComponent() {
  const cookieStore = cookies();
  let token = "";
  if (cookieStore.has("accessToken")) {
    token = cookieStore.get("accessToken")?.value ?? "";
  }
  // const selectOptions = [{value: 1, label: "This is question1"}] // must be on this format
  // const token =
  //   "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZGp1c3RlcjJAc2FraGFnbG9iYWwuY29tIiwiYXVkaWVuY2UiOiJ3ZWIiLCJjcmVhdGVkIjoxNzAwMjA3NDkyNDM0LCJleHAiOjE3MDA4MTIyOTJ9.h5jCdjS7qPJlpBXPzKZOFW8RQt0-KRJgAF5fSGFfMvTg_YHAUynLcmhhPLTOQo12B8sb0NRnq20cGnmfE7RcVg";
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
