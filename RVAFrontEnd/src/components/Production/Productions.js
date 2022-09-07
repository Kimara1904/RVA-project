import React from "react";
import Product from "./Product";
import classes from "./Productions.module.css"

const Productions = (props) => {
  return (
    <ul className={classes.productions}>
      {props.productions.map((production) => {
        return (
          <Product
            key={production.id}
            id={production.id}
            count={production.count}
            creator={production.creator}
            date={production.date}
            type={production.type}
            pPoints={production.pPoints}
            onDelete={props.onDelete}
            onUpdate={props.onUpdate}
          />
        );
      })}
    </ul>
  );
};

export default Productions;
