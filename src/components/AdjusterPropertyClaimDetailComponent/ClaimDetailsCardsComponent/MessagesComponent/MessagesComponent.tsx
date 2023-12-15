"use client";
import { useState } from "react";
import Cards from "@/components/common/Cards";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";
import NoRecordComponent from "@/components/common/NoRecordComponent/NoRecordComponent";
import Link from "next/link";
import MessageCardStyle from "./MessagesCrad.module.scss";
import Modal from "@/components/common/ModalPopups";
import AddNewMsgModalComponent from "./AddNewMsgModalComponent";

const MessagesComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleOpenModal}
        headingName="Add new message"
        childComp={<AddNewMsgModalComponent />}
        overlayClassName={MessageCardStyle.modalContainer}
        modalWidthClassName={MessageCardStyle.modalContent}
      />

      <Cards className={MessageCardStyle.messageCradContainer}>
        <GenericComponentHeading title="Messages">
          <div className="text-right">
            <Link href="#" onClick={handleOpenModal}>
              Add new messages
            </Link>
          </div>
        </GenericComponentHeading>
        <div className={MessageCardStyle.messageListContainer}>
          <NoRecordComponent message="No New Message" />
        </div>
        <div className="text-right">
          <Link href="#">View all messages</Link>
        </div>
      </Cards>
    </>
  );
};
export default MessagesComponent;
