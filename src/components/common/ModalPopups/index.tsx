import React, { ReactNode } from "react";
import styles from "./modal.module.scss";
import { IoClose } from "react-icons/io5";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onSubmit: () => void;
  childComp: ReactNode;
  footerContent?: ReactNode | null;
  headingName: string;
  overlayClassName?: string;
  modalClassName?: string;
  modalWidthClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  // onSubmit,
  childComp,
  // btnName1,
  // btnName2,
  // showSubmitBtn,
  // showCancelBtn,
  footerContent = null,
  headingName,
  overlayClassName = "",
  modalWidthClassName = "",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={clsx(styles.modal_overlay, {
        [overlayClassName]: overlayClassName,
      })}
    >
      <div
        className={clsx(styles.modal, {
          [modalWidthClassName]: modalWidthClassName,
        })}
      >
        <div className={styles.modal_header}>
          {headingName && <div className={styles.modal_title}>{headingName}</div>}
          <IoClose className={styles.cross_icon} onClick={onClose} />
        </div>
        <div className={styles.modal_body}>{childComp}</div>
        {footerContent && (
          <div className={styles.modalFooter}>
            {footerContent}
            {/* {showSubmitBtn && <button onClick={onSubmit}>{btnName1}</button>}
          {showCancelBtn && <button onClick={onClose}>{btnName2}</button>} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
