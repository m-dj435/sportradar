import React, { useState } from "react";
import ResultTable from "./components/ResultTable";
import SeasonsDropdown from "./components/SeasonsDropdown";
import mockedDataS20_21 from "./mockedDataS20_21.json";
import mockedDataS21_22 from "./mockedDataS21_22.json";
import mockedDataS22_23 from "./mockedDataS22_23.json";
import seasonData from "./seasonData.json";

const options = seasonData.seasons.map(({ name }) => {
  return {
    text: name,
    value: name,
  };
});
const dataS20_21 = mockedDataS20_21.schedules;
const dataS21_22 = mockedDataS21_22.schedules;
const dataS22_23 = mockedDataS22_23.schedules;
const schedules = [...dataS20_21, ...dataS21_22, ...dataS22_23];

function App() {
  const [filterSeasonsOfEkstraKlasa, setFilterSeasonsOfEkstraKlasa] = useState(
    options[0].value
  );

  const filteredDataSeasons = schedules.filter(({ sport_event }) => {
    return (
      sport_event.sport_event_context.season.name === filterSeasonsOfEkstraKlasa
    );
  });

  const onFilterChangeHandler = (filteredSeasons) => {
    setFilterSeasonsOfEkstraKlasa(filteredSeasons);
  };

  return (
    <React.Fragment>
      <SeasonsDropdown
        selectedValue={filterSeasonsOfEkstraKlasa}
        options={options}
        filerValueSelected={onFilterChangeHandler}
      />
      <ResultTable data={filteredDataSeasons} />
    </React.Fragment>
  );
}

export default App;
