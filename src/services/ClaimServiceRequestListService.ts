import { getHeaderWithoutToken } from "@/utils/HeaderService";
import { getApiEndPoint } from "./ApiEndPointConfig";
import store from "@/store/store";
import { updateServiceRequestVisibleData } from "@/reducers/ClaimData/ClaimServiceRequestSlice";
import { sortBy } from "lodash";
import { TABLE_LIMIT_5 } from "@/constants/constants";

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

export const fetchServiceRequestList = async (
  pageNumber = 0,
  pageLimit = TABLE_LIMIT_5,
  sortByvalue = "",
  orderBy = "asc",
  searchKeyword = ""
) => {
  console.log("searchKeyword", searchKeyword);
  const state = store.getState();
  const claimServiceRequestListTotalData =
    state.claimServiceRequestdata.claimServiceRequestListTotalData;

  const searchWord = searchKeyword ?? state.claimServiceRequestdata.searchKeyword;

  const newclaimResult = claimServiceRequestListTotalData.filter((obj) =>
    JSON.stringify(obj).toLowerCase().includes(searchWord.toLowerCase())
  );
  console.log("After searchKeyword", newclaimResult);

  let sortedData;
  if (orderBy === "asc") {
    sortedData = sortBy(newclaimResult, sortByvalue);
  } else {
    sortedData = sortBy(newclaimResult, sortByvalue).reverse();
  }
  const start = pageNumber * pageLimit;
  const end = start + pageLimit;

  const claimServiceRequestList = sortedData.slice(start, end);

  console.log("After searchKeyword claimServiceRequestList", claimServiceRequestList);

  store.dispatch(updateServiceRequestVisibleData({ claimServiceRequestList }));

  return claimServiceRequestList;
};
