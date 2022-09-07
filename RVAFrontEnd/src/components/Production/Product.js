import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button";
import ModifyWindow from "../UI/ModifyWindow";
import classes from "./Product.module.css";

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
      count: props.count,
    };
    setModifyItem(modifyItem);
  };

  const clickDeleteHandler = (event) => {
    event.preventDefault();
    props.onDelete(props.id);
  };

  const cancelHandler = () => {
    setIsModify(false);
  };

  const fetchPutHandler = async (productParams) => {
    try {
      const response = await fetch(
        "http://localhost:58817/api/Production/" + props.id,
        {
          method: "PUT",
          body: JSON.stringify(productParams),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

       if (!response.ok) {
         if (response.status === 404) {
           throw new Error("Product not found!!!");
         }

         if (response.status === 405) {
           throw new Error("Non-administrative permission!!!");
         }
         throw new Error("Error with modify product!!!");
       }

      props.onUpdate();
    } catch (error) {
      alert(error.message);
    }
    setIsModify(false);
  };

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
          onCancel={cancelHandler}
          onModify={fetchPutHandler}
        />
      )}
      <li className={classes.product}>
        <h1>{Types[props.type]}</h1>
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
