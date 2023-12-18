import React from "react";
import Modal from "@/components/common/ModalPopups";
import GenericButton from "@/components/common/GenericButton";
import confirmModalStyle from "./confirmModal.module.scss";

type props = {
  showConfirmation: boolean;
  closeHandler?: () => void;
  submitHandler?: () => void;
  closeBtnText?: string;
  submitBtnText: string;
  descText: string;
  headingText?: string;
  modalHeading: string;
};
function ConfirmModal({
  showConfirmation = false,
  closeHandler,
  submitHandler,
  closeBtnText = "",
  submitBtnText = "",
  descText = "",
  headingText = "",
  modalHeading = "",
}: props) {
  return (
    <>
      <Modal
        isOpen={showConfirmation}
        headingName={modalHeading}
        onClose={() => closeHandler && closeHandler()}
        footerContent={
          <div className={confirmModalStyle.modalFooter}>
            <GenericButton
              label={closeBtnText}
              size="medium"
              onClickHandler={() => closeHandler && closeHandler()}
            />
            <GenericButton
              label={submitBtnText}
              theme="deleteBtn"
              size="medium"
              onClickHandler={() => submitHandler && submitHandler()}
            />
          </div>
        }
        overlayClassName={confirmModalStyle.overlay}
        modalClassName={confirmModalStyle.modal}
      />
      <div className={confirmModalStyle.modalBody}>
        {headingText && <h3 className={confirmModalStyle.heading}>{headingText}</h3>}
        {descText && <p className={confirmModalStyle.desc}>{descText}</p>}
      </div>
    </>
  );
}

export default ConfirmModal;
