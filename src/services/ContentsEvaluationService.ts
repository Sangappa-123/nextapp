import { getApiEndPoint } from "./ApiEndPointConfig";
import HttpService from "@/HttpService";
import store from "@/store/store";
import { updateDetailedInventoryListData } from "@/reducers/ContentsEvaluation/DetailedInventorySlice";
// interface objectType {
//     [key: string | number]: any;
//   }
export const getDetailedInventory = async (
  param: {
    pageNo: number;
    recordPerPage: number;
    claimNum: string;
  },
  isClient?: boolean
) => {
  try {
    const http = new HttpService({ isClient });

    let url = getApiEndPoint("detailedInventoryReport");
    url = `${url}${param?.claimNum}&page=${param?.pageNo}&limit=${param?.recordPerPage}&sort_by=&order_by=asc`;
    const resp = await http.get(url);
    return resp;
  } catch (err: any) {
    return null;
  }
};

export const getCoverageSummary = async (
  payload: { claimNumber: string },
  isClient?: boolean
) => {
  try {
    const http = new HttpService({ isClient });
    let url = getApiEndPoint("coverageSummaryReport");
    url = `${url}`;
    const resp = await http.post(url, payload);
    return resp;
  } catch (err: any) {
    return null;
  }
};

export const getPolicyholderPayouts = async (
  payload: { claimNumber: string },
  isClient?: boolean
) => {
  try {
    const http = new HttpService({ isClient });
    let url = getApiEndPoint("policyholderPayouts");
    url = `${url}`;
    const resp = await http.post(url, payload);
    return resp;
  } catch (err: any) {
    return null;
  }
};

export const getPolicySummary = async (
  payload: { claimNumber: string },
  isClient?: boolean
) => {
  try {
    const http = new HttpService({ isClient });
    let url = getApiEndPoint("paymentSummaryTable");
    url = `${url}`;
    const resp = await http.post(url, payload);
    return resp;
  } catch (err: any) {
    return null;
  }
};

export const searchDetailedInventory = async (searchKeyword = "") => {
  const state = store.getState();
  const searchWord = searchKeyword ?? state.detailedInventorydata.searchKeyword;
  if (searchWord !== "") {
    const detailedInventoryListDataFull =
      state.detailedInventorydata.detailedInventoryListDataFull;

    const detailedInventoryListData = await detailedInventoryListDataFull.filter((obj) =>
      JSON.stringify(obj).toLowerCase().includes(searchWord.toLowerCase())
    );
    store.dispatch(updateDetailedInventoryListData({ detailedInventoryListData }));
    return detailedInventoryListData;
  } else {
    const detailedInventoryListAPIData =
      state.detailedInventorydata.detailedInventoryListAPIData;
    const detailedInventoryListData = await detailedInventoryListAPIData;
    store.dispatch(updateDetailedInventoryListData({ detailedInventoryListData }));
    return detailedInventoryListData;
  }
};

export const getDetailInventoryPDF = async function (param) {
  try {
    const http = new HttpService({ isClient: true });
    let url = getApiEndPoint("detailedInventoryReportPDF");
    url = `${url}`;
    const resp = await http.getFileByPayload(url, param);
    return resp;
  } catch (err: any) {
    return null;
  }
};

export const getCoverageSummaryPDF = async function (param) {
  try {
    const http = new HttpService({ isClient: true });
    let url = getApiEndPoint("coverageSummaryReportPDF");
    url = `${url}`;
    const resp = await http.getFileByPayload(url, param);
    return resp;
  } catch (err: any) {
    return null;
  }
};

export const getDetailInventoryExcel = async function (param) {
  try {
    const http = new HttpService({ isClient: true });
    let url =
      getApiEndPoint("detailedInventoryReportExcel") +
      "?claim=" +
      param.claimNumber +
      "&format=" +
      param.format;
    url = `${url}`;
    const resp = await http.getFile(url);
    return resp;
  } catch (err: any) {
    return null;
  }
};

export const getSendDetailedInventory = async function (param) {
  try {
    const http = new HttpService({ isClient: true });
    let url =
      getApiEndPoint("detailedInventoryReportSend") + "?claimNumber=" + param.claimNumber;
    url = `${url}`;
    const resp = await http.get(url);
    return resp;
  } catch (err: any) {
    return null;
  }
};
