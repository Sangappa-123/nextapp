import { getHeaderWithoutToken, getHeader } from "@/utils/HeaderService";
import { getApiEndPoint } from "./ApiEndPointConfig";

export const fetchSecurityQuestions = (token: string) => {
  const headersData: {} = getHeaderWithoutToken();
  // const headersData: {} = getHeader();
  return new Promise((resolve, rejects) => {
    fetch(getApiEndPoint("securityQuestion"), {
      method: "GET",
      headers: { ...headersData, "X-Auth-Token": token },
      // headers: headersData
    })
      .then((response) => response.json())
      .then((result) => {
        const { data } = result;
        return resolve({ data });
      })
      .catch((error) => rejects({ error }));
  });
};

export const changePassword = async (payload: any) => {
  const headersData: {} = getHeader();
  return new Promise((resolve, rejects) => {
    fetch(getApiEndPoint("changePassword"), {
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

export const saveSecurityQuestion = async (payload: any) => {
  const headersData: {} = getHeader();
  return new Promise((resolve, rejects) => {
    fetch(getApiEndPoint("saveSecurityQuestion"), {
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
