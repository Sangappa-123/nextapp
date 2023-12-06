import { getHeaderWithoutToken } from "@/utils/HeaderService";
import { getApiEndPoint } from "./ApiEndPointConfig";
import store from "@/store/store";
import { addUrgentClaimListData } from "@/reducers/UrgentClaimData/UrgentClaimSlice";
// import HttpService from "@/HttpService";
import { getClientCookie } from "@/utils/utitlity";

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
  console.log("claimListRes", urgentClaimListRes);

  if (urgentClaimListRes.result.status === 200) {
    const urgentClaimData = urgentClaimListRes.result;
    store.dispatch(addUrgentClaimListData({ urgentClaimData }));
    return urgentClaimData;
  }
  return null;
};
