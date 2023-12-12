import HttpService from "@/HttpService";
import { getApiEndPoint } from "../ApiEndPointConfig";

export const fetchClaimItemDetails = async (payload: { itemId: number }) => {
  try {
    const url = getApiEndPoint("itemsDetails");
    const http = new HttpService();
    const res = await http.post(url, payload);
    // console.log("==========", res);
    return res;
  } catch (error) {
    console.log("Error::", error);
    throw error;
  }
};
