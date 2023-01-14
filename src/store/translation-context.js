import React, { useCallback, useState } from "react";

const DEFAULT_LOCALE = "en-US";
const LOCALES = ["en-US", "de-DE"];

const TranslationContext = React.createContext({
  locale: DEFAULT_LOCALE,
  availableLocales: LOCALES,
  changeLocale: () => {
    // By default is a dummy empty function.
  },
});

export const TranslationContextProvider = (props) => {
  const [locale, setLocale] = useState(DEFAULT_LOCALE);

  const changeLocale = useCallback((value) => {
    if (!LOCALES.includes(value)) {
      throw new Error(`Locale ${value} is not supported`);
    }

    setLocale(value);
  }, []);

  return (
    <TranslationContext.Provider
      value={{ locale, changeLocale, availableLocales: LOCALES }}
    >
      {props.children}
    </TranslationContext.Provider>
  );
};

export default TranslationContext;
