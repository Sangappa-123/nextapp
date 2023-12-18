import HttpService from "@/HttpService";
import { getApiEndPoint } from "../ApiEndPointConfig";

export const fetchClaimItemDetails = async (
  payload: { itemId: number },
  isClient: boolean = false
) => {
  try {
    const url = getApiEndPoint("itemsDetails");
    const http = new HttpService({ isClient });
    const res = await http.post(url, payload);
    return res;
  } catch (error) {
    console.warn("Error::", error);
    throw error;
  }
};

export type searchComparableReq = {
  item: string;
  id: string;
  numberOfCounts: number;
  priceFrom: number;
  pincode: number | null;
  pageNo: number;
  serfWowSearch: boolean;
  ids: [1];
  priceTo?: number;
};
export const fetchComparable = async (
  payload: searchComparableReq,
  isClient: boolean = false
) => {
  try {
    const url = getApiEndPoint("replacementApi");
    const http = new HttpService({ isClient });
    const res = await http.post(url, payload);
    return res;
  } catch (error) {
    console.warn("fetchComparable::", error);
    throw error;
  }
};

export const getLineItemSubCategory = async (param: { categoryId: number }) => {
  try {
    const http = new HttpService({ isClient: true });
    const url = getApiEndPoint("lineItemSubCategory");
    const resp = await http.post(url, param);
    return resp?.data ?? null;
  } catch (err: any) {
    return null;
  }
};

export const getLineItemCondition = async () => {
  try {
    const http = new HttpService({ isClient: true });
    const url = getApiEndPoint("lineItemCondition");
    const resp = await http.get(url);
    return resp?.data ?? null;
  } catch (err: any) {
    return null;
  }
};

export const getLineItemCategory = async () => {
  try {
    const http = new HttpService({ isClient: true });
    const url = getApiEndPoint("lineItemCategory");
    const resp = await http.get(url);

    return resp?.data ?? [];
  } catch (err: any) {
    return [];
  }
};

export const getLineItemRoom = async (claim: string) => {
  try {
    const http = new HttpService({ isClient: true });
    let url = getApiEndPoint("lineItemRoom");
    url = url.replace("{{CLAIM}}", claim);
    console.log("-099999999", url);
    const resp = await http.get(url);

    return resp?.data ?? [];
  } catch (err: any) {
    return [];
  }
};

export const getLineItemRetailers = async () => {
  try {
    const http = new HttpService({ isClient: true });
    const url = getApiEndPoint("lineItemRetailer");
    const resp = await http.get(url);

    return resp?.data ?? { paymentTypes: [], retailers: [] };
  } catch (err: any) {
    return { paymentTypes: [], retailers: [] };
  }
};
