import React from "react";
import classes from "./Infos.module.css"

const Infos = (props) => {
    return (
        <div className={classes.infoDiv}>
            <p>Car counter for day: {props.carCounter}</p>
            <p>My salary for month: {props.salary}</p>
        </div>
    );
};

export default Infos;