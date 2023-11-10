import React from "react";
import GenericComponentHeading from "../GenericComponentHeading";
import TabsButtonScoreBoard from "@/container/TabButtonScoreBoard";

const MyScoreBoardCards: React.FC = () => {
  return (
    <div>
      <GenericComponentHeading title="My ScoreBoard" />
      <TabsButtonScoreBoard />
    </div>
  );
};

export default MyScoreBoardCards;
