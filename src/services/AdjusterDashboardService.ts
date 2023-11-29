import { getApiEndPoint } from "./ApiEndPointConfig";
import HttpService from "@/HttpService";

export const getPendingVendorInvoices = async (param: number) => {
  try {
    const http = new HttpService();
    const url = getApiEndPoint("invoicelist");
    const resp: any = await http.post(url, param);
    const { data, error } = resp;
    if (data) {
      return data;
    }
    return error;
  } catch (err) {
    return err;
  }
};
// this.getImmediateClaims = function(userId){
//   var response = $http({
//       method: "GET",
//       url: AuthHeaderService.getApiURL() + "web/get/immediate/attention/claims?userId="+userId,
//       headers: AuthHeaderService.getHeader()
//   })
//   return response;
// }
export const getImmediateClaims = async (param: any) => {
  try {
    console.log("param", param);

    const http = new HttpService();
    const url = getApiEndPoint("immidiateAttentionClaims") + param;
    const resp: any = await http.get(url);
    const { response, error } = resp;
    console.log("respzzz==>", response);
    if (response) {
      return response;
    }
    return error;
  } catch (err) {
    return err;
  }
};
