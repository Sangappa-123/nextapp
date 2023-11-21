import React from "react";
import "@/scss/custom/custom_breadcrumb.scss";
import Link from "next/link";
import clsx from "clsx";

interface dataType {
  name: string;
  active?: boolean;
  path: string;
}

type breadcrumbPropType = {
  dataList: dataType[];
};

function GenericBreadcrumb({ dataList = [] }: breadcrumbPropType) {
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {dataList.map((path) => (
            <li
              key={path.name}
              className={clsx({
                "breadcrumb-item": true,
              })}
              aria-current="page"
            >
              <Link
                className={clsx({
                  link: true,
                  "link-active": path.active,
                })}
                href={path.path}
              >
                {path.name}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

export default GenericBreadcrumb;
