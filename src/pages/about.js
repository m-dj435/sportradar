import React from "react";
import { useParams } from "react-router-dom";

import Timeline from "../components/Timeline";
import BallPossession from "../components/BallPossession";
import Alert from "../components/Alert";
import { Layout } from "../components/Layout";
import mockedEventTimeline from "../helpers/mockedEventTimeline.json";
// import mockedEventTimeline from "../helpers/mockedEventTimelinePostponed.json";

const dataEventTimeline = mockedEventTimeline;
const firstTeamName = dataEventTimeline.sport_event.competitors[0].name;
const secondTeamName = dataEventTimeline.sport_event.competitors[1].name;
const status = dataEventTimeline.sport_event_status;
const result = status?.home_score + " : " + status?.away_score;
const eventDate = dataEventTimeline.sport_event.start_time;
const formatDate = new Date(eventDate).toLocaleDateString("en-CA");
const ballpossession =
  dataEventTimeline.statistics?.totals.competitors[0].statistics
    .ball_possession;
const timeline = dataEventTimeline.timeline;

const About = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <Layout>
      {/* <div>About {id}</div> */}
      <div className="flex justify-center text-sm font-semibold pt-6">
        {formatDate}
      </div>
      <div className="flex items-center justify-center font-semibold text-center text-2xl p-4">
        <div className="bg-gray-100 shadow-lg shadow-gray-500/50 w-2/5 border-double border-4 border-gray-300 rounded-lg ml-auto">
          {firstTeamName}
        </div>
        <div className="w-1/5 ">
          {status.status === "closed" ? result : "postponed"}
        </div>
        <div className="bg-gray-100 shadow-lg shadow-gray-500/50 w-2/5 border-double border-4 border-gray-300 rounded-lg mr-auto">
          {secondTeamName}
        </div>
      </div>
      {status.status === "closed" ? (
        <BallPossession ballpossession={ballpossession} />
      ) : (
        ""
      )}

      {status.status === "closed" ? (
        timeline.map(
          ({
            id,
            type,
            match_time,
            period,
            competitor,
            players,
            home_score,
            away_score,
          }) => {
            if (
              type === "break_start" ||
              type === "match_started" ||
              type === "injury" ||
              type === "injury_return" ||
              type === "throw_in" ||
              type === "free_kick" ||
              type === "goal_kick" ||
              type === "corner_kick" ||
              type === "shot_off_target" ||
              type === "offside" ||
              type === "shot_on_target" ||
              type === "shot_saved" ||
              type === "injury_time_shown" ||
              type === "possible_goal" ||
              type === "substitution"
            )
              return null;

            if (type === "match_ended") {
              return (
                <Alert
                  key={id}
                  text="Match ended"
                  warning
                  headerClassNames="text-center"
                  subText=""
                />
              );
            }

            if (type === "period_start") {
              let resultOfperiod;
              if (period === 1) {
                resultOfperiod = period + "st";
              } else if (period === 2) {
                resultOfperiod = "2nd";
              } else if (period === 3) {
                resultOfperiod = "3rd";
              } else if (period === 4 || period === 5) {
                resultOfperiod = period + "th";
              }

              return (
                <Alert
                  key={id}
                  text={resultOfperiod + " half"}
                  subText=""
                  warning
                  headerClassNames="text-center"
                />
              );
            }

            if (type === "period_score") {
              let resultPeriod = status.period_scores[0];
              return (
                <Alert
                  key={id}
                  text={
                    resultPeriod.home_score + " : " + resultPeriod.away_score
                  }
                  info
                  headerClassNames="text-center"
                  subText=""
                />
              );
            }

            return (
              <Timeline
                key={id}
                descriptionType={type.replace("_", " ")}
                minutes={match_time}
                position={competitor}
                scorer={players[0]?.name}
                assist={players[1]?.name}
                goolHomeScore={home_score}
                goolAwayScore={away_score}
              />
            );
          }
        )
      ) : (
        <Alert
          icon="exclamation triangle"
          text="Sorry this event was"
          subText="postponed or has not taken place yet"
          info
          size="large"
        />
      )}
    </Layout>
  );
};

export default About;
