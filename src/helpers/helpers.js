import mockedDataS20_21 from "./mockedDataS20_21.json";
import mockedDataS21_22 from "./mockedDataS21_22.json";
import mockedDataS22_23 from "./mockedDataS22_23.json";
import seasonData from "./seasonData.json";

const dataS20_21 = mockedDataS20_21.schedules;
const dataS21_22 = mockedDataS21_22.schedules;
const dataS22_23 = mockedDataS22_23.schedules;

export const options = seasonData.seasons.map(({ name, id }) => {
  const lastUnnecessaryChar = id.lastIndexOf(":");
  let seasonId = id.substring(lastUnnecessaryChar + 1);
  return {
    text: name,
    value: seasonId,
  };
});

export const schedules = [...dataS20_21, ...dataS21_22, ...dataS22_23];
