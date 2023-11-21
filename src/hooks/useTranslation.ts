import { translatePageType } from "@/translations/translationStore";
import { useAppSelector } from "./reduxCustomHook";
import { useCallback, useLayoutEffect, useState } from "react";
import { getTranslate } from "@/translations";
import { Locale } from "@/i18n.config";

function useTranslation<T extends object>(path: translatePageType) {
  const [loading, setLoading] = useState(true);
  const [translate, setTranslate] = useState<T>();

  // @ts-expect-error Type 'string' is not assignable to type
  const locale: Locale = useAppSelector((state) => state.session?.lang);

  const fetchTranslation = useCallback(async () => {
    const data = await getTranslate(locale, path);
    setTranslate(data as T);
  }, [path, locale]);

  useLayoutEffect(() => {
    if (locale) {
      setLoading(false);
      fetchTranslation();
    }
  }, [locale, fetchTranslation]);

  return { translate, loading };
}

export default useTranslation;
