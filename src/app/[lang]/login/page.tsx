import LoginContainer from "@/container/LoginContainer";
import { Suspense } from "react";
import Loading from "../loading";
import { Locale } from "@/i18n.config";

export default async function Login({ params }: { params: { lang: Locale } }) {
  return (
    <Suspense fallback={<Loading />}>
      <LoginContainer lang={params.lang} />
    </Suspense>
  );
}
