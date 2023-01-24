import React from "react";
import { Progress } from "semantic-ui-react";

const BallPossession = ({ ballpossession }) => (
  <div className="m-4 w-6/12 text-sm font-semibold self-center">
    <p>ball possession</p>
    <Progress percent={ballpossession} progress color="grey" />
  </div>
);

export default BallPossession;
