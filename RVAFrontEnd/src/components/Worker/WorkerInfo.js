import React, { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button";
import ModifyWindow from "../UI/ModifyWindow";
import classes from "./WorkerInfo.module.css"

const WorkerInfo = () => {
  const authCtx = useContext(AuthContext);

  const [isModify, setIsModify] = useState(false);
  const [modifyItem, setModifyItem] = useState(null);
  // const [currentFirstName, setCurrentFirstName] = useState(authCtx.user.firstName);
  // const [currentLastName, setCurrentLastName] = useState(authCtx.user.lastName);
  // const [currentFaculty, setCurrentFaculty] = useState("");
  // const [currentIndex, setCurrentIndex] = useState("");

  // useEffect(() => {
  //   if (authCtx.user.role === "scholar")
  //   {
  //     setCurrentFaculty(authCtx.user.facultyName);
  //     setCurrentIndex(authCtx.user.index);
  //   }
  // },[]);

  const clickModifyHandler = () => {
    setIsModify(true);
    setModifyItem(authCtx.user);
  };

  const cancelHandler = () => {
    setIsModify(false);
  }

  const fetchPutHandler = async (workerParams) => {
    try {
      const response = await fetch(
        "http://localhost:58817/api/Worker/" + authCtx.user.username,
        {
          method: "PUT",
          body: JSON.stringify(workerParams),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        //console.log(response.status);
        if (response.status === 404) {
          throw new Error("Worker not found!!!");
        }

        throw new Error("Error with modify product!!!");
      }

      const data = await response.json();

      authCtx.user.password = data.Password;
      authCtx.user.firstName = data.FirstName;
      authCtx.user.lastName = data.LastName;
      if (authCtx.user.role === "scholar") {
        authCtx.user.facultyName = data.FacultyName;
        authCtx.user.index = data.Index;
      }
    } catch (error) {
      alert(error.message);
    }
    setIsModify(false);
  };

  return (
    <React.Fragment>
      {isModify && (
        <ModifyWindow
          modify="worker"
          item={modifyItem}
          onCancel={cancelHandler}
          onModify={fetchPutHandler}
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