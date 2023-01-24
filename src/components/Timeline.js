import React from "react";
import { Icon } from "semantic-ui-react";

const Timeline = ({
  minutes,
  descriptionType,
  position,
  scorer,
  assist,
  goolHomeScore,
  goolAwayScore,
}) => {
  return (
    <div className="flex flex-col justify-center ">
      <div className="sm:max-w-xl sm:mx-auto px-2 sm:px-0 w-full">
        <div className="relative z-0 text-gray-700 antialiased text-md ">
          {/*Vertical*/}
          <div className="hidden sm:block w-1 bg-black opacity-50 absolute h-full left-1/2 transform -translate-x-1/2"></div>

          {position === "home" ? (
            // Left
            <div className="mt-6 sm:mt-0 mb-4">
              <div className="flex flex-row items-center ">
                <div className="w-8">{minutes}&#x0313;</div>
                <div className="flex justify-start w-full mx-auto text-center">
                  <div className="w-full sm:w-1/2 sm:pr-8">
                    <div className="p-2 bg-white rounded shadow">
                      {descriptionType}
                    </div>
                    {descriptionType === "score change" ? (
                      <>
                        <div className="font-bold">
                          {"(" + goolHomeScore + " : " + goolAwayScore + ")"}
                        </div>
                        <div className="font-bold">{scorer} </div>
                        <div className="text-sm">{assist} </div>
                      </>
                    ) : null}
                    {descriptionType === "yellow card" ||
                    descriptionType === "red card" ||
                    descriptionType === "yellow red_card" ? (
                      <>
                        <div className="font-bold">{scorer} </div>
                      </>
                    ) : null}
                  </div>
                </div>
                <div className="bg-white sm:absolute left-1/2  sm:translate-y-0 transform -translate-x-1/2">
                  <Icon name="time" size="large" />
                </div>
              </div>
            </div>
          ) : (
            // Right
            <div className="mt-6 sm:mt-0 mb-4">
              <div className="flex flex-row items-center ">
                <div className="w-8">{minutes}&#x0313;</div>
                <div className="flex justify-end w-full mx-auto text-center">
                  <div className="w-full sm:w-1/2 sm:pl-8">
                    <div className="p-2 bg-white rounded shadow">
                      {descriptionType}
                    </div>
                    {descriptionType === "score change" ? (
                      <>
                        <div className="font-bold">
                          {"(" + goolHomeScore + " : " + goolAwayScore + ")"}
                        </div>
                        <div className="font-bold">{scorer} </div>
                        <div className="text-sm">{assist} </div>
                      </>
                    ) : null}
                    {descriptionType === "yellow card" ||
                    descriptionType === "red card" ||
                    descriptionType === "yellow red_card" ? (
                      <>
                        <div className="font-bold">{scorer} </div>
                      </>
                    ) : null}
                  </div>
                </div>
                <div className="bg-white sm:absolute left-1/2  sm:translate-y-0 transform -translate-x-1/2">
                  <Icon name="time" size="large" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
