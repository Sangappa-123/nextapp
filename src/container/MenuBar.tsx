import MenuBar from "@/components/common/MenuBar";

export default function TestDashboard() {
  const menu = {
    myClaims: "My Claims",
    allClaims: "All Claims",
    reports: "Reports",
    vendorInvoices: "Vendor Invoices and Payements",
    datas: ["Claims Report", "Slavage Report"],
    datas1: ["Invoices", "Payments"],
  };

  return <MenuBar menu={menu} />;
}
