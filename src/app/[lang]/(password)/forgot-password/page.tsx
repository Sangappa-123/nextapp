import ForgotPasswordContainer from "@/container/PasswordContainer/ForgotPasswordContainer";
import React, { Suspense } from "react";
import Loading from "../../loading";

function ForgotPassword() {
  return (
    <Suspense fallback={<Loading />}>
      <ForgotPasswordContainer />;
    </Suspense>
  );
}

export default ForgotPassword;
