import React, { useCallback, useEffect, useState } from "react";

const DEFAULT_LOCALE = "en-US";
const LOCALES = ["en-US", "de-DE"];
const DEFAULT_VOCABULARIES = {
  "en-US": {},
  "de-DE": {},
};

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
  const [vocabularies, setVocabularies] = useState(DEFAULT_VOCABULARIES);

  useEffect(() => {
    const fetchVocabularies = async () => {
      const [enUs, deDe] = await Promise.all([
        fetch("languages/en-US.json").then((response) => response.json()),
        fetch("languages/de-DE.json").then((response) => response.json()),
      ]);

      setVocabularies({ "en-US": enUs, "de-DE": deDe });
    };

    fetchVocabularies();
  }, []);

  const changeLocale = useCallback((value) => {
    if (!LOCALES.includes(value)) {
      throw new Error(`Locale ${value} is not supported`);
    }

    setLocale(value);
  }, []);

  const translate = useCallback(
    (key) => {
      return vocabularies[locale][key];
    },
    [locale, vocabularies]
  );

  return (
    <TranslationContext.Provider
      value={{ locale, availableLocales: LOCALES, changeLocale, translate }}
    >
      {props.children}
    </TranslationContext.Provider>
  );
};

export default TranslationContext;
