"use client";
import React, { useEffect, useState } from "react";
import styles from "./ActivityLog.module.scss";
import GenericComponentHeading from "../common/GenericComponentHeading/index";
import GenericButton from "@/components/common/GenericButton";
import Modal from "@/components/common/ModalPopups";
import AddActivityPopup from "./AddActivityPopup";
import AssignmentActivityLog from "./AssignmentActivityLog";

import {
  getActivityLogData,
  downloadActivityLogData,
} from "@/services/AdjusterPropertyClaimDetailServices/AdjusterPropertyClaimDetailService";

interface propsTypes {}
const ActivityLog: React.FC<propsTypes> = () => {
  const [AssignmentActivityLogData, setAssignmentActivityLogData] = useState([]);

  const claimId = sessionStorage.getItem("claimId") || "";

  const payload = {
    claimId: claimId,
  };
  let res: any;
  const init = async () => {
    res = await getActivityLogData(payload);
    setAssignmentActivityLogData(res.data);
  };
  useEffect(() => {
    init();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
    setIsModalOpen(false);
    init();
  };

  const groupedData: any = AssignmentActivityLogData.reduce(
    (acc: { [x: string]: any[] }, obj: { createdDate: any }) => {
      const date = obj.createdDate;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(obj);
      return acc;
    },
    {}
  );
  const groupedArray = Object.entries(groupedData);
  const Ui = groupedArray.map((obj: any, i: React.Key | null | undefined) => {
    return (
      <div key={i}>
        <AssignmentActivityLog groupedObjData={obj} />
      </div>
    );
  });

  const handleGeneratePdf = async () => {
    const content = await downloadActivityLogData(payload);
    const blob = new Blob([content], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ActivityLog.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.activityLog}>
      <div className={styles.heading}>
        <GenericComponentHeading title={"Assignment Activity Log"} />
        <div className={styles.buttonRowContainer}>
          <GenericButton
            className={styles.buttonCss}
            label="Add Activity"
            onClick={openModal}
            size="small"
          />
          <GenericButton
            onClick={handleGeneratePdf}
            className={styles.buttonCss}
            label="Download as PDF"
            size="small"
          />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        childComp={<AddActivityPopup handleOpenModal={handleOpenModal} />}
        headingName="New Activity"
        modalWidthClassName={styles.modalWidth}
      ></Modal>
      <div className="row">{Ui}</div>
    </div>
  );
};

export default ActivityLog;
