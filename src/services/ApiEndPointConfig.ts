enum apiEndPoints {
  buildInfo = "application/buildinfo",
  companyLogo = "web/company-logo",
  companyLogoBackgroundImage = "web/company-backgroundImage",
  login = "web/login",
}

export const getApiEndPoint = (endpoint: keyof typeof apiEndPoints) => {
  const apiURL =
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}` +
    `${process.env.NEXT_PUBLIC_API_URL}` +
    apiEndPoints[endpoint];
  return apiURL;
};
