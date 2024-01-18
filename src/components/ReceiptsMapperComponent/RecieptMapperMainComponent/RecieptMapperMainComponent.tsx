"use client";
import React from "react";
import ReceiptMapperPdfList from "../ReceiptMapperPdfList/ReceiptMapperPdfList";
// import receiptMapperStyle from "../receiptMapperComponent.module.scss";

const RecieptMapperMainComponent: React.FC = () => {
  return <ReceiptMapperPdfList />;
};

// const connector = connect(mapStateToProps, mapDispatchToProps);
// type connectorType = ConnectedProps<typeof connector>;
// export default connector(RecieptMapperMainComponent);
export default RecieptMapperMainComponent;
