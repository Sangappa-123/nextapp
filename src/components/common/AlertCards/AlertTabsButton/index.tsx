import TabsButtonComponent from "@/components/common/TabsButtonComponent";
import NotificationAlertComponent from "@/components/AlertComponent/NotificationAlertComponent";
import MessageAlertComponent from "@/components/AlertComponent";
import { sampleNotifications } from "@/services/sampleNotifications";
import TabsStyle from "./AlertTabsButton.module.scss";
// import { getNotification } from "@/services/ClaimService";
import { getServerCookie } from "@/utils/utitlity";
import HttpService from "@/HttpService";
import { getApiEndPoint } from "@/services/ApiEndPointConfig";

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

const getNotification = async (param: object) => {
  try {
    const http = new HttpService();
    const url = getApiEndPoint("notification");
    const res = await http.post(url, param);
    const { data, error } = res;
    if (data) {
      return data;
    }
    return error;
  } catch (err) {
    return err;
  }
};

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
