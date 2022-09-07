import React, { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button";
import ModifyWindow from "../UI/ModifyWindow";
import classes from "./WorkerInfo.module.css"

const WorkerInfo = () => {
  const [isModify, setIsModify] = useState(false);
  const [modifyItem, setModifyItem] = useState(null);
  const authCtx = useContext(AuthContext);

  const clickModifyHandler = () => {
    setIsModify(true);
    setModifyItem(authCtx.user);
  };

  const cancelHandle = () => {
    setIsModify(false);
  }

  return (
    <React.Fragment>
      {isModify && (
        <ModifyWindow
          modify="worker"
          item={modifyItem}
          onCancel={cancelHandle}
        />
      )}
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

        <Button onClick={clickModifyHandler}>Modify</Button>
      </div>
    </React.Fragment>
  );
};

export default WorkerInfo;