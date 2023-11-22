import TabsButtonComponent from "@/components/common/TabsButtonComponent";
import NotificationAlertComponent from "@/components/AlertComponent/NotificationAlertComponent";
import MessageAlertComponent from "@/components/AlertComponent";
import { sampleNotifications } from "@/services/sampleNotifications";
import TabsStyle from "./AlertTabsButton.module.scss";
import { getNotification } from "@/services/ClaimService";
import { getServerCookie } from "@/utils/utitlity";

const tabData = [
  {
    name: "Notifications",
    content: (
      <NotificationAlertComponent
        alertNotifications={sampleNotifications[0].data.notifications}
      />
    ),
    className: TabsStyle.tab1,
  },
  { name: "Messages", content: <MessageAlertComponent />, className: TabsStyle.tab2 },
];

const AlertTabsButton = async () => {
  const id = getServerCookie("userId");
  const data = await getNotification({ id, page: 1 });
  return (
    <TabsButtonComponent
      tabData={tabData}
      showBorders={true}
      data={data}
      dataType="notification"
    />
  );
};

export default AlertTabsButton;
