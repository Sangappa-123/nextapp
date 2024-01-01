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

export const getSubCategories = async (
  param?: { categoryId: number },
  isClient?: boolean
) => {
  let payload = null;
  if (!param) {
    payload = { categoryId: null };
  } else {
    payload = param;
  }
  try {
    const http = new HttpService({ isClient: isClient ? true : false });
    const url = getApiEndPoint("lineItemSubCategory");
    const resp = await http.post(url, payload);
    return resp;
  } catch (err: any) {
    return err;
  }
};
export const getPendingTaskList = async (param: { claimId: string }) => {
  try {
    const http = new HttpService();
    const url = getApiEndPoint("pendingTaskList");
    const resp = await http.post(url, param);
    return resp;
  } catch (err: any) {
    return err;
  }
};
export const getClaimParticipantsList = async (param: { claimId: string }) => {
  try {
    const http = new HttpService();
    const url = getApiEndPoint("claimParticipantsUrl");
    const resp = await http.post(url, param);
    return resp;
  } catch (err: any) {
    return err;
  }
};
export const getclaimContents = async (param: { claimId: string }) => {
  const payload = { id: param?.claimId };
  try {
    const http = new HttpService();
    const url = getApiEndPoint("claimContentsUrl");
    const resp = await http.post(url, payload);
    return resp;
  } catch (err: any) {
    return err;
  }
};
export const getClaimPolicyInfo = async (param: { claimId: string }) => {
  try {
    const http = new HttpService();
    const url = getApiEndPoint("policyInfo");
    const resp = await http.post(url, param);
    return resp;
  } catch (err: any) {
    return err;
  }
};
export const getCompanyDetails = async (companyId: string) => {
  const payload = { id: companyId };
  try {
    const http = new HttpService({ isClient: true });
    const url = getApiEndPoint("companyDetailsUrl");
    const resp = await http.post(url, payload);
    return resp;
  } catch (err: any) {
    return err;
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
    const resp = await http.get(url);
    return resp;
  } catch (err: any) {
    return err;
  }
};

export const getClaimItemCondition = async () => {
  try {
    const http = new HttpService();
    const url = getApiEndPoint("lineItemCondition");
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

export const getClaimItemRoom = async (claim: string, isClient = false) => {
  try {
    const http = new HttpService({ isClient });
    let url = getApiEndPoint("lineItemRoom");
    url = url.replace("{{CLAIM}}", claim);
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

export const getClaimItemRetailers = async () => {
  try {
    const http = new HttpService();
    const url = getApiEndPoint("lineItemRetailer");
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

export const getClaimRoomTypeData = async () => {
  try {
    const http = new HttpService();
    const url = getApiEndPoint("roomTypeApi");
    const resp = await http.get(url);
    return resp?.data ?? [];
  } catch (err: any) {
    return [];
  }
};
