"use client";
import { useState } from "react";
import Cards from "@/components/common/Cards";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";
import NoRecordComponent from "@/components/common/NoRecordComponent/NoRecordComponent";
import Link from "next/link";
import MessageCardStyle from "./MessagesCrad.module.scss";
import Modal from "@/components/common/ModalPopups";
import AddNewMsgModalComponent from "./AddNewMsgModalComponent";
import NewMsgListComponent from "./NewMsgListComponent";
import { RootState } from "@/store/store";
import { ConnectedProps, connect } from "react-redux";

const MessagesComponent: React.FC<connectorType> = (props: { messageList: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { messageList } = props;
  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleOpenModal}
        headingName="Add new message"
        childComp={<AddNewMsgModalComponent handleOpenModal={handleOpenModal} />}
        overlayClassName={MessageCardStyle.modalContainer}
        modalWidthClassName={MessageCardStyle.modalContent}
      />

      <Cards className={MessageCardStyle.messageCradContainer}>
        <GenericComponentHeading title="Messages">
          <div className="text-right">
            <Link href="#" onClick={handleOpenModal}>
              Add New Messages
            </Link>
          </div>
        </GenericComponentHeading>
        <div className={MessageCardStyle.messageListContainer}>
          {messageList?.length > 0 ? (
            messageList
              ?.slice(0, 5)
              ?.map((message: any, index: any) => (
                <NewMsgListComponent message={message} key={index} />
              ))
          ) : (
            <NoRecordComponent message="No New Message" />
          )}
        </div>
        <div className="text-right">
          <Link href="/all-notes">View all messages</Link>
        </div>
      </Cards>
    </>
  );
};
const mapStateToProps = (state: RootState) => ({
  messageList: state.claimDetail.messageList,
});

const connector = connect(mapStateToProps, null);
type connectorType = ConnectedProps<typeof connector>;
export default connector(MessagesComponent);
