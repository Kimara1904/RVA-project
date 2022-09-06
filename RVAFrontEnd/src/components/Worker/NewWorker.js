import React, { useContext, useRef, useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Card from "../UI/Card";
import AuthContext from "../../store/auth-context";
import classes from "./NewWorker.module.css"

const NewWorker = (props) => {
  //States booleans
  const [isScholar, setIsScholar] = useState(false);
  const [usernameIsError, setUsernameIsError] = useState(false);
  const [passwordIsError, setPasswordIsError] = useState(false);
  const [firstNameIsError, setFirstNameIsError] = useState(false);
  const [lastNameIsError, setLastNameIsError] = useState(false);
  const [facultyIsError, setFacultyIsError] = useState(false);
  const [indexIsError, setIndexIsError] = useState(false); 

  //States values
  const [enteredUsername, setEnteredUsername] = useState("");   
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredFaculty, setEnteredFaculty] = useState("");
  const [enteredIndex, setEnteredIndex] = useState(""); 

  //Refs
  const usernameRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const facultyRef = useRef();
  const indexRef = useRef();

  //Context
  const authCtx = useContext(AuthContext);

  //Functions
  const changeCheckBoxHandler = () => {
    return setIsScholar(!isScholar);
  };

  const changeUsernameHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const changePasswordHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const changeFirstNameHandler = (event) => {
    setEnteredFirstName(event.target.value);
  };

  const changeLastNameHandler = (event) => {
    setEnteredLastName(event.target.value);
  };

  const changeFacultyHandler = (event) => {
    setEnteredFaculty(event.target.value);
  };

  const changeIndexHandler = (event) => {
    setEnteredIndex(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    let usernameError = false;
    let passwordError = false;
    let firstNameError = false;
    let lastNameError = false;
    let facultyError = false;
    let indexError = false;
    setUsernameIsError(false);
    setPasswordIsError(false);
    setFirstNameIsError(false);
    setLastNameIsError(false);
    setFacultyIsError(false);
    setIndexIsError(false);

    if (enteredUsername.length === 0) {
      usernameError = true;
      setUsernameIsError(true);
    }
    if (enteredPassword.length === 0) {
      passwordError = true;
      setPasswordIsError(true);
    }
    if (enteredFirstName.length === 0) {
      firstNameError = true;
      setFirstNameIsError(true);
    }
    if (enteredLastName.length === 0) {
      lastNameError = true;
      setLastNameIsError(true);
    }
    if (isScholar && enteredFaculty.length === 0) {
      facultyError = true;
      setFacultyIsError(true);
    }
    if (isScholar && enteredFaculty.length === 0) {
      indexError = true;
      setIndexIsError(true);
    }

    if (usernameError) {
      usernameRef.current.focus();
    } else if (passwordError) {
      passwordRef.current.focus();
    } else if (firstNameError) {
      firstNameRef.current.focus();
    } else if (lastNameError) {
      lastNameRef.current.focus();
    } else if (facultyError) {
      facultyRef.current.focus();
    } else if (indexError) {
      indexRef.current.focus();
    } else {
      const workerParam = {
        username: enteredUsername,
        password: enteredPassword,
        firstName: enteredFirstName,
        lastName: enteredLastName,
        role: isScholar ? "scholar" : "worker",
        faculty: enteredFaculty,
        index: enteredIndex,
        admin: authCtx.user,
      };
      props.onAddWorker(workerParam);

      setEnteredUsername("");
      setEnteredPassword("");
      setEnteredFirstName("");
      setEnteredLastName("");
      setEnteredFaculty("");
      setEnteredIndex("");
    }
  };

  return (
    <Card className={classes["new-worker"]}>
      <form onSubmit={submitHandler}>
        <Input
          ref={usernameRef}
          type="string"
          id="username"
          label="Username"
          value={enteredUsername}
          onChange={changeUsernameHandler}
          isError={usernameIsError}
          errorMessage="Username is required!!!"
        />

        <Input
          ref={passwordRef}
          type="password"
          id="password"
          label="Password"
          value={enteredPassword}
          onChange={changePasswordHandler}
          isError={passwordIsError}
          errorMessage="Password is required!!!"
        />

        <Input
          ref={firstNameRef}
          type="string"
          id="firstName"
          label="First Name"
          value={enteredFirstName}
          onChange={changeFirstNameHandler}
          isError={firstNameIsError}
          errorMessage="First Name is required!!!"
        />

        <Input
          ref={lastNameRef}
          type="string"
          id="lastName"
          label="Last Name"
          value={enteredLastName}
          onChange={changeLastNameHandler}
          isError={lastNameIsError}
          errorMessage="Last Name is required!!!"
        />

        <Input
          //ref={usernameRef}
          type="checkbox"
          id="scholar"
          label="Scholar worker"
          value={isScholar}
          onChange={changeCheckBoxHandler}
        />

        {isScholar && (
          <Input
            ref={facultyRef}
            type="string"
            id="faculty"
            label="Faculty"
            value={enteredFaculty}
            onChange={changeFacultyHandler}
            isError={facultyIsError}
            errorMessage="Faculty is required!!!"
          />
        )}

        {isScholar && (
          <Input
            ref={indexRef}
            type="string"
            id="index"
            label="Index"
            value={enteredIndex}
            onChange={changeIndexHandler}
            isError={indexIsError}
            errorMessage="Index is required!!!"
          />
        )}

        <Button type="submit">Add</Button>
      </form>
    </Card>
  );
};

export default NewWorker;
