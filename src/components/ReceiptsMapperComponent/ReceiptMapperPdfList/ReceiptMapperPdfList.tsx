"use client";
import React, { useState } from "react";
import clsx from "clsx";
import Styles from "./receiptMapperPdfList.module.scss";
import { receiptMapperDate } from "@/reducers/ReceiptMapper/ReceiptMapperSlice";
import { ImPriceTags } from "react-icons/im";
import { ConnectedProps, connect } from "react-redux";
import Modal from "@/components/common/ModalPopups/index";
import AddLabelModalComponent from "@/components/common/AddLabelModalComponent/AddLabelModalComponent";

const ReceiptMapperPdfList: React.FC<connectorType> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    // receiptMapperDate,
    receiptMapperPdfList,
  }: React.SetStateAction<any> = props;
  console.log("mapp", receiptMapperPdfList);

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
    <div className={Styles.container}>
      {receiptMapperPdfList?.map(
        (data: { date: any; pdfList: any }, index: React.Key | null | undefined) => {
          return (
            <div key={index}>
              <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                childComp={<AddLabelModalComponent handleOpenModal={handleOpenModal} />}
                headingName="Labels"
                modalWidthClassName={Styles.modalWidth}
              ></Modal>
              <div className={Styles.date}>{data.date}</div>
              {data.pdfList.map(
                (item: { name: string }, itemIndex: React.Key | null | undefined) => {
                  return (
                    <div key={itemIndex} className={clsx("row", Styles.padfName)}>
                      <span className={clsx("col-lg-10")}>{item.name}</span>
                      <ImPriceTags
                        size="25"
                        className={clsx("col-lg-2 justify-content-end", Styles.priceTags)}
                        onClick={openModal}
                      />
                    </div>
                  );
                }
              )}
            </div>
          );
        }
      )}
    </div>
  );
};

const mapStateToProps = ({ receiptMapper }: any) => ({
  receiptMapperPdfList: receiptMapper.receiptMapperPdfList,
});
const mapDispatchToProps = {
  receiptMapperDate,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(ReceiptMapperPdfList);
