enum translatePage {
  loginTranslate = "loginTranslate",
  forgotPasswordTranslate = "forgotPasswordTranslate",
}

export type translatePageType = keyof typeof translatePage;
export default translatePage;
