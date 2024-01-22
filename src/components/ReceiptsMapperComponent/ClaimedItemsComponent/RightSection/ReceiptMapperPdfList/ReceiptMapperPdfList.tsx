"use client";
import React, { useState } from "react";
import clsx from "clsx";
import Styles from "./receiptMapperPdfList.module.scss";
import { ImPriceTags } from "react-icons/im";
import { ConnectedProps, connect } from "react-redux";
import Modal from "@/components/common/ModalPopups/index";
import AddLabelModalComponent from "@/components/common/AddLabelModalComponent/AddLabelModalComponent";
import GenericButton from "@/components/common/GenericButton/index";
import { useAppDispatch } from "@/hooks/reduxCustomHook";
import { addSelectedFile } from "@/reducers/ReceiptMapper/ReceiptMapperSlice";

interface typeProps {
  [key: string | number]: any;
}
const ReceiptMapperPdfList: React.FC<connectorType & typeProps> = (props) => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const { receiptMapperPdfList, setPdfViewer }: React.SetStateAction<any> = props;

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
                (
                  item: { name: string; url: string },
                  itemIndex: React.Key | null | undefined
                ) => {
                  return (
                    <div key={itemIndex} className={clsx(Styles.padfName)}>
                      <div>
                        <GenericButton
                          label={item.name}
                          theme="linkBtn"
                          onClickHandler={async () => {
                            dispatch(
                              addSelectedFile({ fileUrl: item.url, fileName: item.name })
                            );
                            setPdfViewer(true);
                          }}
                        />
                      </div>
                      <div>
                        <ImPriceTags
                          size="20"
                          className={clsx("cursor-pointer", Styles.priceTags)}
                          onClick={openModal}
                        />
                      </div>
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

const connector = connect(mapStateToProps, null);
type connectorType = ConnectedProps<typeof connector>;
export default connector(ReceiptMapperPdfList);
