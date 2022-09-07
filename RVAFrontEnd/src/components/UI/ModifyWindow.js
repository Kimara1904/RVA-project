import React from "react";
import ReactDOM from "react-dom";

import Card from "./Card";
import ModifyWorker from "./ModifyWorker";
import ModifyProduction from "./ModifyProduct";

import classes from "./ModifyWindow.module.css"

const Backdrop = () => {
    return <div className={classes.backdrop} />;
}

const ModalOverlay = (props) => {
    return (
      <Card className={classes.modal}>
        {props.modify === "worker" && (
          <div className={classes.content}>
            <ModifyWorker
              user={props.item}
              onCancel={props.onCancel}
              onModify={props.onModify}
            />
          </div>
        )}
        {props.modify === "product" && (
          <div className={classes.content}>
            <ModifyProduction
              production={props.item}
              onCancel={props.onCancel}
              onModify={props.onModify}
            />
          </div>
        )}
      </Card>
    );
}

const ModifyWindow = (props) => {
    return (
      <React.Fragment>
        {ReactDOM.createPortal(
          <Backdrop />,
          document.getElementById("backdrop-root")
        )}
        {ReactDOM.createPortal(
          <ModalOverlay
          item={props.item}
          modify={props.modify}
          onCancel={props.onCancel}
          onModify={props.onModify}
          />,
          document.getElementById("overlay-root")
        )}
      </React.Fragment>
    );
};

export default ModifyWindow;