export const addLocalStorageData = (response: any) => {
  const { data } = response;
  window.localStorage.setItem("IsLogined", "true");
  window.localStorage.setItem("AccessToken", data.token);
  window.localStorage.setItem("UserName", data.email);
  window.localStorage.setItem("UserLastName", data.lastName);
  window.localStorage.setItem("Name", data.lastName + ", " + data.firstName);
  window.localStorage.setItem("Office", response?.data?.office);
  window.localStorage.setItem("UserId", data.userId);

  if (data.branchDetails != null) {
    window.localStorage.setItem("BranchCode", data.branchDetails.branchCode);
    window.localStorage.setItem("BranchId", data.branchDetails.branchId);
  }
  if (
    data.companyDetails &&
    data.companyDetails !== null &&
    data.companyDetails !== undefined
  ) {
    window.localStorage.setItem(
      "InsuranceCompanyName",
      data.companyDetails.name
    );
  }

  //sessionStorage.setItem("Password", password);
  window.localStorage.setItem("UserType", data.loggedinUserType);
  window.localStorage.setItem(
    "CompanyId",
    data.companyDetails ? data.companyDetails.id : ""
  );
  window.localStorage.setItem(
    "CRN",
    data.companyDetails ? data.companyDetails.crn : ""
  );
  if (data.vendorDetails !== null && data.vendorDetails !== undefined) {
    window.localStorage.setItem("VendorId", data.vendorDetails.vendorId);
  }
  if (data.role.length > 0) {
    window.localStorage.setItem("RoleList", data.role[0]?.roleName);
  }
  // else window.localStorage.setItem("VendorId", null);
};
