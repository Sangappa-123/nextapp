import { getApiEndPoint } from "./ApiEndPointConfig";
import HttpService from "@/HttpService";

interface objectType {
  [key: string | number]: any;
}

export const getPendingVendorInvoices = async (payload: object) => {
  try {
    const http = new HttpService();
    const url = getApiEndPoint("invoicelist");
    const resp: any = await http.post(url, payload);
    const { data, error } = resp;
    if (data) {
      return data;
    }
    return error;
  } catch (err) {
    return err;
  }
};

export const getImmediateClaims = async (param: any): Promise<objectType> => {
  try {
    const http = new HttpService();
    const url = getApiEndPoint("immidiateAttentionClaims") + param;
    const resp: objectType = await http.get(url);
    const { response, error } = resp;
    if (response) {
      return response;
    }
    return error;
  } catch (err: any) {
    return err;
  }
};
