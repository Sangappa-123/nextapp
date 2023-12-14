import HttpService from "@/HttpService";
import { getApiEndPoint } from "../ApiEndPointConfig";
import { unknownObjectType } from "@/constants/customTypes";

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

export const fetchComparable = async (
  payload: unknownObjectType,
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
