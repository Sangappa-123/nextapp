"use client";
import actionsBtnStyle from "./RightActionsButton.module.scss";
import { claimDetailsTranslateType } from "@/translations/claimDetailsTranslate/en";
import useTranslation from "@/hooks/useTranslation";
import GenericButton from "@/components/common/GenericButton";

type actionsType = {
  setShowForm: any;
  showForm: any;
};

const RightActionsComponent: React.FC<actionsType> = (props: any) => {
  const { translate }: { translate: claimDetailsTranslateType | undefined } =
    useTranslation("claimDetailsTranslate");
  return (
    <div className={actionsBtnStyle.actionBtnContainer}>
      {!props.showForm && (
        <div className={actionsBtnStyle.actionBtns}>
          <GenericButton
            size="small"
            label={translate?.claimSnapshot?.edit}
            theme="linkBtn"
            btnClassname={actionsBtnStyle.linkBtnStyle}
            onClick={() => {
              props.setShowForm(true);
            }}
          />
        </div>
      )}
      {props.showForm && (
        <div className={actionsBtnStyle.actionBtns}>
          <GenericButton
            type="submit"
            size="small"
            label={translate?.claimSnapshot?.update}
            btnClassname={actionsBtnStyle.linkBtnStyle}
            theme="linkBtn"
            form="claim-info-update-form"
          />
          <GenericButton
            size="small"
            label={translate?.claimSnapshot?.cancel}
            theme="linkBtn"
            btnClassname={actionsBtnStyle.linkBtnStyle}
            onClick={() => {
              props.setShowForm(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default RightActionsComponent;
