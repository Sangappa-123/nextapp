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
} from "@/services/AdjusterPropertyClaimDetailService";

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

  // const AssignmentActivityLogData: any = [
  //     {
  //         "id": null,
  //         "logCreatedDate": 1704192203000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": "3rd Party Vendor",
  //         "logUpdated": null,
  //         "createdDate": "Jan 02 2024",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "Howell Melissa  has sent items for claim supervisor review",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "action",
  //         "messageType": null,
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1704192203000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": null,
  //         "logUpdated": null,
  //         "createdDate": "Jan 02 2024",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "test",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "message",
  //         "messageType": "outgoing",
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1704106746000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": "3rd Party Vendor",
  //         "logUpdated": null,
  //         "createdDate": "Jan 01 2024",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "Howell Melissa  has sent items for claim supervisor review",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "action",
  //         "messageType": null,
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1704106746000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": null,
  //         "logUpdated": null,
  //         "createdDate": "Jan 01 2024",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "test",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "message",
  //         "messageType": "outgoing",
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1703826371000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": "3rd Party Vendor",
  //         "logUpdated": null,
  //         "createdDate": "Dec 28 2023",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "Howell Melissa  has sent items for claim supervisor review",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "action",
  //         "messageType": null,
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1703826371000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": null,
  //         "logUpdated": null,
  //         "createdDate": "Dec 28 2023",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "test",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "message",
  //         "messageType": "outgoing",
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1703826253000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": "3rd Party Vendor",
  //         "logUpdated": null,
  //         "createdDate": "Dec 28 2023",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "Howell Melissa  has sent items for claim supervisor review",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "action",
  //         "messageType": null,
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1703826253000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": null,
  //         "logUpdated": null,
  //         "createdDate": "Dec 28 2023",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "test message",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "message",
  //         "messageType": "outgoing",
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1703766598000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": "3rd Party Vendor",
  //         "logUpdated": null,
  //         "createdDate": "Dec 28 2023",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "Howell Melissa  has sent items for claim supervisor review",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "action",
  //         "messageType": null,
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1703766598000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": null,
  //         "logUpdated": null,
  //         "createdDate": "Dec 28 2023",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "test",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "message",
  //         "messageType": "outgoing",
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1703764742000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": "3rd Party Vendor",
  //         "logUpdated": null,
  //         "createdDate": "Dec 28 2023",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "Howell Melissa  has sent items for claim supervisor review",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "action",
  //         "messageType": null,
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1703764742000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": null,
  //         "logUpdated": null,
  //         "createdDate": "Dec 28 2023",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "new test",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "message",
  //         "messageType": "outgoing",
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1702978396000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": "3rd Party Vendor",
  //         "logUpdated": null,
  //         "createdDate": "Dec 19 2023",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "Howell Melissa  has sent items for claim supervisor review",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "action",
  //         "messageType": null,
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1702978396000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": null,
  //         "logUpdated": null,
  //         "createdDate": "Dec 19 2023",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "test2",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "message",
  //         "messageType": "outgoing",
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1702978366000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": "3rd Party Vendor",
  //         "logUpdated": null,
  //         "createdDate": "Dec 19 2023",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "Howell Melissa  has sent items for claim supervisor review",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "action",
  //         "messageType": null,
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1702978366000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": null,
  //         "logUpdated": null,
  //         "createdDate": "Dec 19 2023",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "test1",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "message",
  //         "messageType": "outgoing",
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1702741107000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": "3rd Party Vendor",
  //         "logUpdated": null,
  //         "createdDate": "Dec 16 2023",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "Howell Melissa  has sent items for claim supervisor review",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "action",
  //         "messageType": null,
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1702741107000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": null,
  //         "logUpdated": null,
  //         "createdDate": "Dec 16 2023",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "message for testing message for testing for testing testing and testing and and adand and this is this is for testing and andadn andman and nicobar annnnnnnnnnnnnni iiiiiiiiii iiiiiiiiii pp aaa",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "message",
  //         "messageType": "outgoing",
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1702659142000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": "3rd Party Vendor",
  //         "logUpdated": null,
  //         "createdDate": "Dec 15 2023",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "Howell Melissa  has sent items for claim supervisor review",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "action",
  //         "messageType": null,
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1702659142000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": null,
  //         "logUpdated": null,
  //         "createdDate": "Dec 15 2023",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "nahddkdjddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "message",
  //         "messageType": "outgoing",
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1702560083000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": "3rd Party Vendor",
  //         "logUpdated": null,
  //         "createdDate": "Dec 14 2023",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "Howell Melissa  has sent items for claim supervisor review",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "action",
  //         "messageType": null,
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1702560083000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": null,
  //         "logUpdated": null,
  //         "createdDate": "Dec 14 2023",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "namaste",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "message",
  //         "messageType": "outgoing",
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1702558778000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": "3rd Party Vendor",
  //         "logUpdated": null,
  //         "createdDate": "Dec 14 2023",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "Howell Melissa  has sent items for claim supervisor review",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "action",
  //         "messageType": null,
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1702558778000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": null,
  //         "logUpdated": null,
  //         "createdDate": "Dec 14 2023",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "jai sri ram",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "message",
  //         "messageType": "outgoing",
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1702558338000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": "3rd Party Vendor",
  //         "logUpdated": null,
  //         "createdDate": "Dec 14 2023",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "Howell Melissa changed the status of the claim to 3rd Party Vendor.",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "action",
  //         "messageType": null,
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1702558337000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": "Work In Progress",
  //         "logUpdated": null,
  //         "createdDate": "Dec 14 2023",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "asd",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "message",
  //         "messageType": "outgoing",
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1702558309000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": "Work In Progress",
  //         "logUpdated": null,
  //         "createdDate": "Dec 14 2023",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "Howell Melissa changed the status of the claim to Work In Progress.",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "action",
  //         "messageType": null,
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     },
  //     {
  //         "id": null,
  //         "logCreatedDate": 1702558289000,
  //         "action": null,
  //         "actionTakenBy": null,
  //         "userRole": null,
  //         "logStatus": "Created",
  //         "logUpdated": null,
  //         "createdDate": "Dec 14 2023",
  //         "updatedDate": null,
  //         "timeElapsed": null,
  //         "message": "Howell Melissa Created a new claim clm14122023slno001.",
  //         "appraisal": null,
  //         "loggedByUserId": null,
  //         "loggedByEmail": null,
  //         "activityType": "action",
  //         "messageType": null,
  //         "profilePicture": null,
  //         "updatedByUserName": "Howell,Melissa",
  //         "messageProperty": null,
  //         "attachments": null,
  //         "activityEventName": null
  //     }
  // ];
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

// const mapStateToProps = (state: RootState) => ({
// });

// const mapDispatchToProps = {
// };
// const connector = connect(mapStateToProps, mapDispatchToProps);
// type connectorType = ConnectedProps<typeof connector>;

export default ActivityLog;
