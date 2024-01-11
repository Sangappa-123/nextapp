"use client";
import React, { useEffect, useState } from "react";
import styles from "./Assignments.module.scss";
import {
  getVendorAssignments,
  getVendorAssignmentsCont,
} from "@/services/AdjusterPropertyClaimDetailServices/AdjusterPropertyClaimDetailService";

import CustomLoader from "@/components/common/CustomLoader";
import AssignmentsTable from "@/components/VendorAssignments/AssignmentsTable/AssignmentsTable";

function Assignments() {
  const [AssignmentData, setAssignmentData] = useState<any>({});
  const [AssignmentContData, setAssignmentContData] = useState<any>({});
  const claimId = sessionStorage.getItem("claimId") || "";
  const claimNumber = sessionStorage.getItem("claimNumber") || "";
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const payload = {
    claimId: claimId,
    claimNumber: claimNumber,
  };
  const columns = [
    "Assignment Id",
    "Vendor Name",
    "#Items",
    "Service Requested",
    "Status",
    "Start Date",
    "First Touch",
    "Max. Claim Time Agreed",
    "Time Taken so far",
  ];
  let tableData: any = [];
  const init = async () => {
    setIsLoader(true);
    const ListRes = await getVendorAssignments(payload);
    // console.log("ListRes====>", ListRes);

    setAssignmentData(ListRes);
    const Res = await getVendorAssignmentsCont(payload);
    setAssignmentContData(Res);
    setIsLoader(false);
  };

  useEffect(() => {
    init();
  }, []);

  const formatMyDateTime = (date: any) => {
    const dateComponents = date.split(/[^0-9]/).map(Number);
    const myDate = new Date(
      Date.UTC(
        dateComponents[2],
        dateComponents[0] - 1,
        dateComponents[1],
        dateComponents[3],
        dateComponents[4],
        dateComponents[5]
      )
    );
    const formattedDate = myDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const formattedTime = myDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const finalFormattedDate = `${formattedDate} ${formattedTime}`;

    return finalFormattedDate;
  };

  tableData = AssignmentData?.data?.claimAssignmentVendors.map((data: any) => ({
    "Assignment Id": data?.assignmentNumber ? data?.assignmentNumber : "",
    "Vendor Name": data?.vendorDetails?.vendorName ? data?.vendorDetails?.vendorName : "",
    "#Items": data?.noOfAssignedItems ? data?.noOfAssignedItems : "",
    "Service Requested": data?.requestedServices[0]?.name
      ? data?.requestedServices[0]?.name
      : "",
    Status: data?.assignmentStatus?.name ? data?.assignmentStatus?.name : "",
    "Start Date": data?.startDate ? formatMyDateTime(data?.startDate) : "",
    "First Touch": data?.firstTouch ? formatMyDateTime(data?.firstTouch) : "",
    "Max. Claim Time Agreed": "",
    "Time Taken so far": data?.timeTaken ? data?.timeTaken : "",
  }));

  return (
    <div className={styles.assignmentsCont}>
      {isLoader && <CustomLoader loaderType="spinner1" />}
      <div className={styles.itemsCont}>
        <div className={styles.card} style={{ height: "70px" }}>
          <h5 className={styles.itemDetails}>{AssignmentData?.data?.itemsWithVendors}</h5>
          <h6 className={styles.itemDetails}># Items with Vendors</h6>
        </div>
        <div className={styles.card} style={{ height: "70px" }}>
          <h5 className={styles.itemDetails}>
            {AssignmentContData?.data?.itemProcessedByVendor}
          </h5>
          <h6 className={styles.itemDetails}># Items Processed</h6>
        </div>
      </div>
      <div className={styles.assignmentTable}>
        <AssignmentsTable columns={columns} data={tableData ? tableData : []} />
      </div>
    </div>
  );
}

export default Assignments;
