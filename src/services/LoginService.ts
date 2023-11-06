import { getHeaderWithoutToken } from "@/utils/HeaderService";
import { getApiEndPoint } from "./ApiEndPointConfig";

export async function GetVersionNumberData() {
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
}

export async function GetComponyLogo() {
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
}

export async function GetComponyBackgroundImage() {
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
}
