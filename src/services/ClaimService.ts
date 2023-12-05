import { getHeaderWithoutToken } from "@/utils/HeaderService";
import { getApiEndPoint } from "./ApiEndPointConfig";
import store from "@/store/store";
import { addClaimListData } from "@/reducers/ClaimData/ClaimSlice";
import { addUrgentClaimListData } from "@/reducers/UrgentClaimData/UrgentClaimSlice";
import HttpService from "@/HttpService";
import { getClientCookie } from "@/utils/utitlity";

export const claimList = async (payload: any, token: any) => {
  const headersData: object = getHeaderWithoutToken();
  // const headersData: object = getHeader();
  return new Promise((resolve, rejects) => {
    fetch(getApiEndPoint("claimList"), {
      method: "POST",
      headers: { ...headersData, "X-Auth-Token": token },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((result) => {
        return resolve({ result });
      })
      .catch((error) => rejects({ error }));
  });
};

export const fetchClaimList = async (
  pageNumber = 1,
  limit = 20,
  sortBy = "createDate",
  orderBy = "desc",
  searchKeyword = "",
  statusIds = null
) => {
  const state = store.getState();
  searchKeyword = state.claimdata.searchKeyword;
  statusIds = state.claimdata.statusIds;
  const userId = await getClientCookie("userId");
  const token = await getClientCookie("accessToken");

  const payload = {
    assignedUserId: userId,
    pagination: {
      pageNumber,
      limit,
      sortBy,
      orderBy,
    },
    searchKeyword,
    statusIds,
  };

  const claimListRes: any = await claimList(payload, token);
  console.log("claimListRes", claimListRes);

  if (claimListRes.result.status === 200) {
    const claimData = claimListRes.result;
    store.dispatch(addClaimListData({ claimData }));
    return claimData;
  }
  return null;
};

export const urgentClaimList = async (payload: any, token: any) => {
  const headersData: object = getHeaderWithoutToken();
  return new Promise((resolve, rejects) => {
    fetch(getApiEndPoint("immidiateAttentionClaims"), {
      method: "POST",
      headers: { ...headersData, "X-Auth-Token": token },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((result) => {
        return resolve({ result });
      })
      .catch((error) => rejects({ error }));
  });
};

export const fetchUrgentClaimList = async (
  pageNumber = 1,
  limit = 20,
  sortBy = "createDate",
  orderBy = "desc",
  searchKeyword = "",
  statusIds = null
) => {
  const state = store.getState();
  searchKeyword = state.urgentclaimdata.searchKeyword;
  statusIds = state.urgentclaimdata.statusIds;
  const userId = await getClientCookie("userId");
  const token = await getClientCookie("accessToken");

  const payload = {
    assignedUserId: userId,
    pagination: {
      pageNumber,
      limit,
      sortBy,
      orderBy,
    },
    searchKeyword,
    statusIds,
  };

  const urgentClaimListRes: any = await urgentClaimList(payload, token);
  console.log("UrgentclaimListRes", urgentClaimListRes);

  if (urgentClaimListRes.result.status === 200) {
    const urgentClaimData = urgentClaimListRes.result;
    store.dispatch(addUrgentClaimListData({ urgentClaimData }));
    return urgentClaimData;
  }
  return null;
};

export const getNotification = async (param: object, isClient: boolean = false) => {
  try {
    const url = getApiEndPoint("notification");
    const http = new HttpService({ isClient });
    const res = await http.post(url, param);
    const { data, error } = res;
    if (!error) {
      return data;
    }
    throw error;
  } catch (err) {
    console.log("error", err);
    throw err;
  }
};

export const deleteNotification = async (param: object) => {
  try {
    const url = getApiEndPoint("deleteNotification");
    const http = new HttpService({ isClient: true });
    const res = await http.delete(url, param);
    const { error } = res;
    if (!error) return res;
    throw error;
  } catch (err) {
    console.log("error", err);
    throw err;
  }
};
