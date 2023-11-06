import securityLayoutStyle from "./commonSecurityLayout.module.scss";

export default function CommonSecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={securityLayoutStyle.root}>
      <div className={securityLayoutStyle.container}>
        <div>{children}</div>
      </div>
    </div>
  );
}
