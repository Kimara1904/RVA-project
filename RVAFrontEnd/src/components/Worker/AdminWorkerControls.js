import React, { useState, useCallback, useEffect, useContext } from "react";
import NewWorker from "./NewWorker";
import Workers from "./Workers";
import Card from "../UI/Card";
import classes from "./AdminWorkerControls.module.css"

const AdminWorkerControls = () => {
  const [workers, setWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWorkerHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:58817/api/Worker");
      if (!response.ok) {
        throw new Error("Something went wrong with fetch workers!");
      }

      const data = await response.json();

      const loadedWorkers = [];

      for (const key in data) {
        loadedWorkers.push({
          username: data[key].Username,
          password: data[key].Password,
          firstName: data[key].FirstName,
          lastName: data[key].LastName,
          role: data[key].Role,
          facultyName: data[key].FacultyName,
          index: data[key].Index,
        });
        //console.log(data[key].m_Product.Type);
      }

      //console.log(loadedProductions[1].date);
      setWorkers(loadedWorkers);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchWorkerHandler();
  }, [fetchWorkerHandler]);

  const addWorker = async (worker) => {
    try {
      const response = await fetch("http://localhost:58817/api/Worker/", {
        method: "POST",
        body: JSON.stringify(worker),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error("There is already worker with this username!!!");
        }
        throw new Error("Error with adding!!!");
      }

      fetchWorkerHandler();
    } catch (error) {
      alert(error.message);
    }
  };

  let content = <Workers workers={workers} />;

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <Card className={classes["admin-worker-controls"]}>
      <NewWorker onAddWorker={addWorker}/>
      <React.Fragment>{content}</React.Fragment>
    </Card>
  );
};

export default AdminWorkerControls;
