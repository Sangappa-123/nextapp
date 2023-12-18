"use client";
import { useState } from "react";
import Cards from "@/components/common/Cards";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";
// import NoRecordComponent from "@/components/common/NoRecordComponent/NoRecordComponent";
import Link from "next/link";
import MessageCardStyle from "./MessagesCrad.module.scss";
import Modal from "@/components/common/ModalPopups";
import AddNewMsgModalComponent from "./AddNewMsgModalComponent";
import NewMsgListComponent from "./NewMsgListComponent";

const MessagesComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dataArray = [
    {
      name: " Howell, Melissa",
      content: " ssssssssssssssssssssssamdfnsdflks",
      dataTime: "Dec 15, 10:22 PM",
    },
    {
      name: "john Melissa",
      content:
        " kkkkkkkkkkkksssssssssssssamdfnsdflks div with background aand other stuff kfkf fkfjf fkffjf fjfjfjf fjfjfjf fjfjfj ffjffjf fjfjf jf fj fjfjfjf fjfj",
      dataTime: "Nov 15, 10:22 PM",
    },

    {
      name: " rock dwane",
      content:
        "lllllllllllsssssssssssamdfnsdflks div with background aand other stuff kfkf fkfjf fkffjf fjfjfjf fjfjfjf fjfjfj ffjffjf fjfjf jf fj fjfjfjf fjfj",
      dataTime: "april 15, 10:22 PM",
    },
    {
      name: " rock dwane",
      content:
        "lllllllllllsssssssssssamdfnsdflks div with background aand other stuff kfkf fkfjf fkffjf fjfjfjf fjfjfjf fjfjfj ffjffjf fjfjf jf fj fjfjfjf fjfj",
      dataTime: "april 15, 10:22 PM",
    },
    {
      name: " rock dwane",
      content:
        "lllllllllllsssssssssssamdfnsdflks div with background aand other stuff kfkf fkfjf fkffjf fjfjfjf fjfjfjf fjfjfj ffjffjf fjfjf jf fj fjfjfjf fjfj",
      dataTime: "april 15, 10:22 PM",
    },
  ];

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
          {/* <NoRecordComponent message="No New Message" /> */}
          {dataArray.map((elem, index) => (
            <NewMsgListComponent elem={elem} key={index} />
          ))}
        </div>
        <div className="text-right">
          <Link href="#">View all messages</Link>
        </div>
      </Cards>
    </>
  );
};
export default MessagesComponent;
