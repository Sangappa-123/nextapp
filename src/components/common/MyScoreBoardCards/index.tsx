import React from "react";
import GenericComponentHeading from "../GenericComponentHeading";
import ScoreBoardsComponent from "@/components/ScoreBoardsComponent";

const MyScoreBoardCards: React.FC = () => {
  return (
    <div>
      <GenericComponentHeading title="My ScoreBoard" />
      <ScoreBoardsComponent />
    </div>
  );
};

export default MyScoreBoardCards;
