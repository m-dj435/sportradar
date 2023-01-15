//import axios from "axios";
import React from "react";
import mockedData from "../mockedData.json";

//const URL = process.env.REACT_APP_API_KEY;
//const API_URI = `https://api.sportradar.us/soccer/trial/v4/en/seasons/sr:season:77453/schedules.json?api_key=${URL}`;

const SeasonResults = () => {
  //const [data, setData] = useState(mockedData);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios(
  //       `https://api.sportradar.us/soccer/trial/v4/en/seasons/sr:season:77453/schedules.json?api_key=${URL}`
  //     );
  //     setData(result.data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <React.Fragment>
      <ul>
        {mockedData.schedules.map((item) => {
          const competitors = item.sport_event.competitors;
          return competitors.map(({ id, name }) => {
            return (
              <li key={id}>
                <div>{name}</div>
                <div>{id}</div>
              </li>
            );
          });
        })}
      </ul>
    </React.Fragment>
  );
};

export default SeasonResults;
