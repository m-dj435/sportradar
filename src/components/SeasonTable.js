import { Table } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const SeasonTable = ({ data }) => {
  const navigate = useNavigate();

  const SeasonData = data.map(({ sport_event, sport_event_status }) => {
    const competitors = sport_event.competitors;
    const colon = ":";
    const homeScore =
      sport_event_status.home_score ?? sport_event_status.status;
    const awayScore = sport_event_status.away_score ?? "";
    const sportStatus = sport_event_status.status;
    const halfTimeScore = sport_event_status.period_scores;
    const winnerId = sport_event_status.winner_id;
    const stadiumName = sport_event.venue.name;
    const matchDate = new Date(sport_event.start_time).toLocaleDateString(
      "en-GB"
    );
    const isPlayed = sportStatus === "closed";

    const rowClickHandler = () => {
      navigate(`/about/${sport_event.id}`);
    };

    return (
      <Table.Row
        key={sport_event.id}
        onClick={rowClickHandler}
        className="cursor-pointer text-clack hover:text-blue-600 no-underline hover:underline"
      >
        {competitors.map(({ id, name }) => (
          <Table.Cell
            key={id}
            bgcolor={
              (sportStatus === "postponed" && "white") ||
              (sportStatus === "not_started" && "white") ||
              (!winnerId && "orange") ||
              (id === winnerId ? "green" : "red")
            }
          >
            {name}
          </Table.Cell>
        ))}
        <Table.Cell>
          {isPlayed ? homeScore + colon + awayScore : sportStatus}
        </Table.Cell>
        <Table.Cell>{matchDate}</Table.Cell>
        <Table.Cell>
          {isPlayed
            ? halfTimeScore.map(
                ({ number, home_score, away_score }) =>
                  number === 1 && home_score + colon + away_score
              )
            : sport_event_status.status}
        </Table.Cell>
        <Table.Cell>{stadiumName}</Table.Cell>
      </Table.Row>
    );
  });

  return (
    <Table celled>
      <Table.Header className="hidden sm:table-header-group">
        <Table.Row className="text-center">
          <Table.HeaderCell>Team Names</Table.HeaderCell>
          <Table.HeaderCell>Team Names</Table.HeaderCell>
          <Table.HeaderCell>Result</Table.HeaderCell>
          <Table.HeaderCell>Match date</Table.HeaderCell>
          <Table.HeaderCell>Half time score</Table.HeaderCell>
          <Table.HeaderCell>Stadium name </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body className="text-center ">{SeasonData}</Table.Body>
    </Table>
  );
};

export default SeasonTable;

// //import axios from "axios";
// import React from "react";
// import mockedData from "../mockedData.json";

// //const URL = process.env.REACT_APP_API_KEY;
// //const API_URI = `https://api.sportradar.us/soccer/trial/v4/en/seasons/sr:season:77453/schedules.json?api_key=${URL}`;

// const SeasonResults = () => {
//   //const [data, setData] = useState(mockedData);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     const result = await axios(
//   //       `https://api.sportradar.us/soccer/trial/v4/en/seasons/sr:season:77453/schedules.json?api_key=${URL}`
//   //     );
//   //     setData(result.data);
//   //   };
//   //   fetchData();
//   // }, []);
