export const addLocalStorageData = (response: any) => {
  const { data } = response;
  localStorage.setItem("isLogined", "true");
  localStorage.setItem("accessToken", data.token);
  localStorage.setItem("userName", data.email);
  localStorage.setItem("userLastName", data.lastName);
  localStorage.setItem("name", data.lastName + ", " + data.firstName);
  localStorage.setItem("office", data?.office);
  localStorage.setItem("userId", data.userId);

  // for first time login, and forgot password flow
  localStorage.setItem("resetPassword", data?.resetPassword);
  localStorage.setItem("forgotPassword", data?.forgotPassword);
  localStorage.setItem("securityQuestionsExists", data?.securityQuestionsExists);

  const maxAge = 60 * 60 * 24 * 7; // 7 days

  document.cookie = `resetPassword=${data?.resetPassword};max-age=${maxAge}`;
  document.cookie = `forgotPassword=${data?.forgotPassword};max-age=${maxAge}`;
  document.cookie = `securityQuestionsExists=${data?.securityQuestionsExists};max-age=${maxAge}`;
  document.cookie = `accessToken=${data?.token};max-age=${maxAge}`;

  // const expiryDuration =  60 * 2;
  // document.cookie = `accessToken=${data?.token}; max-age=${expiryDuration}; path=/;`;

  if (data.branchDetails != null) {
    window.localStorage.setItem("branchCode", data.branchDetails.branchCode);
    window.localStorage.setItem("branchId", data.branchDetails.branchId);
  }
  if (
    data.companyDetails &&
    data.companyDetails !== null &&
    data.companyDetails !== undefined
  ) {
    window.localStorage.setItem("insuranceCompanyName", data.companyDetails.name);
  }

  //sessionStorage.setItem("Password", password);
  window.localStorage.setItem("userType", data.loggedinUserType);
  window.localStorage.setItem(
    "companyId",
    data.companyDetails ? data.companyDetails.id : ""
  );
  window.localStorage.setItem("CRN", data.companyDetails ? data.companyDetails.crn : "");
  if (data.vendorDetails !== null && data.vendorDetails !== undefined) {
    window.localStorage.setItem("vendorId", data.vendorDetails.vendorId);
  }
  if (data.role.length > 0) {
    window.localStorage.setItem("roleList", data.role[0]?.roleName);
  }
  // else window.localStorage.setItem("VendorId", null);
};
