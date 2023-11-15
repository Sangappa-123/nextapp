/* eslint-disable no-unused-vars */
enum apiEndPoints {
  buildInfo = "application/buildinfo",
  companyLogo = "web/company-logo",
  companyLogoBackgroundImage = "web/company-backgroundImage",
  login = "web/login",
  securityQuestion = "web/get/security/questions",
  changePassword = "web/update/password",
  saveSecurityQuestion = "web/save/security/answer",
}

export const getApiEndPoint = (endpoint: keyof typeof apiEndPoints) => {
  const apiURL =
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}` +
    `${process.env.NEXT_PUBLIC_API_URL}` +
    apiEndPoints[endpoint];
  return apiURL;
};
