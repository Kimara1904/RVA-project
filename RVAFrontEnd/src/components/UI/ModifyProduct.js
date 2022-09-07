import React, { useContext, useRef, useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import AuthContext from "../../store/auth-context";

const ModifyProduction = (props) => {
  const [selectredType, setSelectedType] = useState(props.production.type);
  const [enteredCount, setEnteredCount] = useState(props.production.count);
  const [countIsError, setCountIsError] = useState(false);
  const [isSameDataError, setIsSameDataError] = useState(false);

  const authCtx = useContext(AuthContext);
  const countRef = useRef();

  const dropdownChangeHandler = (event) => {
    setSelectedType(event.target.value);
  };

  const changeCountHandler = (event) => {
    setEnteredCount(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setCountIsError(false);

    if (enteredCount < 1) {
      setCountIsError(true);
      countRef.current.focus();
    }else if (enteredCount === props.production.count && selectredType === props.production.type) {
      setIsSameDataError(true);
    }else {
      const productParams = {
        type: selectredType,
        count: enteredCount,
        username: authCtx.user.username,
      };

      props.onModify(productParams);
    }
  };

  const cancelClickHandle = () => {
    props.onCancel();
  };

  return (
    <React.Fragment>
      <header>
        <h2>Modify Product</h2>
      </header>
      <form onSubmit={submitHandler}>
        <div>
          <div>
            <label>Type</label>
            <select value={selectredType} onChange={dropdownChangeHandler}>
              <option value="Electro">Electrical Instalation</option>
              <option value="Tire">Tires</option>
              <option value="Interior">Interior</option>
              <option value="Engine">Engine</option>
              <option value="MetalWork">Metal Work</option>
            </select>
          </div>
        </div>

        <Input
          ref={countRef}
          type="number"
          id="count"
          label="Count"
          value={enteredCount}
          onChange={changeCountHandler}
          isError={countIsError}
          errorMessage="Count can't be less or equal to 0!!!"
        />

        <Input
          type="hidden"
          isError={isSameDataError}
          errorMessage="All data is same as before, change something!!!"
        />
        <Button type="submit">Modify</Button>
        <Button onClick={cancelClickHandle}>Cancel</Button>
      </form>
    </React.Fragment>
  );
};

export default ModifyProduction;
