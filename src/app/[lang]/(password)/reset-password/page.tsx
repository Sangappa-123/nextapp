import ResetPasswordContainer from "@/container/PasswordContainer/ResetPasswordContainer";
import React, { Suspense } from "react";
import Loading from "../../loading";

function ResetPassword() {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPasswordContainer />
    </Suspense>
  );
}

export default ResetPassword;
