import React, { useCallback, useState } from "react";

const DEFAULT_LOCALE = "en-US";
const LOCALES = ["en-US", "de-DE"];

const TranslationContext = React.createContext({
  locale: DEFAULT_LOCALE,
  availableLocales: LOCALES,
  changeLocale: () => {
    // By default is a dummy empty function.
  },
  translate: (key) => {
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

  const translate = useCallback((key) => {
    // A basic translation algorithm for demo purposes.

    console.log("translate. key:", key);

    if (key === "common.greeting") {
      if (locale === "en-US") {
        return "Hello";
      }
      if (locale === "de-DE") {
        return "Hallo";
      }
    }
  }, [locale]);

  return (
    <TranslationContext.Provider
      value={{ locale, availableLocales: LOCALES, changeLocale, translate }}
    >
      {props.children}
    </TranslationContext.Provider>
  );
};

export default TranslationContext;
