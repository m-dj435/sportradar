import React from "react";
import { Table } from "semantic-ui-react";
import styles from "./ResultTable.module.css";

const ResultTable = (props) => {
  const scheduleData = props.data.map(({ sport_event, sport_event_status }) => {
    let competitors = sport_event.competitors;
    const colon = ":";
    let homeScore = sport_event_status.home_score ?? sport_event_status.status;

    let awayScore = sport_event_status.away_score ?? "";
    let sportStatus = sport_event_status.status;
    let halfTimeScore = sport_event_status.period_scores;
    let winnerId = sport_event_status.winner_id;

    const matchDate = new Date(sport_event.start_time).toLocaleDateString(
      "en-GB"
    );

    let stadiumName = sport_event.venue.name;

    return (
      <React.Fragment key={sport_event.id}>
        <Table.Body>
          <Table.Row>
            {competitors.map(({ id, name }) => {
              return (
                <Table.Cell
                  key={id}
                  bgcolor={
                    (!winnerId && "orange") ||
                    (id === winnerId ? "green" : "red")
                  }
                >
                  {name}
                </Table.Cell>
              );
            })}
            <Table.Cell>
              {sportStatus === "closed"
                ? homeScore + colon
                : sport_event_status.status}
              {awayScore}
            </Table.Cell>
            <Table.Cell>{matchDate}</Table.Cell>
            <Table.Cell>
              {sportStatus === "closed"
                ? halfTimeScore?.map((score) => {
                    if (score.number === 1) {
                      return score.home_score + colon + score.away_score;
                    }
                    return "";
                  })
                : sport_event_status.status}
            </Table.Cell>
            <Table.Cell>{stadiumName}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </React.Fragment>
    );
  });

  return (
    <Table celled className={styles.content}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Team Names</Table.HeaderCell>
          <Table.HeaderCell>Team Names</Table.HeaderCell>
          <Table.HeaderCell>Result</Table.HeaderCell>
          <Table.HeaderCell>Match date</Table.HeaderCell>
          <Table.HeaderCell>Half time score</Table.HeaderCell>
          <Table.HeaderCell>Stadium name </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <>{scheduleData}</>
    </Table>
  );
};

export default ResultTable;
