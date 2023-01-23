import { useState } from "react";

import SeasonTable from "../components/SeasonTable";
import SeasonsDropdown from "../components/SeasonsDropdown";
import { options, schedules } from "../helpers/helpers";
import { Layout } from "../components/Layout";
import { Header } from "semantic-ui-react";

const Homepage = () => {
  const [selectValue, setSelectValue] = useState(options[0].value);

  const filteredDataSeasons = schedules.filter(
    ({ sport_event }) =>
      sport_event.sport_event_context.season.name === selectValue
  );

  const onFilterChangeHandler = (filteredSeasons) => {
    setSelectValue(filteredSeasons);
  };

  return (
    <Layout>
      <Header as="h1" className="self-center underline underline-offset-8">
        Results Table of Ekstraklasa
      </Header>
      <SeasonsDropdown
        value={selectValue}
        options={options}
        onSelectChange={onFilterChangeHandler}
      />
      <SeasonTable data={filteredDataSeasons} />
    </Layout>
  );
};

export default Homepage;
