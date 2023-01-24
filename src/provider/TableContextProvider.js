import { createContext, useState } from "react";
import { options } from "../helpers/helpers";

export const TableContext = createContext(undefined);

const TableContextProvider = ({ children }) => {
  const [selectValue, setSelectValue] = useState(options[0].value);
  const [activePage, setActivePage] = useState(1);

  return (
    <TableContext.Provider
      value={{ activePage, selectValue, setActivePage, setSelectValue }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableContextProvider;
