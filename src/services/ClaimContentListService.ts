import { getApiEndPoint } from "./ApiEndPointConfig";
import store from "@/store/store";
import { addClaimContentListData } from "@/reducers/ClaimData/ClaimContentSlice";
import HttpService from "@/HttpService";

export const claimContentList = async (payload: { claimId: string | any }) => {
  try {
    const url = getApiEndPoint("claimContentList");
    const http = new HttpService();
    const res = await http.post(url, payload);
    return res;
  } catch (error) {
    console.warn("claimContentList__err", error);
    throw error;
  }
};

export const claimContentListV2 = async (payload: { claimId: string }) => {
  try {
    const url = getApiEndPoint("claimContentList");
    const http = new HttpService({ isClient: true });
    const res = await http.post(url, payload);
    return res;
  } catch (error) {
    console.error("claimContentListV2__err", error);
    throw error;
  }
};

export const fetchClaimContentList = async () => {
  const state = store.getState();
  const claimId = state.claimdata.claimId;
  const payload = {
    claimId,
  };
  const claimcontentListRes: any = await claimContentList(payload);
  if (claimcontentListRes.result.status === 200) {
    const claimContentData = claimcontentListRes.result;
    store.dispatch(
      addClaimContentListData({ claimContentData: claimContentData, claimId })
    );
    return claimContentData;
  }
  return null;
};
