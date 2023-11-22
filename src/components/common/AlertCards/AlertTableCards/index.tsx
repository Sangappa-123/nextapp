import React from "react";
import CommonTable from "@/components/common/CommonTable";
import TableCardsStyle from "./AlertTableCards.module.scss";
interface TableCardsProps {
  notifications: {
    createDate: string;
    id: number;
    isRead: boolean;
    message: string;
    messageTemplate: string;
    notificationParams: {
      isClaimNote: boolean;
      invoiceNumber: string;
      invoiceId: number;
      claimId: number;
      isItemNote: boolean;
      messageGrpId: string;
      claimNumber: string;
      quoteNumber: string;
      message1: string;
    };
    notificationPurpose: string;
    sender: string;
    subject: {
      id: number;
      subject: string;
    };
    type: {
      id: number;
      type: string;
    };
    insuredDetails: {
      address: {
        city: string;
        completeAddress: string;
        id: number;
        state: {
          id: number;
          state: string;
          stateName: string;
          taxRate: number;
          timeZone: string;
          noOfZipcodesWrtState: number;
          premiumValueWrtState: number;
          hoPolicyTypes: string[];
          noOfHOPolicyTypeState: number;
        };
        streetAddressOne: string;
        streetAddressTwo: string;
        zipcode: string;
      };
      secondaryAddress: string;
      agentDetails: string;
      cellPhone: string;
      extension: string;
      dayTimePhone: string;
      email: string;
      secondaryEmail: string;
      eveningTimePhone: string;
      firstName: string;
      lastName: string;
      policyHolderId: number;
      profilePicture: string;
      speedCheckVendorUrl: string;
      userRole: string;
      contactId: string;
    };
    page: string;
  }[];
}

const AlertTableCards: React.FC<TableCardsProps> = ({ notifications }) => {
  const columns = ["Date", "Claim Details", "Message"];
  const tableData = notifications.map((notification) => ({
    Date: notification.createDate,
    Message: (
      <>
        {notification.notificationParams.message1}
        <br />
        {notification.messageTemplate}
      </>
    ),
    "Claim Details": (
      <>
        {notification.insuredDetails.firstName} {notification.insuredDetails.lastName}
        <br />
        {notification.notificationParams.claimNumber}
      </>
    ),
  }));
  return (
    <div className={TableCardsStyle.container}>
      <CommonTable columns={columns} data={tableData} />
    </div>
  );
};

export default AlertTableCards;
