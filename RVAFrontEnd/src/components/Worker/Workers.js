import React from "react";
import Worker from "./Worker";
import classes from "./Workers.module.css"

const Workers = (props) => {
     return (
       <ul className={classes.workers}>
         {props.workers.map((worker) => {
           return (
             <Worker
               key={worker.username}
               username={worker.username}
               firstName={worker.firstName}
               lastName={worker.lastName}
               role={worker.role}
             />
           );
         })}
       </ul>
     );
};

export default Workers;