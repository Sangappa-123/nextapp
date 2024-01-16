"use client";
import { useState } from "react";
import actionsBtnStyle from "./RightActionsButton.module.scss";
import { claimDetailsTranslateType } from "@/translations/claimDetailsTranslate/en";
import useTranslation from "@/hooks/useTranslation";
type actionsType = {
  setShowForm: any;
};

const RightActionsComponent: React.FC<actionsType> = (props: any) => {
  const [showActionBtn, setShowActionBtn] = useState(false);
  const { translate }: { translate: claimDetailsTranslateType | undefined } =
    useTranslation("claimDetailsTranslate");
  return (
    <div className={actionsBtnStyle.actionBtnContainer}>
      {!showActionBtn && (
        <div
          className={actionsBtnStyle.editActionBtn}
          onClick={() => {
            props.setShowForm(true);
            setShowActionBtn(true);
          }}
        >
          {translate?.claimSnapshot?.edit}
        </div>
      )}
      {showActionBtn && (
        <div className={actionsBtnStyle.actionBtns}>
          <span className={actionsBtnStyle.updateActionBtn}>
            {translate?.claimSnapshot?.update}
          </span>
          <span
            className={actionsBtnStyle.cancelActionBtn}
            onClick={() => {
              props.setShowForm(false);
              setShowActionBtn(false);
            }}
          >
            {translate?.claimSnapshot?.cancel}
          </span>
        </div>
      )}
    </div>
  );
};

export default RightActionsComponent;
