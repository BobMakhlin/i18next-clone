import React, { useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import {useAuth} from "../../store/auth-context";

const formReducer = (state, action) => {
  const stateCopy = { ...state };

  switch (action.type) {
    case "EMAIL_CHANGE":
      stateCopy.email = action.value;
      stateCopy.emailIsValid = null;
      break;
    case "PASSWORD_CHANGE":
      stateCopy.password = action.value;
      stateCopy.passwordIsValid = null;
      break;
    case "EMAIL_BLUR":
      stateCopy.emailIsValid = state.email.includes("@");
      break;
    case "PASSWORD_BLUR":
      stateCopy.passwordIsValid = state.password.trim().length > 6;
      break;
    default:
      throw new Error(`Unsupported action: ${action.type}`);
  }

  stateCopy.formIsValid =
    stateCopy.emailIsValid === true && stateCopy.passwordIsValid === true;

  return stateCopy;
};

const Login = (props) => {
  const {onLogin} = useAuth();

  const [formState, dispatchForm] = useReducer(formReducer, {
    email: "",
    emailIsValid: null,
    password: "",
    passwordIsValid: null,
    formIsValid: false,
  });

  const emailChangeHandler = (event) => {
    dispatchForm({ type: "EMAIL_CHANGE", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchForm({ type: "PASSWORD_CHANGE", value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchForm({ type: "EMAIL_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchForm({ type: "PASSWORD_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onLogin(formState.email, formState.password);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          isValid={formState.emailIsValid}
          id="email"
          type="email"
          label="E-Mail"
          value={formState.email}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          ref={emailInputRef}
        />
        <Input
          isValid={formState.passwordIsValid}
          id="password"
          type="password"
          label="Password"
          value={formState.password}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          ref={passwordInputRef}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
