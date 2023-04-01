import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import ThemeContext from '../../store/theme-context';
import { useTranslation } from '../../store/translation-context';
import Button from '../UI/Button/Button';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';

const Home = () => {
  const authCtx = useContext(AuthContext);
  const themeCtx = useContext(ThemeContext);
  const {locale, t} = useTranslation();

  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={authCtx.onLogout}>Logout</Button>
      <p>Theme is {themeCtx.theme}</p>
      <p>Locale is {locale}</p>
      <p>{t('common.greeting')}</p>
    </Card>
  );
};

export default Home;
