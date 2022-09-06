import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import AdminWorkerControls from "../Worker/AdminWorkerControls";
import WorkerInfo from "../Worker/WorkerInfo";

const WorkerContent = () => {
    const authCtx = useContext(AuthContext);
    return (
      <div>
        <WorkerInfo />
        {authCtx.user.role === "admin" && <AdminWorkerControls />}
      </div>
    );
};

export default WorkerContent;