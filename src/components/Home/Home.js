import React, { useContext } from "react";
import { useAuth } from "../../store/auth-context";
import { useTheme } from "../../store/theme-context";
import { useTranslation } from "../../store/translation-context";
import Button from "../UI/Button/Button";

import Card from "../UI/Card/Card";
import classes from "./Home.module.css";

const Home = () => {
  const { onLogout } = useAuth();
  const {theme} = useTheme();
  const { locale, t } = useTranslation();

  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={onLogout}>Logout</Button>
      <p>Theme is {theme}</p>
      <p>Locale is {locale}</p>
      <p>{t("common.greeting")}</p>
    </Card>
  );
};

export default Home;
