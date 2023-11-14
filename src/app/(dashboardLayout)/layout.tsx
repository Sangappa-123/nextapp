import CommonSecurityLayout from "@/components/common/Layouts/CommonSecurityLayout";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <CommonSecurityLayout>{children}</CommonSecurityLayout>;
}
