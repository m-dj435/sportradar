import React from "react";
import { Table } from "semantic-ui-react";
import mockedData from "../mockedData.json";
import styles from "./ResultTable.module.css";

const ResultTable = () => {
  const teamName = mockedData.schedules.map((item) => {
    let competitors = item.sport_event.competitors;
    const colon = ":";
    let homeScore = item.sport_event_status.home_score ?? "postponed";
    let awayScore = item.sport_event_status.away_score ?? "";
    let sportStatus = item.sport_event_status.status;
    let halfTimeScore = item.sport_event_status.period_scores;
    let winnerId = item.sport_event_status.winner_id;

    const matchDate = new Date(item.sport_event.start_time).toLocaleDateString(
      "en-GB"
    );

    let stadiumName = item.sport_event.venue.name;

    return (
      <React.Fragment key={item.sport_event.id}>
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
              {homeScore !== "postponed" ? homeScore + colon : "postponed"}
              {awayScore}
            </Table.Cell>
            <Table.Cell>{matchDate}</Table.Cell>
            <Table.Cell>
              {sportStatus === "postponed"
                ? "postponed"
                : halfTimeScore.map((score) => {
                    if (score.number === 1) {
                      return score.home_score + colon + score.away_score;
                    }
                    return "";
                  })}
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
      <>{teamName}</>
    </Table>
  );
};

export default ResultTable;
