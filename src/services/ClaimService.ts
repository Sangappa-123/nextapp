import { getHeader } from "@/utils/HeaderService";
import { getApiEndPoint } from "./ApiEndPointConfig";
import store from "@/store/store";
import { addClaimListData } from "@/reducers/ClaimData/ClaimSlice";
import HttpService from "@/HttpService";

export const claimList = async (payload: any) => {
  const headersData: object = getHeader();
  return new Promise((resolve, rejects) => {
    fetch(getApiEndPoint("claimList"), {
      method: "POST",
      headers: headersData,
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
  const payload = {
    assignedUserId: localStorage.getItem("userId"),
    pagination: {
      pageNumber,
      limit,
      sortBy,
      orderBy,
    },
    searchKeyword,
    statusIds,
  };
  const claimListRes: any = await claimList(payload);
  console.log("claimListRes", claimListRes);

  if (claimListRes.result.status === 200) {
    const claimData = claimListRes.result.data.claims;
    store.dispatch(addClaimListData({ claimData }));
  }
};

export const getNotification = async (param: object) => {
  try {
    const http = new HttpService();
    const url = getApiEndPoint("notification");
    const res = await http.post(url, param);
    const { data, error } = res;
    if (data) {
      return data;
    }
    return error;
  } catch (err) {
    return err;
  }
};
