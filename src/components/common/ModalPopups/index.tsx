import React, { ReactNode } from "react";
import styles from "./modal.module.scss";
import { FaRegWindowClose } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: ReactNode;
  headingName: string;
  btnName1: string;
  btnName2: string;
  showSubmitBtn: boolean;
  showCancelBtn: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  children,
  btnName1,
  btnName2,
  showSubmitBtn,
  showCancelBtn,
  headingName,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <div className={styles.modal_title}>{headingName}</div>
          <FaRegWindowClose className={styles.cross_icon} onClick={onClose} />
        </div>
        <div className={styles.modal_body}>{children}</div>
        <hr></hr>
        <div className={styles.modalFooter}>
          {showSubmitBtn && <button onClick={onSubmit}>{btnName1}</button>}
          {showCancelBtn && <button onClick={onClose}>{btnName2}</button>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
