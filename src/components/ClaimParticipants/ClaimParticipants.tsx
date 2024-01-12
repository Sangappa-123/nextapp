import React, { useState } from "react";
import Cards from "@/components/common/Cards";
import { FaUserCircle } from "react-icons/fa";
import GenericComponentHeading from "../common/GenericComponentHeading/index";
import { SlEnvolope } from "react-icons/sl";
import Modal from "@/components/common/ModalPopups";
import styles from "./ClaimParticipants.module.scss";
import { IconContext } from "react-icons";
import useTranslation from "@/hooks/useTranslation";
import { claimParticipantsTranslateType } from "@/translations/claimParticipantsTranslate/en";
import AddNewMsgModalComponent from "../common/AddNewMessageModalComponent/AddNewMessageModalComponent";

interface type {
  claimId: string;
}

const ClaimParticipants: React.FC<type> = (props) => {
  const { claimId } = props;
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

  const handleMessageSubmit = () => {};

  const {
    translate,
    loading,
  }: { translate: claimParticipantsTranslateType | undefined; loading: boolean } =
    useTranslation("claimParticipantsTranslate");
  console.log("transalte", translate);
  if (loading) {
    return null;
  }

  return (
    <div className={styles.claimParticipants}>
      <div className={styles.heading}>
        <GenericComponentHeading title={translate?.claimPraticipantsHeading ?? ""} />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        childComp={
          <AddNewMsgModalComponent
            handleOpenModal={handleOpenModal}
            handleMessageSubmit={handleMessageSubmit}
            claimId={claimId}
            participants={[]}
          />
        }
        headingName="Add new message"
        modalWidthClassName={styles.modalWidth}
      ></Modal>
      <div className="row">
        {data.map((item, i) => (
          <div className={styles.claimCards} key={i}>
            <Cards>
              <div className={styles.participantsCardContainer}>
                <IconContext.Provider value={{ className: styles.useCircle }}>
                  <FaUserCircle />
                </IconContext.Provider>
                <div className={styles.name}>
                  {item} {translate?.gregoryRafel ?? ""}
                </div>
                <div className={styles.companyName}>{translate?.evolution ?? ""}</div>
                <div className={styles.role}>{translate?.claimSupervisor ?? ""}</div>
                <div className={styles.contactDetails}>
                  <div className={styles.phone}>{translate?.phonNumber ?? ""}</div>
                  <div className={styles.mail}>
                    <button className={styles.mail} onClick={openModal}>
                      <IconContext.Provider value={{ className: styles.ciMail }}>
                        <SlEnvolope />
                      </IconContext.Provider>
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
};
export default ClaimParticipants;
