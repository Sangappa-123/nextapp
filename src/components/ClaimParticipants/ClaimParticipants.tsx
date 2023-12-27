import React, { useState, useEffect } from "react";
import Cards from "../common/Cards/index";
import clsx from "clsx";
import { FaUserCircle } from "react-icons/fa";
import GenericComponentHeading from "../common/GenericComponentHeading/index";
import { CiMail } from "react-icons/ci";
import Modal from "@/components/common/ModalPopups";
import styles from "./ClaimParticipants.module.scss";

import AddNewMsgModalComponent from "../AdjusterPropertyClaimDetailComponent/ClaimDetailsCardsComponent/MessagesComponent/AddNewMsgModalComponent/AddNewMsgModalComponent";

export default function ClaimParticipants(props) {
  const [isOpen, setIsOpen] = useState(false);
  const data = [1, 2, 3];
  useEffect(() => {
    console.log("claimnumber", props.claimContentListRes);
    // getParticipants()
    //   .then((res: any) => {
    //     console.log("loss", res);
    //   })
    //   .catch((error) => console.log(" Losserrr", error));
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [isAssignButtonDisabled, setIsAssignButtonDisabled] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const handleClick = () => {
  //   console.log("hiii");
  // };

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.claimParticipants}>
      <div className={clsx(styles.heading)}>
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
            <Cards className={clsx("col")}>
              <div className={clsx("row")}>
                <div className={clsx("col-lg-2")} />
                <div className={clsx("col-lg-4")}>
                  {/* {i} */}
                  <FaUserCircle
                    style={{
                      color: "#23527c",
                      width: "100px",
                      height: "60px",
                      verticalAlign: "middle",
                      textAlign: "center",
                      // paddingLeft: "56px",
                    }}
                  />
                </div>
              </div>
              <div>
                <h3 className={styles.name}>{item}Gregory, Rafael</h3>
                <h6 className={styles.companyName}>Evolution</h6>
                <h4 className={styles.role}>Claim Supervisor</h4>
                <div className={clsx("row", styles.phoneDiv)}>
                  <div className={clsx("col-lg-2")} />
                  <div className={clsx("col-lg-8")}>
                    <h3 className={styles.phone}>(565) -656-5656</h3>
                  </div>
                  <div className={clsx("col-lg-2")}>
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
