import ForgotPasswordContainer from "@/container/PasswordContainer/ForgotPasswordContainer";
import React, { Suspense } from "react";
import Loading from "../../loading";
import { Locale } from "@/i18n.config";

function ForgotPassword({ params }: { params: { lang: Locale } }) {
  return (
    <Suspense fallback={<Loading />}>
      <ForgotPasswordContainer lang={params.lang} />;
    </Suspense>
  );
}

export default ForgotPassword;
