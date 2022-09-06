import React from "react";
import classes from "./Worker.module.css"

const Worker = (props) => {
    return (
      <div className={classes.worker}>
        <h2>{props.firstName + " " + props.lastName}</h2>
        <p>
          <i>{props.username}</i>
        </p>
        <p>Role: {props.role}</p>
      </div>
    );
};

export default Worker;