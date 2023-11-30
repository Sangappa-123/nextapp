import React from "react";
import Modal from "@/components/common/ModalPopups";
import GenericButton from "@/components/common/GenericButton";
import confirmModalStyle from "./confirmModal.module.scss";

type props = {
  showConfirmation: boolean;
  closeHandler?: () => void;
  submitHandler?: () => void;
  descText?: string;
};
function ConfirmModal({
  showConfirmation = false,
  closeHandler,
  submitHandler,
  descText = "",
}: props) {
  return (
    <Modal
      isOpen={showConfirmation}
      headingName="Confirm Deletion"
      onClose={() => closeHandler && closeHandler()}
      footerContent={
        <div className={confirmModalStyle.modalFooter}>
          <GenericButton
            label="Close"
            size="medium"
            onClickHandler={() => closeHandler && closeHandler()}
          />
          <GenericButton
            label="Delete"
            theme="deleteBtn"
            size="medium"
            onClickHandler={() => submitHandler && submitHandler()}
          />
        </div>
      }
      overlayClassName={confirmModalStyle.overlay}
      modalClassName={confirmModalStyle.modal}
    >
      <div className={confirmModalStyle.modalBody}>
        <h3 className={confirmModalStyle.heading}>Are You Sure?</h3>
        {descText && <p className={confirmModalStyle.desc}>{descText}</p>}
      </div>
    </Modal>
  );
}

export default ConfirmModal;
