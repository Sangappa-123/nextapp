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
    console.log("url--------", url);
    url = `${url}${param?.claimNum}&page=${param?.pageNo}&limit=${param?.recordPerPage}&sort_by=&order_by=asc`;
    const resp = await http.get(url);
    console.log("resp", resp);
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
    console.log("url $$$", url, payload);
    url = `${url}`;
    const resp = await http.post(url, payload);
    console.log("resp", resp);
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
    console.log("url $$$", url, payload);
    url = `${url}`;
    const resp = await http.post(url, payload);
    console.log("resp", resp);
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
    console.log("url $$$", url, payload);
    url = `${url}`;
    const resp = await http.post(url, payload);
    console.log("resp", resp);
    return resp;
  } catch (err: any) {
    return null;
  }
};

export const searchDetailedInventory = async (searchKeyword = "") => {
  const state = store.getState();
  const searchWord = searchKeyword ?? state.detailedInventorydata.searchKeyword;
  if (searchWord !== "") {
    console.log("searchKeyword", searchKeyword);
    const detailedInventoryListDataFull =
      state.detailedInventorydata.detailedInventoryListDataFull;

    const detailedInventoryListData = await detailedInventoryListDataFull.filter((obj) =>
      JSON.stringify(obj).toLowerCase().includes(searchWord.toLowerCase())
    );
    console.log("detailedInventoryListData", detailedInventoryListData);
    store.dispatch(updateDetailedInventoryListData({ detailedInventoryListData }));
    return detailedInventoryListData;
  } else {
    console.log("searchKeyword empty", searchKeyword);
    const detailedInventoryListAPIData =
      state.detailedInventorydata.detailedInventoryListAPIData;
    const detailedInventoryListData = await detailedInventoryListAPIData;
    console.log("detailedInventoryListData", detailedInventoryListData);
    store.dispatch(updateDetailedInventoryListData({ detailedInventoryListData }));
    return detailedInventoryListData;
  }
};

export const getDetailInventoryPDF = async function (param) {
  try {
    const http = new HttpService({ isClient: true });
    let url = getApiEndPoint("detailedInventoryReportPDF");
    console.log("url $$$", url, param);
    url = `${url}`;
    const resp = await http.postFile(url, param);
    console.log("resp", resp);
    return resp;
  } catch (err: any) {
    return null;
  }
};

export const getCoverageSummaryPDF = async function (param) {
  try {
    const http = new HttpService({ isClient: true });
    let url = getApiEndPoint("coverageSummaryReportPDF");
    console.log("url $$$", url, param);
    url = `${url}`;
    const resp = await http.postFile(url, param);
    console.log("resp", resp);
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
    console.log("url $$$", url, param);
    url = `${url}`;
    const resp = await http.getFile(url);
    console.log("resp000", resp);
    return resp;
  } catch (err: any) {
    console.log("resp111");
    return null;
  }
};

export const getSendDetailedInventory = async function (param) {
  try {
    const http = new HttpService({ isClient: true });
    let url =
      getApiEndPoint("detailedInventoryReportSend") + "?claimNumber=" + param.claimNumber;
    console.log("url $$$", url, param);
    url = `${url}`;
    const resp = await http.getFile(url);
    console.log("resp000", resp);
    return resp;
  } catch (err: any) {
    console.log("resp111");
    return null;
  }
};
