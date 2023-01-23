import { useState } from "react";
import { Header } from "semantic-ui-react";
import Pagination from "react-js-pagination";

import SeasonTable from "../components/SeasonTable";
import SeasonsDropdown from "../components/SeasonsDropdown";
import { options, schedules } from "../helpers/helpers";
import { Layout } from "../components/Layout";
import useWindowWidth from "../hooks/useWindowWidth";
import "../style/pagination.css";

const OFFSET = 20;

const Homepage = () => {
  const [selectValue, setSelectValue] = useState(options[0].value);
  const [activePage, setActivePage] = useState(1);
  const { isMobile } = useWindowWidth();

  const startedValue = activePage * OFFSET - OFFSET;

  const filteredDataSeasons = schedules.filter(
    ({ sport_event }) =>
      sport_event.sport_event_context.season.name === selectValue
  );

  const onFilterChangeHandler = (filteredSeasons) => {
    setSelectValue(filteredSeasons);
    setActivePage(1);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const currentDataList = filteredDataSeasons.slice(
    startedValue,
    startedValue + OFFSET
  );

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
      <SeasonTable data={currentDataList} />
      <div className="flex justify-center">
        <Pagination
          activePage={activePage}
          itemsCountPerPage={OFFSET}
          totalItemsCount={filteredDataSeasons.length}
          pageRangeDisplayed={isMobile ? 3 : 5}
          onChange={handlePageChange}
        />
      </div>
    </Layout>
  );
};

export default Homepage;
