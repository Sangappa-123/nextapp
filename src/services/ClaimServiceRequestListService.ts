import { getHeaderWithoutToken } from "@/utils/HeaderService";
import { getApiEndPoint } from "./ApiEndPointConfig";
import store from "@/store/store";
import { addserviceRequestData } from "@/reducers/ClaimData/ClaimServiceRequestSlice";
import { getClientCookie } from "@/utils/utitlity";

interface objectType {
  [key: string | number]: any;
}
export const serviceRequestList = async (
  payload: any,
  token: any
): Promise<objectType> => {
  const headersData: object = getHeaderWithoutToken();
  return new Promise((resolve, rejects) => {
    fetch(getApiEndPoint("serviceRequest"), {
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

  const serviceRequestRes: any = await serviceRequestList(payload, token);

  if (serviceRequestRes.result.status === 200) {
    const claimserviceRequestData = serviceRequestRes.result;
    store.dispatch(
      addserviceRequestData({ claimserviceRequestData: claimserviceRequestData })
    );
    return claimserviceRequestData;
  }
  return null;
};
