import { ReactNode } from "react";
import CommonSecurityLayout from "@/components/common/Layouts/CommonSecurityLayout";

export default function SecurityLayout({ children }: { children: ReactNode }) {
  return <CommonSecurityLayout>{children}</CommonSecurityLayout>;
}
