import securityLayoutStyle from "./layout.module.scss";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={securityLayoutStyle.container}>
      <div>{children}</div>
    </div>
  );
}
