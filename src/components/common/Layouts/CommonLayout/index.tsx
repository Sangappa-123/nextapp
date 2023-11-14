import React from "react";
// import NavBarMenu from "@/components/common/NavBarMenu";
import NavBar from "@/components/common/Navbar";
import { TypedMenuObject } from "@/components/common/Navbar/NavbarComponent";
import securityLayoutStyle from "./commonLayout.module.scss";

const menu: TypedMenuObject[] = [
  { label: "My Claims" },
  { label: "All Claims" },
  {
    label: "Reports",
    dropdown: [
      { link: "", label: "Claims Report" },
      { link: "", label: "Slavage Report" },
    ],
  },
  {
    label: "Vendor Invoices and Payements",
    dropdown: [
      {
        link: "",
        label: "Invoices",
      },
      {
        link: "",
        label: "Payments",
      },
    ],
  },
];

function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={securityLayoutStyle.root}>
      <div className={securityLayoutStyle.container}>
        <NavBar menu={menu} />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default CommonLayout;
