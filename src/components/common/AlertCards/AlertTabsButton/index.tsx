import TabsButtonComponent from "@/components/common/TabsButtonComponent";
import TabsStyle from "./AlertTabsButton.module.scss";
// import { getNotification } from "@/services/ClaimService";
import { getServerCookie } from "@/utils/utitlity";
import HttpService from "@/HttpService";
import { getApiEndPoint } from "@/services/ApiEndPointConfig";
import MessageAlertCardsComponent from "@/components/AlertComponent/MessageAlertCardsComponent";
import DashboardNotification from "@/components/AlertComponent/DashboardNotification";

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

  const tabData = [
    {
      name: "Notifications",
      content: <DashboardNotification data={data} />,
      className: TabsStyle.tab1,
    },
    {
      name: "Messages",
      content: <MessageAlertCardsComponent />,
      className: TabsStyle.tab2,
    },
  ];
  return <TabsButtonComponent tabData={tabData} showBorders={true} />;
};

export default AlertTabsButton;
