import React from "react";
import { Dropdown } from "semantic-ui-react";

const SeasonsDropdown = (props) => {
  const onChangeHandler = (event) => {
    props.filerValueSelected(event.target.textContent);
  };
  console.log(props);
  return (
    <Dropdown
      placeholder={"Pick Season"}
      fluid
      selection
      options={props.options}
      onChange={onChangeHandler}
      defaultValue={props.selectedValue}
    />
  );
};

export default SeasonsDropdown;
