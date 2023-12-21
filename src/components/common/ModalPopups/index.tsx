import React, { ReactNode } from "react";
import styles from "./modal.module.scss";
import { IoClose } from "react-icons/io5";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  childComp?: ReactNode;
  iconComp?: ReactNode;
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
  childComp = null,
  iconComp = null,

  footerContent = null,
  headingName,
  overlayClassName = "",
  modalWidthClassName = "",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={clsx(styles.modalOverlay, {
        [overlayClassName]: overlayClassName,
      })}
    >
      <div
        className={clsx(styles.modal, {
          [modalWidthClassName]: modalWidthClassName,
        })}
      >
        <div className={clsx(styles.modal_header)}>
          {headingName && (
            <div className={styles.modal_title}>
              <span className={styles.spanStyle}>{iconComp}</span>
              {headingName}
            </div>
          )}
          <IoClose className={styles.cross_icon} onClick={onClose} />
        </div>
        <div className={styles.modal_body}>{childComp}</div>
        {footerContent && <div className={styles.modalFooter}>{footerContent}</div>}
      </div>
    </div>
  );
};

export default Modal;
