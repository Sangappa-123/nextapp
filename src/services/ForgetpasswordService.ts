import { getHeader } from "@/utils/HeaderService";
import { getApiEndPoint } from "./ApiEndPointConfig";

export const forgotPassword = async (payload: any) => {
  const headersData: {} = getHeader();
  return new Promise((resolve, rejects) => {
    fetch(getApiEndPoint("forgotPassword"), {
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
