import { getApiEndPoint } from "./ApiEndPointConfig";
import HttpService from "@/HttpService";

export const getCategories = async () => {
  try {
    const http = new HttpService();
    const url = getApiEndPoint("categoriesRequest");
    const resp = await http.get(url);
    const { error } = resp;
    if (!error) {
      return resp;
    }
    return error;
  } catch (err: any) {
    return err;
  }
};

export const getSubCategories = async (param?: { categoryId: number }) => {
  let payload = null;
  if (!param) {
    payload = { categoryId: null };
  } else {
    payload = param;
  }
  try {
    const http = new HttpService();
    const url = getApiEndPoint("lineItemSubCategory");
    const resp = await http.post(url, payload);
    return resp;
  } catch (err: any) {
    return null;
  }
};
export const getPendingTaskList = async (param: { claimId: string }) => {
  try {
    const http = new HttpService();
    const url = getApiEndPoint("pendingTaskList");
    const resp = await http.post(url, param);
    return resp;
  } catch (err: any) {
    return null;
  }
};

export const getClaimDetailMessageList = async (param: {
  pageNo: number;
  recordPerPage: number;
  claimId: string;
}) => {
  try {
    const http = new HttpService();
    let url = getApiEndPoint("claimDetailMessageList");
    url = `${url}?page=${param?.pageNo}&limit=${param?.recordPerPage}&claim_id=${param?.claimId}`;
    console.log("url", url);

    const resp = await http.get(url);
    console.log("resp", resp);

    return resp;
  } catch (err: any) {
    return null;
  }
};
