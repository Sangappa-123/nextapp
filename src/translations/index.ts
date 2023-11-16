import { Locale, i18n } from "@/i18n.config";

const translate = {
  en: () => import("@/translations/loginTranslate/en").then((module) => module.default),
  nl: () =>
    import("@/translations/loginTranslate/nl.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
  translate[locale]?.() ?? translate[i18n.defaultLocale]();
