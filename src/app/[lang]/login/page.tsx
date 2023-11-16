import LoginContainer from "@/container/LoginContainer";
import { Suspense } from "react";
import Loading from "../loading";

export default function Login() {
  return (
    <Suspense fallback={<Loading />}>
      <LoginContainer />
    </Suspense>
  );
}
