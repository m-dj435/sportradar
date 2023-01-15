import React from "react";
import { Table } from "semantic-ui-react";
import mockedData from "../mockedData.json";

const ResultTable = () => {
  const teamName = mockedData.schedules.map((item) => {
    const competitors = item.sport_event.competitors;

    return (
      <React.Fragment key={item.sport_event.id}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Team Names</Table.HeaderCell>
            <Table.HeaderCell>Result</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {competitors.map(({ id, name, qualifier }) => {
          const homeScore = item.sport_event_status.home_score ?? "postponed";

          const awayScore = item.sport_event_status.away_score ?? "postponed";

          return (
            <React.Fragment key={id}>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{name}</Table.Cell>
                  <Table.Cell>
                    {qualifier === "home" ? homeScore : awayScore}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  });

  return (
    <Table celled>
      <>{teamName}</>
    </Table>
  );
};

export default ResultTable;
