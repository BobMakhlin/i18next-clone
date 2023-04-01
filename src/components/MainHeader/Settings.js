import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import ThemeContext from "../../store/theme-context";
import { useTranslation } from "../../store/translation-context";
import { DropDownList } from "../UI/DropDownList/DropDownList";

const Settings = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { changeTheme, themesAvailable, theme } = useContext(ThemeContext);
  const { changeLocale, availableLocales, locale } = useTranslation();

  return (
    <nav>
      {isLoggedIn && (
        <DropDownList
          items={themesAvailable}
          selectedItem={theme}
          onChange={changeTheme}
        />
      )}
      {isLoggedIn && (
        <DropDownList
          items={availableLocales}
          selectedItem={locale}
          onChange={changeLocale}
        />
      )}
    </nav>
  );
};

export default Settings;
