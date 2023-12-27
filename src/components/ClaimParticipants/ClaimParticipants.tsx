import React, { useState } from "react";
import Cards from "../common/Cards/index";
import clsx from "clsx";
import { FaUserCircle } from "react-icons/fa";
import GenericComponentHeading from "../common/GenericComponentHeading/index";
import { CiMail } from "react-icons/ci";
import Modal from "@/components/common/ModalPopups";
import styles from "./ClaimParticipants.module.scss";

import AddNewMsgModalComponent from "../AdjusterPropertyClaimDetailComponent/ClaimDetailsCardsComponent/MessagesComponent/AddNewMsgModalComponent/AddNewMsgModalComponent";

export default function ClaimParticipants() {
  const [isOpen, setIsOpen] = useState(false);
  const data = [1, 2, 3];

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.claimParticipants}>
      <div className={styles.heading}>
        <GenericComponentHeading title={"Claim Participants"} />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        childComp={<AddNewMsgModalComponent handleOpenModal={handleOpenModal} />}
        headingName="Add new message"
        modalWidthClassName={styles.modalWidth}
      ></Modal>
      <div className="row">
        {data.map((item, i) => (
          <div className={clsx("row float-lg-right", styles.claimCards)} key={i}>
            <Cards className={"col"}>
              <div className={"row"}>
                <div className={"col-lg-2"} />
                <div className={"col-lg-4"}>
                  {/* {i} */}
                  <FaUserCircle
                    style={{
                      color: "#23527c",
                      width: "100px",
                      height: "60px",
                      verticalAlign: "middle",
                      textAlign: "center",
                    }}
                  />
                </div>
              </div>
              <div>
                <div className={styles.name}>{item}Gregory, Rafael</div>
                <div className={styles.companyName}>Evolution</div>
                <div className={styles.role}>Claim Supervisor</div>
                <div className={clsx("row", styles.phoneDiv)}>
                  <div className={"col-lg-2"} />
                  <div className={"col-lg-8"}>
                    <div className={styles.phone}>(565) -656-5656</div>
                  </div>
                  <div className={"col-lg-2"}>
                    <button className={styles.mail} onClick={openModal}>
                      <CiMail
                        style={{ color: "#23527c", width: "20px", height: "17px" }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </Cards>
          </div>
        ))}
      </div>
    </div>
  );
}
