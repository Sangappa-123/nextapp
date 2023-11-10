import React from "react";
import MenuBarStyle from "./MenuBarStyle.module.scss";

export default function TestDashboardComponent(props: any): any {
  console.log("props", props);
  console.log("propsssss", props.menu.myClaims);

  return (
    <div className={MenuBarStyle.container}>
      <button className={MenuBarStyle.claims}>{props.menu.myClaims}</button>
      <button className={MenuBarStyle.all_claims}>{props.menu.allClaims}</button>
      <div className={MenuBarStyle.dropdown}>
        <button className={MenuBarStyle.reports}>{props.menu.reports}</button>
        <div className={MenuBarStyle.dropdownContent}>
          {props.menu.datas.map(
            (todo: {
              id: React.Key | null | undefined;
              datas:
                | string
                | number
                | boolean
                | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
            }) => (
              <button className={MenuBarStyle.menuTab} key={todo.id}>
                {todo}
              </button>
            )
          )}
        </div>
      </div>
      <div className={MenuBarStyle.dropdown1}>
        <button className={MenuBarStyle.vendor}>Vendor Invoices and Payements</button>
        <div className={MenuBarStyle.dropdownContent1}>
          {props.menu.datas1.map(
            (
              todo:
                | string
                | number
                | boolean
                | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined
            ) => (
              <button className={MenuBarStyle.menuTab} key={todo.id}>
                {todo}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
