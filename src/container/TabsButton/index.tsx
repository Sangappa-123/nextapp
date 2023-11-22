import TabsButtonComponent from "@/components/common/TabsButtonComponent";
import NotificationAlertComponent from "@/components/NotificationAlertComponent";
import MessageAlertComponent from "@/components/MessageAlertComponent";
import { sampleNotifications } from "@/services/sampleNotifications";
import TabsStyle from "./TabsButton.module.scss";

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

const TabsButton = () => {
  return (
    <div>
      <TabsButtonComponent tabData={tabData} showBorders={true} />
    </div>
  );
};

export default TabsButton;
