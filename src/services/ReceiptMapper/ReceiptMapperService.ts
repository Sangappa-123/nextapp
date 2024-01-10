import store from "@/store/store";
import HttpService from "@/HttpService";
import { addClaimedItemsListData } from "@/reducers/ReceiptMapper/ClaimedItems";
import { getApiEndPoint } from "../ApiEndPointConfig";

interface objectType {
  [key: string | number]: any;
}

export const getClaimedItems = async (param: object) => {
  try {
    const url = getApiEndPoint("mapperClaimedItems");
    const http = new HttpService({ isClient: true });
    const resp = await http.post(url, param);
    console.log("resp",resp)
    const { error } = resp;
    if (!error) {
      store.dispatch(addClaimedItemsListData({ claimedData: resp }));
      return resp;
    } else {
      return error;
    }
  } catch (err) {
    return err;
  }
};
