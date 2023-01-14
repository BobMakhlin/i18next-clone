import { useCallback, useContext } from "react";
import AuthContext from "../../store/auth-context";
import ThemeContext from "../../store/theme-context";
import TranslationContext from "../../store/translation-context";
import { DropDownList } from "../UI/DropDownList/DropDownList";

const Settings = () => {
  const authCtx = useContext(AuthContext);
  const themeCtx = useContext(ThemeContext);
  const localeCtx = useContext(TranslationContext);

  const { changeTheme } = themeCtx;
  const { changeLocale } = localeCtx;

  const handleThemeChange = useCallback(
    (value) => {
      changeTheme(value);
    },
    [changeTheme]
  );
  const handleLocaleChange = useCallback(
    (value) => {
      changeLocale(value);
    },
    [changeLocale]
  );

  return (
    <nav>
      {authCtx.isLoggedIn && (
        <DropDownList
          items={themeCtx.themesAvailable}
          selectedItem={themeCtx.theme}
          onChange={handleThemeChange}
        />
      )}
      {authCtx.isLoggedIn && (
        <DropDownList
          items={localeCtx.availableLocales}
          selectedItem={localeCtx.locale}
          onChange={handleLocaleChange}
        />
      )}
    </nav>
  );
};

export default Settings;
