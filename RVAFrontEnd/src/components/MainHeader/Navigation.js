import React, { useContext  } from "react";
import AuthContext from "../../store/auth-context";
import ContentContext from "../../store/content-context";
import Button from "../UI/Button";
import classes from "./Navigation.module.css"

const Navigation = () => {
    const contentContext = useContext(ContentContext);
    const authCtx = useContext(AuthContext);

    const clickHandler = () => {
      authCtx.onLogout();
    };

    let content = <Button onClick={contentContext.onWorker}>Workers</Button>;

    if (contentContext.content === "worker")
    {
        content = (
          <Button onClick={contentContext.onProduction}>Production</Button>
        );
    }

    return (
      <nav className={classes.nav}>
        {authCtx.isLoggedIn && content}
        {authCtx.isLoggedIn && <Button onClick={clickHandler}>Logout</Button>}
        {authCtx.isLoggedIn && <label>{authCtx.user.firstName + " " + authCtx.user.lastName}</label>}
      </nav>
    );
};

export default Navigation;