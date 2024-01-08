import { createSelector } from "@reduxjs/toolkit";
import selectClaimDetailState from "./selectClaimDetailState";
import selectLoggedInUserEmail from "@/reducers/Session/Selectors/selectLoggedInUserEmail";

const selectNonLoggedInParticipants = createSelector(
  [selectClaimDetailState, selectLoggedInUserEmail],
  (claimDetail, loggedInUserEmailId) => {
    console.log("selectLoggedInUserEmail", loggedInUserEmailId);

    const filteredPArtcipants = claimDetail?.participants.filter((participant: any) => {
      if (participant.emailId !== loggedInUserEmailId) {
        return participant;
      }
    });
    console.log("filteredPArtcipants", filteredPArtcipants);
    return filteredPArtcipants;
  }
);

export default selectNonLoggedInParticipants;
