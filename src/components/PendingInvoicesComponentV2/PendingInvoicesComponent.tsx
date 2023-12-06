"use client";
import { unknownObjectType } from "@/constants/customTypes";
import React, { useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import { addPendingInvoice } from "@/reducers/PendingInvoice/PendingInvoiceSlice";
import PendingInvoiceTable from "./PendingInvoiceTable";

interface typedProp {
  initData: unknownObjectType | null;
}

const PendingInvoicesComponent: React.FC<connectorType & typedProp> = (props) => {
  const { initData, addPendingInvoice } = props;
  const [loaded, setLoaded] = useState(false);
  const [tableLoader, setTableLoader] = React.useState(false);

  useEffect(() => {
    addPendingInvoice(initData);
    setLoaded(true);
    // eslint-disable-next-line
  }, []);

  if (!loaded) return null;

  return (
    <>
      <div className="row">
        <PendingInvoiceTable setTableLoader={setTableLoader} tableLoader={tableLoader} />
      </div>
    </>
  );
};

const mapDispatchToProps = {
  addPendingInvoice,
};
const connector = connect(null, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(PendingInvoicesComponent);
