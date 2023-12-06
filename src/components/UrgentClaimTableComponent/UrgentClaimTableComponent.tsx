"use client";
import React, { useEffect, useState } from "react";
import UrgentClaimSearchBox from "./UrgentClaimSearchBox/UrgentClaimSearchBox";
import UrgentClaimTablecomStyle from "./UrgentClaimTableComponent.module.scss";
import UrgentClaimTable from "./UrgentClaimTable/index";
import { ConnectedProps, connect } from "react-redux";
import { addUrgentClaimListData } from "@/reducers/UrgentClaimData/UrgentClaimSlice";
import { unknownObjectType } from "@/constants/customTypes";

interface typedProp {
  initData: unknownObjectType | null;
}

const UrgentClaimTableComponent: React.FC<typedProp & connectorType> = (props) => {
  const { initData, addUrgentClaimListData } = props;
  console.log("checking props", initData);
  const [loaded, setLoaded] = useState(false);

  const [tableLoader, setTableLoader] = React.useState(false);

  useEffect(() => {
    addUrgentClaimListData(initData);
    setLoaded(true);
    // eslint-disable-next-line
  }, []);

  if (!loaded) return null;
  return (
    <>
      <div className="mt-4">{/* <OpenClaimsText /> */}</div>
      <div className={UrgentClaimTablecomStyle.claimContainer}>
        <div className={`row ${UrgentClaimTablecomStyle.claimContentContainer}`}>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12 d-flex">
            {/* <NewClaimButton /> */}
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12 mt-2 mb-2">
            {/* <OpenClaimSelectDropdown setTableLoader={setTableLoader} /> */}
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            <UrgentClaimSearchBox setTableLoader={setTableLoader} />
          </div>
        </div>
      </div>

      <div className="row">
        <UrgentClaimTable setTableLoader={setTableLoader} tableLoader={tableLoader} />
      </div>
    </>
  );
};

const mapDispatchToProps = {
  addUrgentClaimListData,
};

const connector = connect(null, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(UrgentClaimTableComponent);
