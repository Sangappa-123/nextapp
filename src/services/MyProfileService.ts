import { getHeaderWithoutToken } from "@/utils/HeaderService";
import { getApiEndPoint } from "./ApiEndPointConfig";

const fetchSecurityQuestions = (token: string) => {
  const headersData: {} = getHeaderWithoutToken();

  return new Promise((resolve, rejects) => {
    fetch(getApiEndPoint("securityQuestion"), {
      method: "GET",
      headers: { ...headersData, "X-Auth-Token": token },
    })
      .then((response) => response.json())
      .then((result) => {
        const { data } = result;
        return resolve({ data });
      })
      .catch((error) => rejects({ error }));
  });
};

export { fetchSecurityQuestions };
