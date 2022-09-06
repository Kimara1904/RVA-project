import React, { useImperativeHandle, useRef } from "react";
import classes from "./Input.module.css"

const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();

    const activate = () => {
      inputRef.current.focus();
    };

    useImperativeHandle(ref, () => {
      return {
        focus: activate,
      };
    });

    return (
      <div
        className={`${classes.control} ${
          props.isError === true ? classes.invalid : ""
        }`}
      >
        <label>{props.label}</label>
        <input
          ref={inputRef}
          type={props.type}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
        />
        {props.isError && <p className={classes.errorLabel}>{props.errorMessage}</p>}
      </div>
    );
});

export default Input;