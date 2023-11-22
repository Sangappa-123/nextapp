import React from "react";
import TableCards from "@/container/TableCards";

interface NotificationAlertPropsComponent {
  alertNotifications: {
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

const NotificationAlertComponent: React.FC<NotificationAlertPropsComponent> = ({
  alertNotifications,
}) => {
  return (
    <div>
      <TableCards notifications={alertNotifications} />
    </div>
  );
};

export default NotificationAlertComponent;
