"use client";
import React, { useState } from "react";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import clsx from "clsx";
import { RiZoomInFill } from "react-icons/ri";
import { RiZoomOutFill } from "react-icons/ri";
import { ImPriceTags } from "react-icons/im";

import receiptMapperStyle from "../receiptMapperComponent.module.scss";
import PdfViewer from "@/components/common/PdfViewer/PdfViewer";

const RecieptMapperPdfViewer: React.FC = () => {
  const fileUrl =
    "http://173.255.198.245:8080/ArtigemRS-FI/artigem/pdffiles/EVLINS/72bd23b8-1b17-4fd3-9070-8a63fe750d43.pdf";
  const fileName = "Sample. pdf";
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [tooltipPoint, setTooltipPoint] = useState({ x: 0, y: 0 });

  const handlePointClick = (event: any) => {
    const boundingBox = event.target.getBoundingClientRect();
    const x = event.clientX - boundingBox.left;
    const y = event.clientY - boundingBox.top;

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
      <div className={receiptMapperStyle.mapperpopup}>
        <label>Item Id</label>
        <input type="text" />
        <br />
        <label>Quantity</label>
        <input type="text" />
      </div>
    );
  };
  return (
    <>
      <div className="p-3">
        <div className={clsx("row col-12")}>
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
        <div className="position-relative container" style={{ position: "relative" }}>
          <PdfViewer
            fileUrl={fileUrl}
            handlePointClick={handlePointClick}
            scale={scale}
            pdfCustomClassname={receiptMapperStyle.receiptPdfPages}
          />

          {modalIsOpen && (
            <div
              style={{
                position: "absolute",
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

export default RecieptMapperPdfViewer;
