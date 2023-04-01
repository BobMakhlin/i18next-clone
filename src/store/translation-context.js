import React, {
  useContext,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

const LOCALE_LOCAL_STORAGE_KEY = "locale";
const DEFAULT_LOCALE = "en-US";
const LOCALES = ["en-US", "de-DE"];

const TranslationContext = createContext({
  locale: null,
  availableLocales: LOCALES,
  changeLocale: () => {
    // By default is a dummy empty function.
  },
  t: (key) => {
    // By default is a dummy empty function.
  },
});

const TranslationContextProvider = (props) => {
  const [locale, setLocale] = useState(null);
  const [currentVocabulary, setCurrentVocabulary] = useState(null);

  const changeLocale = useCallback(
    (value) => {
      if (!LOCALES.includes(value)) {
        value = DEFAULT_LOCALE;
      }

      if (locale === value) {
        return;
      }

      fetch(`languages/${value}.json`)
        .then((response) => response.json())
        .then((x) => setCurrentVocabulary(x));

      setLocale(value);
      localStorage.setItem(LOCALE_LOCAL_STORAGE_KEY, value);
    },
    [locale]
  );

  useEffect(() => {
    changeLocale(
      localStorage.getItem(LOCALE_LOCAL_STORAGE_KEY) ?? DEFAULT_LOCALE
    );
  }, []); // Should only be called on mount.

  const t = useCallback(
    (key) => {
      return currentVocabulary ? currentVocabulary[key] : null;
    },
    [currentVocabulary]
  );

  const contextValue = {
    locale, // The current locale.
    availableLocales: LOCALES,
    changeLocale,
    t,
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {props.children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
export default TranslationContextProvider;
