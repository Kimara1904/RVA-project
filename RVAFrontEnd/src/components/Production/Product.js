import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button";
import ModifyWindow from "../UI/ModifyWindow";
import classes from "./Product.module.css"

const Product = (props) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isModify, setIsModify] = useState(false);
    const [modifyItem, setModifyItem] = useState(null);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
      //console.log(authCtx.user.username + "product");
      if (authCtx.user.role === "admin") {
        setIsAdmin(true);
      }
    }, [authCtx.user.role]);

    const clickModifyHandler = () => {
      setIsModify(true);
      const modifyItem = {
        type: props.type,
        count: props.count
      }
      setModifyItem(modifyItem);
    }

    const clickDeleteHandler = (event) => {
      event.preventDefault();
      props.onDelete(props.id);
    };

    const cancelHandle = () => {
      setIsModify(false);
    }

    const Types = new Map();
    Types["Electro"] = "Electro Instalation";
    Types["Tire"] = "Tires";
    Types["Interior"] = "Interior";
    Types["Engine"] = "Engine";
    Types["MetalWork"] = "Metal Work";


    return (
      <React.Fragment>
        {isModify && (
          <ModifyWindow
            modify="product"
            item={modifyItem}
            onCancel={cancelHandle}
          />
        )}
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
            {isAdmin && <Button onClick={clickModifyHandler}>Modify</Button>}
            {isAdmin && <Button onClick={clickDeleteHandler}>Delete</Button>}
          </div>
        </li>
      </React.Fragment>
    );
};

export default Product;