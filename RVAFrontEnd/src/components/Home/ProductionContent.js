import React, { useCallback, useState, useEffect, useContext } from "react";
import NewProduction from "../Production/NewProduction";
import ProductionFilters from "../Production/ProductionFilters";
import Infos from "../Production/Infos";
import Productions from "../Production/Productions";
import Card from "../UI/Card";
import AuthContext from "../../store/auth-context";
import classes from "./ProductionContent.module.css"

const ProductionContent = () => {
  const [productions, setProductions] = useState([]);
  const [carCounter, setCarCounter] = useState(0);
  const [salary, setSalary] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //Filters
  const currentDate = new Date(Date.now());
  const defaultDate =
    currentDate.getFullYear() +
    "-" +
    (currentDate.getMonth() + 1 < 10 ? "0" : "") +
    (currentDate.getMonth() + 1) +
    "-" +
    (currentDate.getDate() < 10 ? "0" : "") +
    currentDate.getDate();
  const [typeFilter, setTypeFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState(defaultDate);
  const [onlyMy, setOnlyMy] = useState(false);

  //Context
  const authCtx = useContext(AuthContext);

  //Http request Get
  const fetchProductionHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:58817/api/Production");
      if (!response.ok) {
        throw new Error("Something went wrong with fetch production!");
      }

      const data = await response.json();

      const loadedProductions = [];

      for (const key in data) {
        const rawDate = new Date(data[key].Date);
        const readableDate =
          rawDate.getFullYear() +
          "-" +
          (rawDate.getMonth() + 1 < 10 ? "0" : "") +
          (rawDate.getMonth() + 1) +
          "-" +
          (rawDate.getDate() < 10 ? "0" : "") +
          rawDate.getDate();
        loadedProductions.push({
          id: data[key].Id,
          count: data[key].Count,
          creator: data[key].Creator,
          date: readableDate,
          type: data[key].m_Product.type,
          pPoints: data[key].m_Product.productivityPoints,
        });
        //console.log("OVDEEE");
        //console.log(data[key].m_Product.type);
      }

      //console.log(loadedProductions[1].date);
      setProductions(loadedProductions);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  const fetchCarCountHandler = useCallback(async () => {
    //console.log(dateFilter);
    try {
      //For Car count
      const countResponse = await fetch(
        "http://localhost:58817/api/Worker?username=" +
          authCtx.user.username +
          "&password=" +
          authCtx.user.password +
          "&token=2&date=" + 
          dateFilter
      );

      if (!countResponse.ok) {
        throw new Error("Something went wrong with fetch car counter!");
      }

      const carCounterData = await countResponse.json();
      setCarCounter(carCounterData);
    } catch (error) {
      setError(error.message);
    }
  }, [dateFilter]);

  const fetchSalaryHandler = useCallback(async () => {
    try {
      const salaryResponse = await fetch(
        "http://localhost:58817/api/Worker?username=" +
          authCtx.user.username +
          "&password=" +
          authCtx.user.password +
          "&token=1&date=" + 
          dateFilter
      );

      if (!salaryResponse.ok) {
        throw new Error("Something went wrong with fetch car counter!");
      }

      const salaryData = await salaryResponse.json();
      setSalary(salaryData);
    } catch (error) {
      setError(error.message);
    }
    
  }, [dateFilter]);

  //Reloading
  useEffect(() => {
    fetchProductionHandler();
    fetchCarCountHandler();
    fetchSalaryHandler();

    //console.log(productions);
  }, [fetchProductionHandler, fetchCarCountHandler, fetchSalaryHandler]);

  const clickAddHandler = async (parameter) => {
    try {
      const response = await fetch("http://localhost:58817/api/Production/", {
        method: "POST",
        body: JSON.stringify(parameter),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error with delete!!!");
      }

      fetchProductionHandler();
      fetchCarCountHandler();
      fetchSalaryHandler();
    } catch (error) {
      alert(error.message);
    }
  };

  const clickDeleteHandler = async (id) => {
    //console.log("radim");
    if (window.confirm("Do you really want to delete this product?") === true) {
      try {
        const response = await fetch(
          "http://localhost:58817/api/Production/" + id,
          {
            method: "DELETE",
            body: JSON.stringify(authCtx.user),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error with delete!!!");
        }

        fetchProductionHandler();
        fetchCarCountHandler();
        fetchSalaryHandler();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  //Change Filters
  const changeTypeFilterHandler = (filterT) => {
    setTypeFilter(filterT);
  };

  const changeDateFilterHandler = (filterD) => {
    //console.log(filterD);
    setDateFilter(filterD);
  };

  const changeOnlyMyFilterHandler = (filterM) => {
    setOnlyMy(filterM);
    //console.log(filterM);
  };

  const updateHandler = () => {
    fetchProductionHandler();
    fetchCarCountHandler();
    fetchSalaryHandler();
  }

  //Filtering
  const filteredProductions = productions
    .filter((product) => {
      if (typeFilter !== "All") {
        return product.type === typeFilter;
      }
      return product;
    })
    .filter((product) => {
      //console.log(product.date);
      //console.log(product.date === dateFilter);
      return product.date === dateFilter;
    })
    .filter((product) => {
      if (onlyMy) {
        return product.creator === authCtx.user.username;
      }
      return product
    });

  //Setting content
  let content = (
    <p className={classes.productions__fallback}>Found no movies.</p>
  );

  if (filteredProductions.length > 0) {
    content = <Productions productions={filteredProductions} onDelete={clickDeleteHandler} onUpdate={updateHandler}/>;
  }

  if (error) {
    content = <p className={classes.productions__fallback}>{error}</p>;
  }

  if (isLoading) {
    content = <p className={classes.productions__fallback}>Loading...</p>;
  }

  return (
    <React.Fragment>
      <NewProduction onAddProduct={clickAddHandler} />
      <Card className={classes["production-content"]}>
        <ProductionFilters
          typeF={typeFilter}
          dateF={dateFilter}
          myF={onlyMy}
          onChangeTypeFilter={changeTypeFilterHandler}
          onChangeDateFilter={changeDateFilterHandler}
          onChangeOnlyMyFilter={changeOnlyMyFilterHandler}
        />
        <Infos carCounter={carCounter} salary={salary} />
        <React.Fragment>{content}</React.Fragment>
      </Card>
    </React.Fragment>
  );
};

export default ProductionContent;
