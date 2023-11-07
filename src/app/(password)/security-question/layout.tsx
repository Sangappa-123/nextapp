import CommonSecurityLayout from "@/components/common/Layouts/CommonSecurityLayout";

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CommonSecurityLayout>{children}</CommonSecurityLayout>;
}
