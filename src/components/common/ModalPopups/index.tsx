import React, { ReactNode } from "react";
import styles from "./modal.module.scss";
import { IoClose } from "react-icons/io5";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onSubmit: () => void;
  children: ReactNode;
  footerContent?: ReactNode | null;
  headingName: string;
  overlayClassName?: string;
  modalClassName?: string;
  // btnName1: string;
  // btnName2: string;
  // showSubmitBtn: boolean;
  // showCancelBtn: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  // onSubmit,
  children,
  // btnName1,
  // btnName2,
  // showSubmitBtn,
  // showCancelBtn,
  footerContent = null,
  headingName,
  overlayClassName = "",
  modalClassName = "",
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
          [modalClassName]: modalClassName,
        })}
      >
        <div className={styles.modal_header}>
          <div className={styles.modal_title}>{headingName}</div>
          <IoClose className={styles.cross_icon} onClick={onClose} />
        </div>
        <div className={styles.modal_body}>{children}</div>
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
