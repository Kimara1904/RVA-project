import React from "react";
import Input from "../UI/Input";
import classes from "./ProductionFilters.module.css"

const ProductionFilters = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeTypeFilter(event.target.value);
  };
  const changeDateHandler = (event) => {
    props.onChangeDateFilter(event.target.value);
  };
  const changeCheckBoxHandler = () => {
    props.onChangeOnlyMyFilter(!props.myF);
  };

  return (
    <div className={classes["production-filter"]}>
      <h3>Filters</h3>
      <div className={classes["production-filter__control"]}>
        <label>Type</label>
        <select value={props.typeF} onChange={dropdownChangeHandler}>
          <option value="All">All</option>
          <option value="Electro">Electrical Instalation</option>
          <option value="Tire">Tires</option>
          <option value="Interior">Interior</option>
          <option value="Engine">Engine</option>
          <option value="MetalWork">Metal Work</option>
        </select>
      </div>

      <Input
        //ref={usernameRef}
        type="date"
        id="date"
        label="Date"
        value={props.dateF}
        onChange={changeDateHandler}
      />

      <Input
        //ref={usernameRef}
        type="checkbox"
        id="myProducts"
        label="My Productions"
        value={props.myF}
        onChange={changeCheckBoxHandler}
      />
    </div>
  );
};

export default ProductionFilters;
