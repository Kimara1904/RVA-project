import React, { useContext, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./Login.module.css"

const Login = () => {
  const [username, setUsername] = useState("");
  const [isErrorUsername, setIsErrorUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [isErrorPassword, setIsErrorPassword] = useState(false);

  const authCtx = useContext(AuthContext);

  const usernameRef = useRef();
  const passwordRef = useRef();

  const changeUsernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let usernameError = false;
    let passwordError = false;
    setIsErrorUsername(false);
    setIsErrorPassword(false);

    if (username.length === 0) {
      setIsErrorUsername(true);
      usernameError = true;
    }
    if (password.length === 0) {
      setIsErrorPassword(true);
      passwordError = true;
    }

    if (usernameError) {
      usernameRef.current.focus();
    } else if (passwordError) {
      passwordRef.current.focus();
    } else {
      authCtx.onLogin(username, password);

      if (!authCtx.isLoggedIn) {
        setUsername("");
        setPassword("");
      }
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={usernameRef}
          type="text"
          id="username"
          label="Username"
          value={username}
          errorMessage="Username is required!!!"
          isError={isErrorUsername}
          onChange={changeUsernameHandler}
        />
        <Input
          ref={passwordRef}
          type="password"
          id="password"
          label="Password"
          value={password}
          errorMessage="Password is required!!!"
          isError={isErrorPassword}
          onChange={changePasswordHandler}
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
