import { getHeaderWithoutToken } from "@/utils/HeaderService";
import { getApiEndPoint } from "./ApiEndPointConfig";
import store from "@/store/store";
import { deleteClaimContentListItem } from "@/reducers/ClaimData/ClaimContentSlice";

import HttpService from "@/HttpService";

interface objectType {
  [key: string | number]: any;
}
export const claimContentList = async (payload: any, token: any): Promise<objectType> => {
  const headersData: object = getHeaderWithoutToken();

  return new Promise((resolve, rejects) => {
    fetch(getApiEndPoint("claimContentList"), {
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

export const claimContentListV2 = async (payload: { claimId: string }) => {
  try {
    const url = getApiEndPoint("claimContentList");
    const http = new HttpService({ isClient: true });
    const res = await http.post(url, payload);
    return res;
  } catch (error) {
    console.warn("claimContentListV2__err", error);
    throw error;
  }
};

export const deleteClaimItem = async (payload: any) => {
  const url = getApiEndPoint("deleteClaimContentListItem");
  const http = new HttpService({ isClient: true });
  const res = await http.post(url, payload);

  if (res.status === 200) {
    const message = res.message;
    store.dispatch(deleteClaimContentListItem({ itemId: payload.id }));
    return message;
  }
  return null;
};
