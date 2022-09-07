import React, { useContext, useRef, useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import AuthContext from "../../store/auth-context";

const ModifyWorker = (props) => {
  //States booleans
  const [passwordIsError, setPasswordIsError] = useState(false);
  const [firstNameIsError, setFirstNameIsError] = useState(false);
  const [lastNameIsError, setLastNameIsError] = useState(false);
  const [facultyIsError, setFacultyIsError] = useState(false);
  const [indexIsError, setIndexIsError] = useState(false);
  const [isSameDataError, setIsSameDataError] = useState(false);

  //States values
  const [enteredPassword, setEnteredPassword] = useState(props.user.password);
  const [enteredFirstName, setEnteredFirstName] = useState(props.user.firstName);
  const [enteredLastName, setEnteredLastName] = useState(props.user.lastName);
  const [enteredFaculty, setEnteredFaculty] = useState(props.user.facultyName);
  const [enteredIndex, setEnteredIndex] = useState(props.user.index);

  //Refs
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const facultyRef = useRef();
  const indexRef = useRef();

  //Context
  const authCtx = useContext(AuthContext);

  //Functions
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
    let passwordError = false;
    let firstNameError = false;
    let lastNameError = false;
    let facultyError = false;
    let indexError = false;
    setPasswordIsError(false);
    setFirstNameIsError(false);
    setLastNameIsError(false);
    setFacultyIsError(false);
    setIndexIsError(false);

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
    if (props.user.role === "scholar" && enteredFaculty.length === 0) {
      facultyError = true;
      setFacultyIsError(true);
    }
    if (props.user.role === "scholar" && enteredFaculty.length === 0) {
      indexError = true;
      setIndexIsError(true);
    }

    if (passwordError) {
      passwordRef.current.focus();
    } else if (firstNameError) {
      firstNameRef.current.focus();
    } else if (lastNameError) {
      lastNameRef.current.focus();
    } else if (facultyError) {
      facultyRef.current.focus();
    } else if (indexError) {
      indexRef.current.focus();
    } else if (
      (enteredPassword === props.user.password &&
        enteredFirstName === props.user.firstName &&
        enteredLastName === props.user.lastName &&
        props.user.role !== "scholar") ||
      (enteredPassword === props.user.password &&
        enteredFirstName === props.user.firstName &&
        enteredLastName === props.user.lastName &&
        props.user.role === "scholar" &&
        enteredFaculty === props.user.facultyName &&
        enteredIndex === props.user.index)
    ) {
      setIsSameDataError(true);
    } else {
      const workerParam = {
        password: enteredPassword,
        firstName: enteredFirstName,
        lastName: enteredLastName,
        role: props.user.role,
        faculty: enteredFaculty,
        index: enteredIndex,
        admin: authCtx.user,
      };
      props.onModify(workerParam);
    }
  };

  const cancelClickHandle = () => {
    props.onCancel();
  };

  return (
    <React.Fragment>
      <header>
        <h2>Modify Product</h2>
      </header>
      <form onSubmit={submitHandler}>
        <p>
          <b>Username: </b>
          {authCtx.user.username}
        </p>

        <Input
          ref={passwordRef}
          type="text"
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

        {props.user.role === "scholar" && (
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

        {props.user.role === "scholar" && (
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

        <Input
          type="hidden"
          isError={isSameDataError}
          errorMessage="All data is same as before, change something!!!"
        />
        <Button type="submit">Modify</Button>
        <Button onClick={cancelClickHandle}>Cancel</Button>
      </form>
    </React.Fragment>
  );
};

export default ModifyWorker;
