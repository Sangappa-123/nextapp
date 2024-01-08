enum translatePage {
  loginTranslate = "loginTranslate",
  forgotPasswordTranslate = "forgotPasswordTranslate",
  securityTranslate = "securityTranslate",
  securityQuestionTranslate = "securityQuestionTranslate",
  resetPasswordTranslate = "resetPasswordTranslate",
  adjusterPropertyClaimActivityLog = "adjusterPropertyClaimActivityLog",
}

export type translatePageType = keyof typeof translatePage;
export default translatePage;
