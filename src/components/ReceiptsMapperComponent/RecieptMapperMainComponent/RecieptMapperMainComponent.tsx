"use client";
import React from "react";
// import receiptMapperStyle from "../receiptMapperComponent.module.scss";
import RecieptMapperPdfViewer from "../RecieptMapperPdfViewer/RecieptMapperPdfViewer";

const RecieptMapperMainComponent: React.FC = () => {
  return <RecieptMapperPdfViewer />;
};

// const connector = connect(mapStateToProps, mapDispatchToProps);
// type connectorType = ConnectedProps<typeof connector>;
// export default connector(RecieptMapperMainComponent);
export default RecieptMapperMainComponent;
