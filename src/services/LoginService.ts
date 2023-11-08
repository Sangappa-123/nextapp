import { getHeaderWithoutToken } from "@/utils/HeaderService";
import { getApiEndPoint } from "./ApiEndPointConfig";

export const GetVersionNumberData = async () => {
  const headersData: any = getHeaderWithoutToken();
  return new Promise((resolve, rejects) => {
    fetch(getApiEndPoint("buildInfo"), {
      method: "GET",
      cache: "no-cache",
      headers: headersData,
    })
      .then((response) => response.json())
      .then((result) => {
        const { data } = result;
        return resolve(data);
      })
      .catch((error) => {
        console.log("error::", error);
        rejects(error);
      });
  });
};

export const GetComponyLogo = async () => {
  const headersData: any = getHeaderWithoutToken();
  return new Promise((resolve, rejects) => {
    fetch(getApiEndPoint("companyLogo"), {
      method: "GET",
      cache: "no-cache",
      headers: headersData,
    })
      .then((response) => response.json())
      .then((result) => {
        const { data } = result;
        return resolve({ data });
      })
      .catch((error) => {
        console.log("error::", error);
        rejects({ error });
      });
  });
};

export const GetComponyBackgroundImage = async () => {
  const headersData: any = getHeaderWithoutToken();
  return new Promise((resolve, rejects) => {
    fetch(getApiEndPoint("companyLogoBackgroundImage"), {
      method: "GET",
      cache: "no-cache",
      headers: headersData,
    })
      .then((response) => response.json())
      .then((result) => {
        const { data } = result;
        return resolve({ data });
      })
      .catch((error) => {
        console.log("error::", error);
        rejects({ error });
      });
  });
};

export const login = (payload: object | undefined) => {
  const headersData: {} = getHeaderWithoutToken();
  console.log("payload", payload);

  return new Promise((resolve, rejects) => {
    fetch(getApiEndPoint("login"), {
      method: "POST",
      cache: "no-cache",
      headers: headersData,
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((result) => {
        const { data } = result;
        return resolve({ data });
      })
      .catch((error) => {
        console.log("error::", error);
        rejects({ error });
      });
  });
};
