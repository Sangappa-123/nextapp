import ResetPasswordContainer from "@/container/PasswordContainer/ResetPasswordContainer";
import React, { Suspense } from "react";
import Loading from "../../loading";
import { Locale } from "@/i18n.config";

function ResetPassword({ params }: { params: { lang: Locale } }) {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPasswordContainer lang={params?.lang} />
    </Suspense>
  );
}

export default ResetPassword;
