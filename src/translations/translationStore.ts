enum translatePage {
  loginTranslate = "loginTranslate",
  forgotPasswordTranslate = "forgotPasswordTranslate",
  securityTranslate = "securityTranslate",
  securityQuestionTranslate = "securityQuestionTranslate",
  resetPasswordTranslate = "resetPasswordTranslate",
  claimDocumentsTranslate = "claimDocumentsTranslate",
  adjusterPropertyClaimActivityLog = "adjusterPropertyClaimActivityLog",
  addItemModalTranslate = "addItemModalTranslate",
  claimDetailsTranslate = "claimDetailsTranslate",
}

export type translatePageType = keyof typeof translatePage;
export default translatePage;
