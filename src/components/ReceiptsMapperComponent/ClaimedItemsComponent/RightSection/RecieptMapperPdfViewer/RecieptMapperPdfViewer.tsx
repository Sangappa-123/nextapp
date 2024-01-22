"use client";
import React, { useState } from "react";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import clsx from "clsx";
import { RiZoomInFill } from "react-icons/ri";
import { RiZoomOutFill } from "react-icons/ri";
import { ImPriceTags } from "react-icons/im";
import { ConnectedProps, connect } from "react-redux";

import receiptMapperStyle from "../../../receiptMapperComponent.module.scss";
import PdfViewer from "@/components/common/PdfViewer/PdfViewer";
import GenericInput from "@/components/common/GenericInput/index";
import { getUSDCurrency } from "@/utils/utitlity";

interface typeProps {
  [key: string | number]: any;
}
const RecieptMapperPdfViewer: React.FC<connectorType & typeProps> = ({
  fileName,
  fileUrl,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [tooltipPoint, setTooltipPoint] = useState({ x: 0, y: 0 });

  const handlePointClick = (event: any) => {
    const boundingBox = event.target.getBoundingClientRect();
    const x = event.clientX - boundingBox.left;
    const y = event.clientY - boundingBox.top + 23;

    setTooltipPoint({ x, y });

    setModalIsOpen(true);
  };

  const handleZoomIn = () => {
    setScale((prevScale) => prevScale * 1.1);
  };

  const handleZoomOut = () => {
    setScale((prevScale) => prevScale / 1.1);
  };

  // const closeModal = () => {
  //   setModalIsOpen(false);
  // };

  const MapperPopup = () => {
    return (
      <div
        className={receiptMapperStyle.mapperpopup}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={receiptMapperStyle.formRow}>
          <div className={receiptMapperStyle.formCellHeading}>Item Id</div>
          <div className={receiptMapperStyle.formCellInput}>
            <GenericInput />
          </div>
        </div>
        <div className={receiptMapperStyle.formRow}>
          <div className={receiptMapperStyle.formCellHeading}>Quantity Replaced</div>
          <div className={receiptMapperStyle.formCellInput}>
            <GenericInput />
          </div>
        </div>
        <div className={receiptMapperStyle.formRow}>
          <div className={receiptMapperStyle.formCellHeading}>Material Cost</div>
          <div className={receiptMapperStyle.formCellInput}>
            <GenericInput />
          </div>
        </div>
        <div className={receiptMapperStyle.formRow}>
          <div className={receiptMapperStyle.formCellHeading}>Sales Tax(%)</div>
          <div className={receiptMapperStyle.formCellInput}>
            <GenericInput />
          </div>
        </div>
        <div className={receiptMapperStyle.formRow}>
          <div className={receiptMapperStyle.formCellHeading}>Shipping</div>
          <div className={receiptMapperStyle.formCellInput}>
            <GenericInput />
          </div>
        </div>
        <div className={receiptMapperStyle.formRow}>
          <div className={receiptMapperStyle.formCellHeading}>Receipt Value</div>
          <div className={receiptMapperStyle.formCellInput}>
            <b>{getUSDCurrency(0)}</b>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="p-3">
        <div className="row col-12">
          <div className={clsx(receiptMapperStyle.fileNameDiv, "col-md-7 col-xs-7")}>
            <b>File Name:</b>
            <div>{fileName}</div>
          </div>
          <div
            className={clsx(
              receiptMapperStyle.zoombuttonDiv,
              "col-md-5 col-xs-5 text-right"
            )}
          >
            <div>
              <ImPriceTags size="25" />
            </div>
            <div onClick={handleZoomIn}>
              <RiZoomInFill size="25" />
            </div>
            <div onClick={handleZoomOut}>
              <RiZoomOutFill size="25" />
            </div>
          </div>
        </div>
        <div className="position-relative">
          <PdfViewer
            fileUrl={fileUrl}
            handlePointClick={handlePointClick}
            scale={scale}
            pdfCustomClassname={receiptMapperStyle.receiptPdfPages}
          />

          {modalIsOpen && (
            <div
              className="position-absolute"
              style={{
                left: `${tooltipPoint.x}px`,
                top: `${tooltipPoint.y}px`,
              }}
            >
              <MapperPopup />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ receiptMapper }: any) => ({
  fileName: receiptMapper.selectedPdfName,
  fileUrl: receiptMapper.selectedPdfFileUrl,
});

const connector = connect(mapStateToProps, null);
type connectorType = ConnectedProps<typeof connector>;
export default connector(RecieptMapperPdfViewer);
