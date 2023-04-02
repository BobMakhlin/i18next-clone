import { useContext } from "react";
import {useAuth} from "../../store/auth-context";
import { useTheme } from "../../store/theme-context";
import { useTranslation } from "../../store/translation-context";
import { DropDownList } from "../UI/DropDownList/DropDownList";

const Settings = () => {
  const { isLoggedIn } = useAuth();
  const { changeTheme, themesAvailable, theme } = useTheme();
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
