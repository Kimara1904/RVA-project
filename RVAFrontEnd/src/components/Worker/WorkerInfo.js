import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button";
import classes from "./WorkerInfo.module.css"

const WorkerInfo = () => {
    const authCtx = useContext(AuthContext);

    return (
      <div className={classes["worker-info"]}>
        <p>
          <b>Username: </b>
          {authCtx.user.username}
        </p>
        <p>
          <b>First Name: </b>
          {authCtx.user.firstName}
        </p>
        <p>
          <b>Last Name: </b>
          {authCtx.user.lastName}
        </p>
        <p>
          <b>Role: </b>
          {authCtx.user.role}
        </p>

        {authCtx.user.role === "scholar" && (
          <p>
            <b>Faculty: </b>
            {authCtx.user.facultyName}
          </p>
        )}

        {authCtx.user.role === "scholar" && (
          <p>
            <b>Index: </b>
            {authCtx.user.index}
          </p>
        )}

        <Button>Modify</Button>
      </div>
    );
};

export default WorkerInfo;