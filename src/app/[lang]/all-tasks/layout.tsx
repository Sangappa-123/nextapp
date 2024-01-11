import { ReactNode } from "react";
import CommonLayout from "@/components/common/Layouts/CommonLayout";

export default function NewClaimsLayout({ children }: { children: ReactNode }) {
  return <CommonLayout>{children}</CommonLayout>;
}
