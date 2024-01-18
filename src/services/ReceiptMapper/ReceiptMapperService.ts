import store from "@/store/store";
import HttpService from "@/HttpService";
import { addClaimedItemsListData } from "@/reducers/ReceiptMapper/ClaimedItemsSlice";
import { getApiEndPoint } from "../ApiEndPointConfig";

export const getClaimedItems = async (param: object) => {
  try {
    const url = getApiEndPoint("mapperClaimedItems");
    const http = new HttpService({ isClient: true });
    const resp = await http.post(url, param);
    const { status } = resp;

    if (status === 200) {
      store.dispatch(addClaimedItemsListData({ claimedData: resp }));
      return resp;
    } else {
      return resp.error;
    }
  } catch (err) {
    return err;
  }
};