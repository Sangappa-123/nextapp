/* eslint-disable no-unused-vars */
enum apiEndPoints {
  buildInfo = "application/buildinfo",
  companyLogo = "web/company-logo",
  companyLogoBackgroundImage = "web/company-backgroundImage",
  login = "web/login",
  securityQuestion = "web/get/security/questions",
  changePassword = "web/update/password",
  saveSecurityQuestion = "web/save/security/answer",
  forgotPassword = "customer/forgetpassword",
  randomQuestion = "web/get/selected/question/",
  verifySecurityQuestion = "web/verify/security/answer/",
  claimList = "web/open/claims",
  claimContentList = "web/adjuster/claim/line/items",
  notification = "web/notifications",
  scoreCard = "web/claims/scorecard?statusFlag=",
  deleteNotification = "web/delete/notification",
  immidiateAttentionClaims = "web/get/immediate/attention/claims?userId=",
  invoicelist = "web/get/company/invoicelist",
}

export const getApiEndPoint = (endpoint: keyof typeof apiEndPoints) => {
  const apiURL =
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}` +
    `${process.env.NEXT_PUBLIC_API_URL}` +
    apiEndPoints[endpoint];
  return apiURL;
};
