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
  notification = "web/notifications",
  scoreCard = "web/claims/scorecard?statusFlag=",
  deleteNotification = "web/delete/notification",
  immidiateAttentionClaims = "web/get/immediate/attention/claims?userId=",
  invoicelist = "web/get/company/invoicelist",
  urgentClaimUrl = "web/get/all/immediate/claims",
  pendingInvoiceUrl = "web/get/company/pending/invoicelist",
  claimContentList = "web/adjuster/claim/line/items",
  serviceRequest = "web/servicerequests",
  postEmail = "web/policyholder/info",
  getPolicyType = "web/policytypes?stateId=",
  detailsClaim = "web/claim/details",
  stateOption = "web/states",
  lossTypeOption = "web/claim/loss/types",
  homeOwnersType = "web/claim/get/category/coverage",
  excelcsvuploaddata = "web/read/postloss/items",
  itemsDetails = "web/claim/itemdetails",
  categoriesRequest = "web/categories",
  // subcategoriesReqUrl = "web/item/subcategories",
  replacementApi = "web/claim/search/replacement",
  savePolicy = "web/adjuster/create/policy",
  policyInfo = "web/policy/info",
  saveClaim = "web/adjuster/create/claim",
  deleteClaimContentListItem = "web/remove/postlossitem",
  lineItemCategory = "web/claim/get/category",
  lineItemSubCategory = "web/item/subcategories",
  lineItemCondition = "web/claim/get/condition",
  lineItemRoom = `customer/claim/{{CLAIM}}/rooms`,
  lineItemRetailer = "web/all/retailers",
  pendingTaskList = "web/claim/pendingtasklist",
  claimDetailMessageList = "web/messages",
  deleteServiceRequestItem = "web/delete/servicerequest",
  addItemsListTable = "web/claim/creation/line/items",
  importCsvTable = "web/import/postloss/items",
  claimParticipantsUrl = "web/claim/participants",
  claimContentsUrl = "web/adjuster/claim/contents",
  companyDetailsUrl = "web/company/details",
}

export const getApiEndPoint = (endpoint: keyof typeof apiEndPoints) => {
  const apiURL =
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}` +
    `${process.env.NEXT_PUBLIC_API_URL}` +
    apiEndPoints[endpoint];
  return apiURL;
};
