import { useState, useEffect, useContext } from "react";
import { Header } from "semantic-ui-react";
import Pagination from "react-js-pagination";
import axios from "axios";

import { TableContext } from "../provider/TableContextProvider";
import Spinner from "../components/Spinner";
import SeasonTable from "../components/SeasonTable";
import SeasonsDropdown from "../components/SeasonsDropdown";
// import { schedules } from "../helpers/helpers";
import { options } from "../helpers/helpers";
import { Layout } from "../components/Layout";
import useWindowWidth from "../hooks/useWindowWidth";
import "../style/pagination.css";

const OFFSET = 20;
const SECRET_KEY = process.env.REACT_APP_API_KEY;

const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const { selectValue, activePage, setSelectValue, setActivePage } = useContext(
    TableContext
  );
  const { isMobile } = useWindowWidth();
  const { text: seasonName, value } = options.find(
    (option) => option.value === selectValue
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.sportradar.us/soccer/trial/v4/en/seasons/sr:season:${value}/schedules.json?api_key=${SECRET_KEY}`
      );
      setData(result.data.schedules);
      setIsLoading(false);
    };
    fetchData();
  }, [value]);

  if (isLoading) return <Spinner />;

  const startedValue = activePage * OFFSET - OFFSET;

  const filteredDataSeasons = data.filter(
    ({ sport_event }) =>
      sport_event.sport_event_context.season.name === seasonName
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
