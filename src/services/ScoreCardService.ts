import { getApiEndPoint } from "./ApiEndPointConfig";
import HttpService from "@/HttpService";

export const getClaimScoreCard = async (param: any, isClient: boolean = false) => {
  try {
    const http = new HttpService({ isClient });
    const url = getApiEndPoint("scoreCard") + param;
    const resp: any = await http.get(url);
    const { response, error } = resp;
    if (response) {
      return response;
    }
    return error;
  } catch (err) {
    return err;
  }
};
