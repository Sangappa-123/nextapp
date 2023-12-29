import React from "react";
import styles from "./policyAndCoverageDetails.module.scss";
import Cards from "../common/Cards/index";
import clsx from "clsx";
import { FaRegEdit } from "react-icons/fa";
import { ImLoop2 } from "react-icons/im";
import { IconContext } from "react-icons";
import {
  getCoreRowModel,
  createColumnHelper,
  useReactTable,
} from "@tanstack/react-table";
import GenericComponentHeading from "../common/GenericComponentHeading/index";
import CustomReactTable from "../common/CustomReactTable/index";

export default function PolicyAndCoverageDetails() {
  // const [show, setShow] = useState(false);

  const columnHelper = createColumnHelper<unknown>();
  const columns = [
    columnHelper.accessor("categoryName", {
      header: () => "Category Name	",
      id: "Category Name",
      enableColumnFilter: false,
    }),
    columnHelper.accessor("aggregateLimit", {
      header: () => "Aggregate Limit	", // filter option true should have same id as value
      id: "Aggregate Limit",
    }),
    columnHelper.accessor("individualItemLimit", {
      header: () => "Individual Item Limit", // filter option true should have same id as value
      id: "Individual Item Limit",
    }),
  ];
  // const handleClick = () => {
  //   setShow(true);
  // };
  const claimResult = [
    {
      categoryName: "Others	",
      aggregateLimit: "$1,500.00	",
      individualItemLimit: "$500.00",
    },
    {
      categoryName: "Clothing and Accessories		",
      aggregateLimit: "$1,500.00	",
      individualItemLimit: "$1,500.00	",
    },
    {
      categoryName: "Personal Care and Beauty",
      aggregateLimit: "$2,500.00",
      individualItemLimit: "$2,500.00 ",
    },
    {
      categoryName: "Office Equipment	",
      aggregateLimit: "$1,500.00",
      individualItemLimit: "$1,500.00",
    },
  ];
  const table = useReactTable({
    data: claimResult,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
    manualFiltering: true,
    enableColumnFilters: false,
  });

  return (
    <div className={clsx("row", styles.policyAndCoverageDetails)}>
      <div className={styles.card1}>
        <Cards className={styles.cardPolicy}>
          <GenericComponentHeading
            title={"Policy Coverage Details"}
            // customHeadingClassname={NewClaimsStyle.PolicyholderText}
            // customTitleClassname={NewClaimsStyle.customTitleClassname}
          />
          <div className={styles.policyCoverageDetails}>
            <div className={clsx("row align-items-center", styles.policyNumber)}>
              <div className={clsx("col-lg-6 col-md-2 col-sm-12 mt-2 text-right")}>
                <label className={styles.policyNo}>Policy No :</label>
              </div>
              <div className={clsx("col-lg-4 col-md-3 col-sm-12 mt-2")}>
                <span className={styles.number}>PLEICGS051920231101</span>
              </div>
            </div>
            <div className={clsx("row align-items-center", styles.policyNumber)}>
              <div className={clsx("col-lg-6 col-md-2 col-sm-12 mt-2 text-right")}>
                <label className={styles.policyNo}>Homeowners Policy Type:</label>
              </div>
              <div className={clsx("col-lg-4 col-md-3 col-sm-12 mt-2")}>
                <span className={styles.number}>HO-3</span>
              </div>
            </div>
            <div className={clsx("row align-items-center", styles.policyNumber)}>
              <div className={clsx("col-lg-6 col-md-2 col-sm-12 mt-2 text-right")}>
                <label className={styles.policyNo}>Total Coverage :</label>
              </div>
              <div className={clsx("col-lg-4 col-md-3 col-sm-12 mt-2")}>
                <span className={styles.number}>$300,000.00</span>
              </div>
            </div>
            <div className={clsx("row align-items-center", styles.policyNumber)}>
              <div className={clsx("col-lg-6 col-md-2 col-sm-12 mt-2 text-right")}>
                <label className={styles.policyNo}>Special Limit :</label>
              </div>
              <div className={clsx("col-lg-4 col-md-3 col-sm-12 mt-2")}>
                <span className={styles.number}>$25,000.00</span>
              </div>
            </div>
            <div className={clsx("row align-items-center", styles.policyNumber)}>
              <div className={clsx("col-lg-6 col-md-2 col-sm-12 mt-2 text-right")}>
                <label className={styles.policyNo}>Deductible Amount :</label>
              </div>
              <div className={clsx("col-lg-4 col-md-3 col-sm-12 mt-2")}>
                <span className={styles.number}>$200.00</span>
              </div>
            </div>
          </div>
        </Cards>
      </div>
      <div className={styles.card2}>
        <Cards className={styles.cardPolicy}>
          <GenericComponentHeading
            title={"Category Limits"}
            // customHeadingClassname={NewClaimsStyle.PolicyholderText}
            // customTitleClassname={NewClaimsStyle.customTitleClassname}
          />
          <div>
            <div className={clsx("row align-items-center", styles.policyNumber)}>
              <div className={clsx("col-lg-4 col-md-2 col-sm-12 mt-2 text-right")}>
                <label className={styles.policyNo}>Name</label>
              </div>
              <div className={clsx("col-lg-4 col-md-3 col-sm-12 mt-2")}>
                <span className={styles.number}>Grace Smith</span>
              </div>
            </div>
            <div className={clsx("row align-items-center", styles.policyNumber)}>
              <div className={clsx("col-lg-4 col-md-2 col-sm-12 mt-2 text-right")}>
                <label className={styles.policyNo}>Email</label>
              </div>
              <div className={clsx("col-lg-4 col-md-3 col-sm-12 mt-2")}>
                <span className={styles.number}> </span>
              </div>
            </div>
            <div className={clsx("row align-items-center", styles.policyNumber)}>
              <div className={clsx("col-lg-4 col-md-2 col-sm-12 mt-2 text-right")}>
                <label className={styles.policyNo}>Secondary Email</label>
              </div>
              <div className={clsx("col-lg-4 col-md-3 col-sm-12 mt-2")}>
                <span className={styles.number}> </span>
              </div>
            </div>
            <div className={clsx("row align-items-center", styles.policyNumber)}>
              <div className={clsx("col-lg-4 col-md-2 col-sm-12 mt-2 text-right")}>
                <label className={styles.policyNo}>Cell Phone</label>
              </div>
              <div className={clsx("col-lg-4 col-md-3 col-sm-12 mt-2")}>
                <span className={styles.number}>(324) -878-7853</span>
              </div>
            </div>
            <div className={clsx("row align-items-center", styles.policyNumber)}>
              <div className={clsx("col-lg-4 col-md-2 col-sm-12 mt-2 text-right")}>
                <label className={styles.policyNo}>Day Phone</label>
              </div>
              <div className={clsx("col-lg-4 col-md-3 col-sm-12 mt-2")}>
                <span className={styles.number}>$200.00</span>
              </div>
            </div>
            <div className={clsx("row align-items-center", styles.policyNumber)}>
              <div className={clsx("col-lg-4 col-md-2 col-sm-12 mt-2 text-right")}>
                <label className={styles.policyNo}>Evening Phone</label>
              </div>
              <div className={clsx("col-lg-4 col-md-3 col-sm-12 mt-2")}>
                <span className={styles.number}> </span>
              </div>
            </div>
            <div className={clsx("row align-items-center", styles.policyNumber)}>
              <div className={clsx("col-lg-4 col-md-2 col-sm-12 mt-2 text-right")}>
                <label className={styles.policyNo}>Address</label>
              </div>
              <div className={clsx("col-lg-4 col-md-3 col-sm-12 mt-2")}>
                <span className={styles.number}>CA, 77777</span>
              </div>
            </div>
            <div className={clsx("row align-items-center", styles.policyNumber)}>
              <div className={clsx("col-lg-4 col-md-2 col-sm-12 mt-2 text-right")}>
                <label className={styles.policyNo}>Secondary Address</label>
              </div>
              <div className={clsx("col-lg-4 col-md-3 col-sm-12 mt-2")}>
                <span className={styles.number}></span>
              </div>
            </div>

            <div className={clsx("row align-items-center")}>
              <div className={clsx("col-lg-8 col-md-2 col-sm-12 mt-2 text-right")}>
                <button className={styles.edit}>
                  <FaRegEdit />
                  Edit
                </button>
              </div>
              <div className={clsx("col-lg-4 col-md-2 col-sm-12 mt-2")}>
                <button className={styles.resetPassword}>
                  <IconContext.Provider value={{ className: styles.Password }}>
                    <ImLoop2 />
                  </IconContext.Provider>
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </Cards>
      </div>
      <div className={styles.categoryLimit}>
        <GenericComponentHeading
          title={"Category Limits"}
          customHeadingClassname={styles.categoryLimit}
          customTitleClassname={styles.customTitleClassname}
        />
        <div className={styles.table}>
          <CustomReactTable table={table} />
        </div>
      </div>
    </div>
  );
}
