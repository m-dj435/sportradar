import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Spinner from "../components/Spinner";
import Timeline from "../components/Timeline";
import BallPossession from "../components/BallPossession";
import Alert from "../components/Alert";
import { Layout } from "../components/Layout";
// import mockedEventTimeline from "../helpers/mockedEventTimeline.json";
// import mockedEventTimeline from "../helpers/mockedEventTimelinePostponed.json";

const SECRET_KEY = process.env.REACT_APP_API_KEY;

const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(undefined);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.sportradar.us/soccer/trial/v4/en/sport_events/sr:sport_event:${id}/timeline.json?api_key=${SECRET_KEY}`
      );
      setData(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  if (isLoading) return <Spinner />;
  if (!data) return <>Ooops</>;

  const {
    sport_event: { competitors, start_time },
    sport_event_status: { home_score, away_score, status, period_scores },
    statistics,
    timeline: timelineData,
  } = data;

  const firstTeamName = competitors[0].name;
  const secondTeamName = competitors[1].name;
  const result = home_score + " : " + away_score;
  const formatDate = new Date(start_time).toLocaleDateString("en-CA");
  const ballpossession =
    statistics?.totals.competitors[0].statistics.ball_possession;
  const timeline = timelineData;
  console.log(timeline);
  return (
    <Layout>
      <div className="flex justify-center text-sm font-semibold pt-6">
        {formatDate}
      </div>
      <div className="flex items-center justify-center font-semibold text-center text-2xl p-4">
        <div className="bg-gray-100 shadow-lg shadow-gray-500/50 w-2/5 border-double border-4 border-gray-300 rounded-lg ml-auto">
          {firstTeamName}
        </div>
        <div className="w-1/5 ">
          {status === "closed" ? result : status.replace("_", " ")}
        </div>
        <div className="bg-gray-100 shadow-lg shadow-gray-500/50 w-2/5 border-double border-4 border-gray-300 rounded-lg mr-auto">
          {secondTeamName}
        </div>
      </div>
      {status === "closed" ? (
        <BallPossession ballpossession={ballpossession} />
      ) : (
        ""
      )}

      {status === "closed" ? (
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
              type === "substitution" ||
              type === "video_assistant_referee" ||
              type === "video_assistant_referee_over"
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
              let resultPeriod = period_scores[0];
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
                scorer={players && players[0]?.name}
                assist={players && players[1]?.name}
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
