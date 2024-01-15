"use client";
// import AttachementPreview from "@/components/AddItemModal/AttachementPreview/AttachmentPreview";
import React from "react";
// import receiptMapperStyle from "../receiptMapperComponent.module.scss";

const RecieptMapperPdfViewer: React.FC = () => {
  // const [zoomLevel, setZoomLevel] = useState(100);

  // const handleZoomIn = () => {
  //   setZoomLevel(zoomLevel + 5);
  // };

  // const handleZoomOut = () => {
  //   setZoomLevel(zoomLevel - 5);
  // };

  // const handleZoomMid = () => {
  //   setZoomLevel(100);
  // };

  return (
    <div>
      <div> PDF name </div>
      {/* <AttachementPreview
                url="http://173.255.198.245:8080/ArtigemRS-FI/artigem/pdffiles/EVLINS/72bd23b8-1b17-4fd3-9070-8a63fe750d43.pdf"
                imgType="pdf"
                zoomLevel={zoomLevel}
              /> */}
    </div>
  );
};

// const connector = connect(mapStateToProps, mapDispatchToProps);
// type connectorType = ConnectedProps<typeof connector>;
// export default connector(RecieptMapperMainComponent);
export default RecieptMapperPdfViewer;
