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
    // console.log("==========", res);
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
