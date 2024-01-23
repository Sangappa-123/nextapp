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
  roomTypeApi = "web/room/types",
  addContentItemApi = "web/add/itemtopostloss",
  claimParticipantsUrl = "web/claim/participants",
  claimContentsUrl = "web/adjuster/claim/contents",
  companyDetailsUrl = "web/company/details",
  addNewRoomApi = "customer/add/room",
  updateContentItemApi = "web/claim/update/postlossitem",
  activityLogHistoryApi = "web/claim/assignment/history",
  downloadActivityLogApi = "web/export/claim_log/pdf",
  uploadActivityLogDataApi = "web/claim/add/custom/activitylog",
  pushNoteApiUrl = "web/push/note",
  claimSettlementApiUrl = "web/calculate/claim/settlement?claim=",
  detailedInventoryReport = "web/report/claim/items/statistics/?claimNum=",
  detailedInventoryReportSend = "web/report/send/mail/contentSummary",
  policyholderPayouts = "web/report/claim/itemcost/statistics",
  paymentSummaryTable = "web/report/claim/item/payment/statistics",
  coverageSummaryReport = "web/report/claim/category/statistics",
  detailedInventoryReportPDF = "web/claim/settlement/PDF",
  coverageSummaryReportPDF = "web/export/claim/category/statistics",
  detailedInventoryReportExcel = "web/export/detailed/inventory",
  newCustomComparable = "web/add/custom/item",
  deleteCustomItemApi = "web/delete/custom/item?id={{COMPARABLE_ID}}",
  mapperClaimedItems = "web/claim/line/items",
  updateCliamCategory = "web/bulk/update/item/category",
  updateCliamStatus = "web/bulk/update/item/status",
  updatePaidStatus = "web/claim/items/paid",
  updateUnderReview = "web/review/claim/supervisor",
  reviewItemSupervisor = "web/review/item/supervisor",
  taskListApiUrl = "web/claim/tasklist/home",
  createTaskApiUrl = "web/claim/create/task",
  assignVendorGet = "web/registered/vendors",
  vendorAssignmentsApiUrl = "web/claim/assignment/vendorassignments",
  selectVendorServicesApi = "web/assignment/vendor/details",
  submitVendorApi = "web/assignment/vendor",
  deleteLineItemReceiptAttachment = "web/delete/attachment/{{IMAGE_ID}}/purpose/{{PURPOSE}}",
  updateClaimDetailApiUrl = "web/claim/update/claimdetails",
  receiptApi = "web/upload/receipt",
  receiptMapperDateApi = "web/pdf/list/date",
}

export const getApiEndPoint = (endpoint: keyof typeof apiEndPoints) => {
  const apiURL =
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}` +
    `${process.env.NEXT_PUBLIC_API_URL}` +
    apiEndPoints[endpoint];
  return apiURL;
};
