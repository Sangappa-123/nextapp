import TabsButtonComponent from "@/components/common/TabsButtonComponent";
import NotificationAlertComponent from "@/components/AlertComponent/NotificationAlertComponent";
import MessageAlertComponent from "@/components/AlertComponent";
import { sampleNotifications } from "@/services/sampleNotifications";
import TabsStyle from "./AlertTabsButton.module.scss";

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

const AlertTabsButton = () => {
  return (
    <div>
      <TabsButtonComponent tabData={tabData} showBorders={true} />
    </div>
  );
};

export default AlertTabsButton;
