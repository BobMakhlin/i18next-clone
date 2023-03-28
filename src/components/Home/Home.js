import React, { useContext, useMemo } from 'react';
import AuthContext from '../../store/auth-context';
import ThemeContext from '../../store/theme-context';
import TranslationContext from '../../store/translation-context';
import Button from '../UI/Button/Button';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';

const Home = () => {
  const authCtx = useContext(AuthContext);
  const themeCtx = useContext(ThemeContext);
  const localeCtx = useContext(TranslationContext);

  console.log('Home is being redrawn. Locale:', localeCtx.locale);

  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={authCtx.onLogout}>Logout</Button>
      <p>Theme is {themeCtx.theme}</p>
      <p>Locale is {localeCtx.locale}</p>
      <p>{localeCtx.translate('common.greeting')}</p>
    </Card>
  );
};

export default Home;
