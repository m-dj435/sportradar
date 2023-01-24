import React from "react";
import { Dropdown } from "semantic-ui-react";

const SeasonsDropdown = ({ onSelectChange, options, value }) => {
  const onChangeHandler = (event, { value }) => {
    onSelectChange(value);
  };

  return (
    <Dropdown
      className="xl:w-60 ml-auto"
      selection
      options={options}
      onChange={onChangeHandler}
      defaultValue={value}
    />
  );
};

export default SeasonsDropdown;
