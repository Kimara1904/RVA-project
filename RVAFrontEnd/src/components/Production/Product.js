import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button";
import classes from "./Product.module.css"

const Product = (props) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
      //console.log(authCtx.user.username + "product");
      if (authCtx.user.role === "admin") {
        setIsAdmin(true);
      }
    }, [authCtx.user.role]);

    const clickDeleteHandler = (event) => {
      event.preventDefault();
      props.onDelete(props.id);
    };

    const Types = new Map();
    Types["Electro"] = "Electro Instalation";
    Types["Tire"] = "Tires";
    Types["Interior"] = "Interior";
    Types["Engine"] = "Engine";
    Types["MetalWork"] = "Metal Work";


    return (
      <li className={classes.product}>
        <h2>{Types[props.type]}</h2>
        <div className={classes.product__description}>
          <h3>Code: {props.id}</h3>
          <p>Creator: {props.creator}</p>
          <div className={classes.product__count__point}>
            <p>Count: {props.count}</p>
            <p>Points: {props.pPoints}</p>
          </div>
        </div>
        <div>
          {isAdmin && <Button>Modify</Button>}
          {isAdmin && <Button onClick={clickDeleteHandler}>Delete</Button>}
        </div>
      </li>
    );
};

export default Product;