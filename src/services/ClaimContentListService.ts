import { getHeaderWithoutToken } from "@/utils/HeaderService";
import { getApiEndPoint } from "./ApiEndPointConfig";
import store from "@/store/store";
import { addClaimContentListData } from "@/reducers/ClaimData/ClaimContentSlice";

import { getClientCookie } from "@/utils/utitlity";

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

export const fetchClaimContentList = async () => {
  const state = store.getState();
  const claimId = state.claimdata.claimId;

  const token = await getClientCookie("accessToken");

  const payload = {
    claimId,
  };

  const claimcontentListRes: any = await claimContentList(payload, token);

  if (claimcontentListRes.result.status === 200) {
    const claimContentData = claimcontentListRes.result;
    store.dispatch(
      addClaimContentListData({ claimContentData: claimContentData, claimId })
    );
    return claimContentData;
  }
  return null;
};
